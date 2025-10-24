package routes

import (
  "net/http"
  "wkt3/store"
)

func Enable2FA(w http.ResponseWriter, r *http.Request) {
  // 🔸 2FA enable flag set karo (e.g. in user profile)

  // ✅ Auto logout after enabling 2FA
  userID := "WKT3-207322-895" // ← dynamic hona chahiye
  store.InvalidateSession(userID)

  w.Write([]byte("2FA enabled and session invalidated"))
}