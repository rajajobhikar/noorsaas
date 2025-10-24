package services

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"wkt3/db"
)

func MarkSessionVerified(phone string) {
	collection, _ := db.ConnectCollection("sessions")
	collection.UpdateMany(context.TODO(), bson.M{"phone": phone}, bson.M{
		"$set": bson.M{"verified": true},
	})
}