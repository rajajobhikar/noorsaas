package routes

import (
	"go.mongodb.org/mongo-driver/mongo")

var Client *mongo.Client

func Init(client *mongo.Client) {
	Client = client
}