// routes/create.go
package routes

import (
	"context"
	"encoding/json"
	"net/http"
	"wkt3/db"
	"wkt3/models"
)

func CreateDocument(w http.ResponseWriter, r *http.Request) {
  var doc models.Document
  json.NewDecoder(r.Body).Decode(&doc)

  collection, err := db.ConnectCollection("documents")
  if doc.OwnerID == "" || doc.Title == "" || doc.Type == "" || len(doc.Tags) == 0 || len(doc.Content) == 0 {
  http.Error(w, "Missing required fields", http.StatusBadRequest)
  return
 }

  if err != nil {
    http.Error(w, "DB error", 500)
    return
  }
  json.NewEncoder(w).Encode(map[string]string{
  "error": "All fields are required. Empty fields are not allowed.",
})

  _, err = collection.InsertOne(context.TODO(), doc)
  if err != nil {
    http.Error(w, "Insert error", 500)
    return
  }

  w.WriteHeader(http.StatusCreated)
}