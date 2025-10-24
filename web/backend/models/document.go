// models/document.go
package models

type Document struct {
  OwnerID string                 `json:"owner_id" bson:"owner_id"`
  Title   string                 `json:"title" bson:"title"`
  Type    string                 `json:"type" bson:"type"`
  Tags    []string               `json:"tags" bson:"tags"`
  Content map[string]interface{} `json:"content" bson:"content"`
}