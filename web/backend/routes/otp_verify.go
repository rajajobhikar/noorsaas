package routes

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"wkt3/db"
	"wkt3/services"
)

func VerifyPhoneOTP(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Phone string `json:"phone"`
		OTP   int    `json:"otp"`
	}
	json.NewDecoder(r.Body).Decode(&input)

	collection, _ := db.ConnectCollection("otp_codes")
	var result bson.M
	err := collection.FindOne(context.TODO(), bson.M{
		"phone": input.Phone,
		"otp":   input.OTP,
	}).Decode(&result)

	if err != nil {
		http.Error(w, "OTP not found", http.StatusUnauthorized)
		return
	}

	expiry := result["expires_at"].(time.Time)
	if time.Now().After(expiry) {
		http.Error(w, "OTP expired", http.StatusUnauthorized)
		return
	}

	// ✅ Session ko verified mark karo
	services.MarkSessionVerified(input.Phone)

	w.Write([]byte("OTP verified successfully"))
}