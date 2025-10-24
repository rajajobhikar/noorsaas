package main

import (
  "context"
  "fmt"
  "log"
  "net/http"
  "wkt3/routes"
  "wkt3/db"

  "go.mongodb.org/mongo-driver/mongo"
  "go.mongodb.org/mongo-driver/mongo/options"
)

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // OR: "http://localhost:3000"
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

func main() {
   // Initialize MongoDB client'
   	// MongoDB client initialize kar rahe hain
	client := db.InitMongo()

  	// Routes package ko client de rahe hain — taaki har route use kar sake
	routes.Init(client)

   client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
   if err != nil {
      log.Fatal(err)
   }
   defer client.Disconnect(context.TODO())

   // Test the connection
   err = client.Ping(context.TODO(), nil)
   if err != nil {
      log.Fatal(err)
   }
   fmt.Println("✅ Connected to MongoDB")

   http.HandleFunc("/documents/create", func(w http.ResponseWriter, r *http.Request) {
    enableCORS(w)
    if r.Method == "OPTIONS" {
      return
    }
    routes.CreateDocument(w, r)
  })

  http.HandleFunc("/auth/send-otp", func(w http.ResponseWriter, r *http.Request) {
  enableCORS(w)
  if r.Method == "OPTIONS" {
    return
  }
  routes.SendOTP(w, r)
})

  http.HandleFunc("/documents/list", func(w http.ResponseWriter, r *http.Request) {
    enableCORS(w)
    if r.Method == "OPTIONS" {
      return
    }
    routes.ListDocuments(w, r)
  })

  http.HandleFunc("/documents/search", func(w http.ResponseWriter, r *http.Request) {
  enableCORS(w)
  if r.Method == "OPTIONS" {
    return
  }
  routes.SearchDocuments(w, r)
})

http.HandleFunc("/test/invalidate", func(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		return
	}
	routes.TestInvalidateSession(w, r)
})

http.HandleFunc("/register-device", func(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		return
	}
	if r.Method != "POST" {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	routes.RegisterDevice(w, r)
})

http.HandleFunc("/documents/", func(w http.ResponseWriter, r *http.Request) {
  enableCORS(w)
  if r.Method == "OPTIONS" {
    return
  }
  routes.GetDocument(w, r)
})

	http.HandleFunc("/signin", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}
		routes.Signin(client)(w, r)
	})

	http.HandleFunc("/create-user", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}
		routes.CreateUser(client)(w, r)
	})

http.HandleFunc("/auth/resend-otp", func(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		return
	}
	routes.ResendOTP(client)(w, r)
})

http.HandleFunc("/auth/verify-user", func(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		return
	}
	routes.VerifyUser(client)(w, r)
})

  fmt.Println("✅ Server is running at http://localhost:8080")
  http.ListenAndServe(":8080", nil)
}