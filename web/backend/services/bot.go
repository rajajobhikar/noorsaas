package services

import (
	"fmt"
)

func SendOTPViaBot(phone string, otp int) {
	message := fmt.Sprintf("Your WKT3 verification code is %d", otp)

	// ✅ Yahan tumhara bot logic call karo
	// Example: CGC Bot API ya wkt3-bot
	fmt.Printf("Sending OTP to %s: %s\n", phone, message)

	// TODO: Replace with actual bot API call
}