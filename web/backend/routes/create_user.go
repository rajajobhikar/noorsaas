package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	ID       string    `json:"id" bson:"id"`
	Email    string    `json:"email" bson:"email"`
	Name     string    `json:"name" bson:"name"`
	
	Created  time.Time `json:"created" bson:"created"`
	Verified bool      `json:"verified" bson:"verified"`//signup ke time false hoga
}



func CreateUser(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer RecoverPanic(w) // Panic se bachne ke liye

		var input User
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		input.Verified = false // Default verified false

		collection := client.Database("wkt3").Collection("users")
		_, err := collection.InsertOne(context.TODO(), input)
		if err != nil {
			http.Error(w, "Insert failed", http.StatusInternalServerError)
			return
		}

		fmt.Println("✅ User created:", input.Email)
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte("User created successfully"))
	}
}