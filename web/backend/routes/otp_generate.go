package routes

import (
	"context"
	"math/rand"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"wkt3/db"
	"wkt3/services"
)

func GenerateOTP(w http.ResponseWriter, r *http.Request) {
	phone := r.URL.Query().Get("phone")
	authType := r.URL.Query().Get("auth_type")

	// ❌ Social login users ko skip karo
	if authType == "social" {
		http.Error(w, "2FA not required for social login", http.StatusForbidden)
		return
	}

	// ✅ 6-digit numeric OTP generate karo
	rand.Seed(time.Now().UnixNano())
	otp := rand.Intn(900000) + 100000

	// ✅ OTP save karo with expiry
	collection, _ := db.ConnectCollection("otp_codes")
	collection.InsertOne(context.TODO(), bson.M{
		"phone":      phone,
		"otp":        otp,
		"expires_at": time.Now().Add(5 * time.Minute),
	})

	// ✅ Bot se OTP bhejna
	go services.SendOTPViaBot(phone, otp)

	w.Write([]byte("OTP sent successfully"))
}