// db/connect.go
package db

import (
  "context"
  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectCollection(name string) (*mongo.Collection, error) {
  client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
  if err != nil {
    return nil, err
  }
  return client.Database("wkt3db").Collection(name), nil
}