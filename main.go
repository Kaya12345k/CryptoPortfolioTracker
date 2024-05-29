package main

import (
    "fmt"
    "log"
    "net/http"
    "os"

    "github.com/joho/godotenv"
)

func main() {
    if err := loadEnvironmentVariables(); err != nil {
        log.Println("No .env file found")
    }

    serverPort := getServerPort()
    setupServerRoutes()

    log.Printf("Starting server on port %s", serverPort)
    startServer(serverPort)
}

func loadEnvironmentVariables() error {
    return godotenv.Load()
}

func getServerPort() string {
    port := os.Getenv("PORT")
    if port == "" {
        defaultPort := "8080"
        port = defaultPort
        log.Printf("Defaulting to port %s", defaultPort)
    }
    return port
}

func setupServerRoutes() {
    http.HandleFunc("/", homePageHandler)
    http.HandleFunc("/api/portfolio", portfolioDataHandler)
}

func startServer(port string) {
    if err := http.ListenAndServe(":"+port, nil); err != nil {
        log.Fatalf("Failed to start server: %v", err)
    }
}

func homePageHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the Crypto Portfolio Tracker!")
}

func portfolioDataHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Portfolio data will be shown here.")
}