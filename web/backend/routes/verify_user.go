package routes

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type VerifyInput struct {
	Email string `json:"email"`
	OTP   string `json:"otp"`
}

func VerifyUser(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer RecoverPanic(w)

		var input VerifyInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		// 🔹 Match OTP (dummy logic)
		if input.OTP != "123456" {
			http.Error(w, "Invalid OTP", http.StatusUnauthorized)
			return
		}

		// 🔹 Update user as verified
		collection := client.Database("wkt3").Collection("users")
		_, err := collection.UpdateOne(context.TODO(),
			bson.M{"email": input.Email},
			bson.M{"$set": bson.M{"verified": true}},
		)

		if err != nil {
			http.Error(w, "Verification failed", http.StatusInternalServerError)
			return
		}

		fmt.Println("✅ User verified:", input.Email)
		w.Write([]byte("User verified successfully"))
	}
}