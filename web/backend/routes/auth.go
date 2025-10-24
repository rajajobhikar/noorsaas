package routes

import (
  "encoding/json"
  "net/http"
  "strings"
  "time"
  "wkt3/store"
  "wkt3/utils"
)

func SendOTP(w http.ResponseWriter, r *http.Request) {
  type Req struct{ Email string }
  var req Req
  json.NewDecoder(r.Body).Decode(&req)
  email := strings.ToLower(strings.TrimSpace(req.Email))
  otp := utils.CreateNumericOTP()
  store.StoreOTP(email, otp)
  utils.SendEmail(email, otp)
  json.NewEncoder(w).Encode(map[string]string{ "status": "OTP sent" })
}

func VerifyOTP(w http.ResponseWriter, r *http.Request) {
  type Req struct{ Email, OTP string }
  var req Req
  json.NewDecoder(r.Body).Decode(&req)
  email := strings.ToLower(strings.TrimSpace(req.Email))
  userOTP := strings.TrimSpace(req.OTP)

  storedOTP, expiry := store.GetStoredOTP(email)
  if storedOTP == "" {
    http.Error(w, "No OTP found", http.StatusNotFound)
    return
  }
  if time.Now().After(expiry) {
    store.DeleteOTP(email)
    http.Error(w, "OTP expired", http.StatusUnauthorized)
    return
  }
  if userOTP != storedOTP {
    http.Error(w, "Invalid OTP", http.StatusUnauthorized)
    return
  }

  store.DeleteOTP(email)
  token := utils.CreateSecureToken()
  store.StoreSession(email, token)
  json.NewEncoder(w).Encode(map[string]string{
    "status": "verified",
    "token":  token,
  })
}

func SendMessage(w http.ResponseWriter, r *http.Request) {
  token := r.Header.Get("Authorization")
  email := store.ValidateSessionToken(token)
  if email == "" {
    http.Error(w, "Invalid token", http.StatusUnauthorized)
    return
  }
  json.NewEncoder(w).Encode(map[string]string{
    "status": "message sent",
    "user":   email,
  })
}

func Logout(w http.ResponseWriter, r *http.Request) {
  token := r.Header.Get("Authorization")
  store.DeleteSessionToken(token)
  json.NewEncoder(w).Encode(map[string]string{
    "status": "logged out",
  })
}