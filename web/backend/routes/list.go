package routes

import (
  "context"
  "encoding/json"
  "net/http"
  "wkt3/db"
)

func ListDocuments(w http.ResponseWriter, r *http.Request) {
  collection, err := db.ConnectCollection("documents")
  if err != nil {
    http.Error(w, "DB connection error", 500)
    return
  }

  cursor, err := collection.Find(context.TODO(), map[string]interface{}{})
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