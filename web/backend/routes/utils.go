package routes

import (
	"fmt"
	"net/http"
)
func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// Agar koi panic ho jaye toh server crash na kare — error handle ho jaye
func RecoverPanic(w http.ResponseWriter) {
	if rec := recover(); rec != nil {
		fmt.Println("❌ Recovered from panic:", rec)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}