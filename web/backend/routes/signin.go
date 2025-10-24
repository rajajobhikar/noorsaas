package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type SignupInput struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Name     string `json:"name"`
	Terms    bool   `json:"terms"`
}

func generateSerial() string {
	timestamp := time.Now().Unix()
	random := time.Now().UnixNano() % 1000
	return fmt.Sprintf("WKT3-%d-%03d", timestamp%1000000, random)
}

func hashPassword(password string) string {
	// Replace with real hash logic
	return "hashed-" + password
}

func Signin(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}

		var input SignupInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		if input.Email == "" || input.Password == "" || !input.Terms {
			http.Error(w, "Missing fields or terms not accepted", http.StatusBadRequest)
			return
		}

		collection := client.Database("wkt3").Collection("users")

		var existing bson.M
		err := collection.FindOne(context.TODO(), bson.M{"email": input.Email}).Decode(&existing)
		if err != mongo.ErrNoDocuments {
			http.Error(w, "User already exists", http.StatusConflict)
			return
		}

		newUser := bson.M{
			"id":       fmt.Sprintf("u%d", time.Now().UnixNano()),
			"email":    input.Email,
			"password": hashPassword(input.Password),
			"name":     input.Name,
			"verified": false,
			"role":     map[bool]string{true: "admin", false: "user"}[input.Email == "noorgoldfinance@gmail.com"],
			"serial":   generateSerial(),
			"skillRating": 1000,
			"fairness": bson.M{
				"verified":    false,
				"cleanRecord": true,
				"skillLevel":  "rookie",
				"activeSince": time.Now().Unix(),
			},
		}

		_, err = collection.InsertOne(context.TODO(), newUser)
		if err != nil {
			http.Error(w, "User creation failed", http.StatusInternalServerError)
			return
		}

		token := "wkt3-token-" + input.Email

		fmt.Println("🎉 New user signed up:", input.Email)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(bson.M{
			"success": true,
			"token":   token,
			"user":    newUser,
		})
	}
}