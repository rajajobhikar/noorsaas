package store

import (
  "context"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client
var OTPCollection *mongo.Collection
var SessionCollection *mongo.Collection

func InitDB() {
  client, _ := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
  Client = client
  OTPCollection = client.Database("wkt3").Collection("otps")
  SessionCollection = client.Database("wkt3").Collection("sessions")
}