package utils

import (
  "math/rand"
  "time"
  "fmt"
)

func CreateNumericOTP() string {
  rand.Seed(time.Now().UnixNano())
  otp := rand.Intn(900000) + 100000
  return fmt.Sprintf("%d", otp)
}

func CreateSecureToken() string {
  rand.Seed(time.Now().UnixNano())
  letters := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
  b := make([]rune, 32)
  for i := range b {
    b[i] = letters[rand.Intn(len(letters))]
  }
  return string(b)
}