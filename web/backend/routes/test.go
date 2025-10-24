package routes

import (
	"net/http"
	"wkt3/store"
)

func TestInvalidateSession(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	store.InvalidateSession(userID)
	w.Write([]byte("Session invalidated for user: " + userID))
}