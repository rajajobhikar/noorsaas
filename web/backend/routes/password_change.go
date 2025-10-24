package routes

import (
  "net/http"
  "wkt3/store"
)

func ChangePassword(w http.ResponseWriter, r *http.Request) {
  // 🔸 Password change logic yahan likhna hoga
  // Example: validate old password, update new password

  // ✅ Auto logout after password change
  userID := "WKT3-207322-895" // ← dynamic hona chahiye
  store.InvalidateSession(userID)

  w.Write([]byte("Password changed and session invalidated"))
}