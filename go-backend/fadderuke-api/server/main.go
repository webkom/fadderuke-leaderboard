package main

import (
	"fmt"
	"net/http"
	SpreadsheetHandler "spreadsheet-api/spreadsheet-api/handler"
)

func main() {
	fmt.Print("Listening on :8008")
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8008", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	SpreadsheetHandler.Handle(w, r)
}
