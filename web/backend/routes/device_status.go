package routes

import (
	"context"
	"encoding/json"
	"net/http"

	"wkt3/db"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DeviceStatus(w http.ResponseWriter, r *http.Request) {
	serial := r.URL.Query().Get("serial")
	if serial == "" {
		http.Error(w, "Missing serial", http.StatusBadRequest)
		return
	}

	collection, err := db.ConnectCollection("device_registry")
	if err != nil {
		http.Error(w, "DB error", http.StatusInternalServerError)
		return
	}

	var result bson.M
	err = collection.FindOne(context.TODO(), bson.M{"serial": serial}).Decode(&result)
	if err != nil {
		http.Error(w, "Device not found", http.StatusNotFound)
		return
	}

	// Optional: fetch last message from secure_messages
	msgCol, _ := db.ConnectCollection("secure_messages")
	var lastMsg bson.M
	if msgCol != nil {
		// use keyed fields for bson.D elements to avoid unkeyed composite literal error
		err = msgCol.FindOne(context.TODO(), bson.M{"to_device": serial}, options.FindOne().SetSort(bson.D{{Key: "timestamp", Value: -1}})).Decode(&lastMsg)
		if err != nil && err != mongo.ErrNoDocuments {
			// ignore or handle as needed; keep lastMsg empty on error
			lastMsg = bson.M{}
		}
	}

	json.NewEncoder(w).Encode(bson.M{
		"status":       result["verified"],
		"last_message": lastMsg["message"],
	})
}