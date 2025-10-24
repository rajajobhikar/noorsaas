package db

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// MongoDB client ko initialize karne ka function
func InitMongo() *mongo.Client {
	// MongoDB ka URI — yeh tumhare local ya remote server ka address hai
	uri := "mongodb://localhost:27017"

	// Client options set kar rahe hain — timeout ke saath
	clientOptions := options.Client().ApplyURI(uri)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// MongoDB client connect kar rahe hain
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		panic(err) // Agar connection fail ho gaya toh program crash kar dena
	}

	// Ping karke confirm kar rahe hain ki MongoDB se connection ho gaya
	err = client.Ping(ctx, nil)
	if err != nil {
		panic(err)
	}

	fmt.Println("✅ MongoDB connection successful")
	return client
}