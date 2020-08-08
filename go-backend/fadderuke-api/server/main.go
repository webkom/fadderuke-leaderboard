package main

import (
	SpreadsheetHandler "fadderuke-api/fadderuke-api/handler"
	"fmt"
	"net/http"
)

func main() {
	fmt.Print("Listening on :8008")
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8008", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	SpreadsheetHandler.Handle(w, r)
}
