package store

import (
  "time"
  	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"wkt3/db"

)

type SessionEntry struct {
  Email string
  CreatedAt time.Time
}

var sessionMemory = map[string]SessionEntry{}

func StoreSession(email, token string) {
  sessionMemory[token] = SessionEntry{
    Email: email,
    CreatedAt: time.Now(),
  }
}


// ✅ Session invalidate karne ke liye function
func InvalidateSession(userID string) {
	collection, err := db.ConnectCollection("sessions") // ✅ Correct spelling: "sessions"
	if err != nil {
		log.Println("DB connection error:", err)
		return
	}

	_, err = collection.DeleteMany(context.TODO(), bson.M{"user_id": userID})
	if err != nil {
		log.Println("Session deletion error:", err)
	}
}


func ValidateSessionToken(token string) string {
  entry, ok := sessionMemory[token]
  if !ok {
    return ""
  }
  return entry.Email
}



func DeleteSessionToken(token string) {
  delete(sessionMemory, token)
}