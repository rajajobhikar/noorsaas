package routes

import (
  "context"
  "encoding/json"
  "net/http"
  "wkt3/db"
  "go.mongodb.org/mongo-driver/bson"
)

func SearchDocuments(w http.ResponseWriter, r *http.Request) {
  typeParam := r.URL.Query().Get("type")
  tagParam := r.URL.Query().Get("tag")

  filter := bson.M{}
  if typeParam != "" {
    filter["type"] = typeParam
  }
  if tagParam != "" {
    filter["tags"] = tagParam
  }

  collection, err := db.ConnectCollection("documents")
  if err != nil {
    http.Error(w, "DB connection error", 500)
    return
  }

  cursor, err := collection.Find(context.TODO(), filter)
  if err != nil {
    http.Error(w, "Find error", 500)
    return
  }

  var results []map[string]interface{}
  if err = cursor.All(context.TODO(), &results); err != nil {
    http.Error(w, "Cursor error", 500)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(results)
}