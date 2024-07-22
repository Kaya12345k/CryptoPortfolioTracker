package main

import (
    "fmt"
    "log"
    "os"
    "github.com/joho/godotenv"
    "time"
)

type Portfolio struct {
    ID               string           `json:"id"`
    UserID           string           `json:"userId"`
    Cryptocurrencies []Cryptocurrency `json:"cryptocurrencies"`
}

type Cryptocurrency struct {
    ID     string  `json:"id"`
    Name   string  `json:"name"`
    Symbol string  `json:"symbol"`
    Amount float64 `json:"amount"`
    Value  float64 `json:"value"`
}

type CacheItem struct {
    Value     float64
    FetchTime time.Time
}

var valueCache = make(map[string]CacheItem)

func getCryptoValue(symbol string) float64 {
    mockValues := map[string]float64{"BTC": 60000.0, "ETH": 4000.0}
    return mockValues[symbol]
}

func getCachedCryptoValue(symbol string) float64 {
    if item, found := valueCache[symbol]; found {
        if time.Since(item.FetchTime) < 1*time.Minute {
            fmt.Println("Fetching from cache for symbol:", symbol)
            return item.Value
        }
    }

    value := getCryptoValue(symbol)

    valueCache[symbol] = CacheItem{Value: value, FetchTime: time.Now()}

    return value
}

func main() {
    if err := godotenv.Load(); err != nil {
        log.Fatalf("Error loading .env file: %s", err)
    }

    dbUser := os.Getenv("DB_USER")
    dbPassword := os.Getenv("DB_PASSWORD")
    if dbUser == "" || dbPassword == "" {
        log.Fatal("Database credentials are not set in environment variables")
    }

    fmt.Println("Database User:", dbUser)
    fmt.Printf("Database Password: %s\n", dbPassword)

    portfolio := Portfolio{
        ID:     "portfolio123",
        UserID: "user456",
        Cryptocurrencies: []Cryptocurrency{
            {
                ID:     "crypto789",
                Name:   "Bitcoin",
                Symbol: "BTC",
                Amount: 2.0,
                Value:  getCachedCryptoValue("BTC"),
            },
            {
                ID:     "crypto101",
                Name:   "Ethereum",
                Symbol: "ETH",
                Amount: 5.5,
                Value:  getCachedCryptoValue("ETH"),
            },
        },
    }

    fmt.Printf("Portfolio: %+v\n", portfolio)
}