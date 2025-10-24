// routes/get.go
package routes

import (
  "context"
  "encoding/json"
  "net/http"
  "strings"
  "wkt3/db"
  "go.mongodb.org/mongo-driver/bson"
  "go.mongodb.org/mongo-driver/bson/primitive"
)

func GetDocument(w http.ResponseWriter, r *http.Request) {
  id := strings.TrimPrefix(r.URL.Path, "/documents/")
  objID, err := primitive.ObjectIDFromHex(id)
  if err != nil {
    http.Error(w, "Invalid ID", 400)
    return
  }

  collection, err := db.ConnectCollection("documents")
  if err != nil {
    http.Error(w, "DB error", 500)
    return
  }

  var result map[string]interface{}
  err = collection.FindOne(context.TODO(), bson.M{"_id": objID}).Decode(&result)
  if err != nil {
    http.Error(w, "Not found", 404)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(result)
}