package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

type CryptoPortfolio struct {
	ID       string  `json:"id"`
	Currency string  `json:"currency"`
	Amount   float64 `json:"amount"`
}

var portfolioList []CryptoPortfolio

func main() {
	initializePortfolioData()
	router := mux.NewRouter()

	router.HandleFunc("/api/portfolios", retrievePortfoliosHandler).Methods("GET")
	router.HandleFunc("/api/portfolios/{id}", retrievePortfolioHandler).Methods("GET")
	router.HandleFunc("/api/portfolios", createPortfolioHandler).Methods("POST")
	router.HandleFunc("/api/portfolios/{id}", updatePortfolioHandler).Methods("PUT")
	router.HandleFunc("/api/portfolios/{id}", deletePortfolioHandler).Methods("DELETE")

	http.Handle("/", router)

	log.Fatal(http.ListenAndServe(":8000", nil))
}

func initializePortfolioData() {
	portfolioList = append(portfolioList, CryptoPortfolio{ID: "1", Currency: "BTC", Amount: 1.23})
}

func retrievePortfoliosHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(portfolioList)
}

func retrievePortfolioHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, portfolio := range portfolioList {
		if portfolio.ID == params["id"] {
			json.NewEncoder(w).Encode(portfolio)
			return
		}
	}
	http.Error(w, "Portfolio not found", http.StatusNotFound)
}

func createPortfolioHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var newPortfolio CryptoPortfolio
	_ = json.NewDecoder(r.Body).Decode(&newPortfolio)
	newPortfolio.ID = generateUniqueID() 
	portfolioList = append(portfolioList, newPortfolio)
	json.NewEncoder(w).Encode(newPortfolio)
}

func updatePortfolioHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, existingPortfolio := range portfolioList {
		if existingPortfolio.ID == params["id"] {
			// Removing the existing portfolio
			portfolioList = append(portfolioList[:index], portfolioList[index+1:]...)
			var updatedPortfolio CryptoPortfolio
			_ = json.NewDecoder(r.Body).Decode(&updatedPortfolio)
			updatedPortfolio.ID = params["id"]
			portfolioList = append(portfolioList, updatedPortfolio)
			json.NewEncoder(w).Encode(updatedPortfolio)
			return
		}
	}
}

func deletePortfolioHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, portfolioToDelete := range portfolioList {
		if portfolioToDelete.ID == params["id"] {
			portfolioList = append(portfolioList[:index], portfolioList[index+1:]...)
			break
		}
	}
	w.WriteHeader(http.StatusNoContent)
}

func generateUniqueID() string {
	// Dummy implementation for unique ID generation. You might want to replace this with a real unique ID generator.
	return "2"
}