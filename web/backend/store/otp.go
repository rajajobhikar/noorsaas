package store

import "time"

type OTPEntry struct {
  Token  string
  Expiry time.Time
}

var otpMemory = map[string]OTPEntry{}

func StoreOTP(email, token string) {
  otpMemory[email] = OTPEntry{
    Token:  token,
    Expiry: time.Now().Add(5 * time.Minute),
  }
}

func GetStoredOTP(email string) (string, time.Time) {
  entry, ok := otpMemory[email]
  if !ok {
    return "", time.Time{}
  }
  return entry.Token, entry.Expiry
}

func DeleteOTP(email string) {
  delete(otpMemory, email)
}