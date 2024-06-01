package main

import (
    "encoding/json"
    "fmt"
    "io"
    "log"
    "net/http"
    "os"

    "github.com/joho/godotenv"
)

type CryptoData struct {
    ID           string  `json:"id"`
    Symbol       string  `json:"symbol"`
    Name         string  `json:"name"`
    CurrentPrice float64 `json:"current_price"`
}

func main() {
    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    serverPort := getServerPort()

    setupServerRoutes()

    log.Printf("Starting server on port %s", serverPort)
    startServer(serverPort)
}

func getServeraintPort() string {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
        log.Printf("Defaulting to port %s", port)
    }
    return port
}

func setupServerRoutes() {
    http.HandleFunc("/", homePageHandler)
    http.HandleFunc("/api/portfolio", portfolioDataHandler)
    http.HandleFunc("/api/crypto", cryptoDataHandler)
}

func startServer(port string) {
    log.Fatal(http.ListenAndServe(":"+port, nil))
}

func homePageHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Welcome to the Crypto Portfolio Tracker!")
}

func portfolioDataHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Portfolio data will be shown here.")
}

func cryptoDataHandler(w http.ResponseWriter, r *http.Request) {
    cryptoData, err := fetchCryptoData("bitcoin")
    if err != nil {
        http.Error(w, "Failed to fetch cryptocurrency data", http.StatusInternalServerError)
        return
    }

    jsonResponse, err := json.Marshal(cryptoData)
    if err != nil {
        http.Error(w, "Failed to encode cryptocurrency data", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonResponse)
}