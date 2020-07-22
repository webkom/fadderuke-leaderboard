package main

import (
	"fmt"
	"net/http"
	SpreadsheetHandler "spreadsheet-api/spreadsheet-api/handler"
)

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8008", nil)
	fmt.Print("Listening on :8008")
}

func handler(w http.ResponseWriter, r *http.Request) {
	SpreadsheetHandler.Handle(w, r)
}
