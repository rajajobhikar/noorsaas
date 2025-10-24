package routes

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/bson"

	"wkt3/db" // adjust if your db package path is different
)

// Input model for device registration
type RegisterDeviceInput struct {
	UserID string `json:"user_id"`
	Serial string `json:"serial"`
}

// Handler function
func RegisterDevice(w http.ResponseWriter, r *http.Request) {
	// Decode input
	var input RegisterDeviceInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Connect to MongoDB collection
	collection, err := db.ConnectCollection("device_registry")
	if err != nil {
		http.Error(w, "Database connection error", http.StatusInternalServerError)
		return
	}

	// Insert device record
	_, err = collection.InsertOne(context.TODO(), bson.M{
		"user_id":   input.UserID,
		"serial":    input.Serial,
		"verified":  false,
		"timestamp": time.Now(),
	})
	if err != nil {
		http.Error(w, "Failed to register device", http.StatusInternalServerError)
		return
	}

	// Respond success
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bson.M{"status": "registered"})
}