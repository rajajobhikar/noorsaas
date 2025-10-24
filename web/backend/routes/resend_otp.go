package routes

import (
	"encoding/json"
	"fmt"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo" // 🔧 Yeh import missing tha
)

type ResendOTPInput struct {
	Email string `json:"email"`
}

func ResendOTP(client *mongo.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer RecoverPanic(w)

		var input ResendOTPInput
		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		// 🔹 Generate OTP (dummy for now)
		otp := "123456" // Replace with secure logic later

		// 🔹 Send email (placeholder)
		fmt.Println("📧 Resending OTP to:", input.Email, "| OTP:", otp)

		// 🔹 Save OTP to DB (optional)
		// collection := client.Database("wkt3").Collection("otps")
		// collection.InsertOne(...)

		w.Write([]byte("OTP resent successfully"))
	}
}