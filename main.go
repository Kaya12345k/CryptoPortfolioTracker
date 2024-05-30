package main

import (
    "encoding/json"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "os"

    "github.com/joho/godotenv"
)

type CryptoData struct {
    ID          string `json:"id"`
    Symbol      string `json:"symbol"`
    Name        string `json:"name"`
    CurrentPrice float64 `json:"current_price"`
}

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
    http.HandleFunc("/api/crypto", cryptoDataHandler)
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

func cryptoDataHandler(w http.ResponseWriter, r *http.Request) {
    cryptoData, err := fetchCryptoData("bitcoin") 
    if err != nil {
        http.Error(w, "Failed to fetch cryptocurrency data", http.StatusInternalServerError)
        return
    }

    jsonResponse, err := json.Marshal(cryptoData)
    if err != nil {
        http.Error(w, "Failed to process cryptocurrency data", http.StatusInternalServerError)
        return
    }
    w.Header().Set("Content-Type", "application/json")
    w.Write(jsonResponse)
}

func fetchCryptoData(cryptoID string) (*CryptoData, error) {
    url := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/%s?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false", cryptoID)
    response, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer response.Body.Close()

    if response.StatusCode != 200 {
        return nil, fmt.Errorf("error fetching cryptocurrency data, status code: %d", response.StatusCode)
    }

    body, err := ioutil.ReadAll(response.Body)
    if err != nil {
        return nil, err
    }

    var cryptoData CryptoData
    if err := json.Unmarshal(body, &cryptoData); err != nil {
        return nil, err
    }

    return &cryptoData, nil
}