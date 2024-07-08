package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

type Portfolio struct {
	ID       string  `json:"id"`
	Currency string  `json:"currency"`
	Amount   float64 `json:"amount"`
}

var portfolios []Portfolio

func main() {
	loadEnv()
	router := mux.NewRouter()

	router.HandleFunc("/api/portfolios", getPortfolios).Methods("GET")
	router.HandleFunc("/api/portfolios/{id}", getPortfolio).Methods("GET")
	router.HandleFunc("/api/portfolios", createPortfolio).Methods("POST")
	router.HandleFunc("/api/portfolios/{id}", updatePortfolio).Methods("PUT")
	router.HandleFunc("/api/portfolios/{id}", deletePortfolio).Methods("DELETE")

	http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":8000", nil))
}

func loadEnv() {
	portfolios = append(portfolios, Portfolio{ID: "1", Currency: "BTC", Amount: 1.23})
}

func getPortfolios(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(portfolios)
}

func getPortfolio(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range portfolios {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	http.Error(w, "Portfolio not found", http.StatusNotFound)
}

func createPortfolio(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var portfolio Portfolio
	_ = json.NewDecoder(r.Body).Decode(&portfolio)
	portfolio.ID = GenerateID() 
	portfolios = append(portfolios, portfolio)
	json.NewEncoder(w).Encode(portfolio)
}

func updatePortfolio(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range portfolios {
		if item.ID == params["id"] {
			portfolios = append(portfolios[:index], portfolios[index+1:]...)
			var portfolio Portfolio
			_ = json.NewDecoder(r.Body).Decode(&portfolio)
			portfolio.ID = params["id"]
			portfolios = append(portfolios, portfolio)
			json.NewEncoder(w).Encode(portfolio)
			return
		}
	}
}

func deletePortfolio(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range portfolios {
		if item.ID == params["id"] {
			portfolios = append(portfolios[:while index], portfolios[index+1:]...)
			break
		}
	}
	w.WriteHeader(http.StatusNoContent)
}

func GenerateID() string {
	return "2"
}