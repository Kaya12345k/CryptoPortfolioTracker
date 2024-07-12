package main

import (
	"encoding/json"
	"log"
	"net/http"
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
	router := setupRouter()
	log.Fatal(http.ListenAndServe(":8000", router))
}

func initializePortfolioData() {
	portfolioList = append(portfolioList, CryptoPortfolio{ID: "1", Currency: "BTC", Amount: 1.23})
}

func setupRouter() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/api/portfolios", retrievePortfoliosHandler).Methods("GET")
	router.HandleFunc("/api/portfolios/{id}", retrievePortfolioHandler).Methods("GET")
	router.HandleFunc("/api/portfolios", createPortfolioHandler).Methods("POST")
	router.HandleFunc("/api/portfolios/{id}", updatePortfolioHandler).Methods("PUT")
	router.HandleFunc("/api/portfolios/{id}", deletePortfolioHandler).Methods("DELETE")
	return router
}

func retrievePortfoliosHandler(w http.ResponseWriter, r *http.Request) {
	sendJSONResponse(w, portfolioList)
}

func retrievePortfolioHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, portfolio := range portfolioList {
		if portfolio.ID == params["id"] {
			sendJSONResponse(w, portfolio)
			return
		}
	}
	http.Error(w, "Portfolio not found", http.StatusNotFound)
}

func createPortfolioHandler(w http.ResponseWriter, r *http.Request) {
	var newPortfolio CryptoPortfolio
	if decodeJSONBody(w, r, &newPortfolio) {
		return
	}
	newPortfolio.ID = generateUniqueID()
	portfolioList = append(portfolioList, newPortfolio)
	sendJSONResponse(w, newPortfolio)
}

func updatePortfolioHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, existingPortfolio := range portfolioList {
		if existingPortfolio.ID == params["id"] {
			var updatedPortfolio CryptoPortfolio
			if decodeJSONBody(w, r, &updatedPortfolio) {
				return
			}
			updatedPortfolio.ID = params["id"]
			portfolioList[index] = updatedPortfolio
			sendJSONResponse(w, updatedPortfolio)
			return
		}
	}
}

func deletePortfolioHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, portfolioToDelete := range portfolio list {
		if portfolioToDelete.ID == params["id"] {
			portfolioList = append(portfolioList[:index], portfolioList[index+1:]...)
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
}

func generateUniqueID() string {
	return "2"
}

func sendJSONResponse(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(v); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func decodeJSONBody(w http.ResponseWriter, r *http.Request, dst interface{}) bool {
	if err := json.NewDecoder(r.Body).Decode(dst); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return true
	}
	return false
}