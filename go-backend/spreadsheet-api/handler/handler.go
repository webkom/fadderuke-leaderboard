package function

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"

	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/sheets/v4"
)

func getAPISecret(secretName string) (secretBytes []byte, err error) {
	// read from the openfaas secrets folder
	secretBytes, err = ioutil.ReadFile("/var/openfaas/secrets/" + secretName)
	if err != nil {
		// read from the original location for backwards compatibility with openfaas <= 0.8.2
		secretBytes, err = ioutil.ReadFile("/run/secrets/" + secretName)
	}

	return secretBytes, err
}

//get data from google spreadsheet document using google sheets api
func getData() ([][]interface{}, error) {
	data, err := getAPISecret("google-sheets-credentials")
	if err != nil {
		// read from local file for running local server
		data, err = ioutil.ReadFile("../../secrets.json")
		if err != nil {
			return nil, err
		}
	}
	conf, err := google.JWTConfigFromJSON(data, sheets.SpreadsheetsScope)
	if err != nil {
		return nil, err
	}

	client := conf.Client(context.TODO())
	srv, err := sheets.New(client)
	if err != nil {
		return nil, err
	}

	spreadsheetID := "1zquxtdTRSmOR8HZr1odgbUMtz8-LaPi_kpCKqrO5ATI"
	readRange := "A2:C"
	resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Do()
	if len(resp.Values) == 0 {
		return nil, err
	} else {
		return resp.Values, err
	}
}

// struct for json response
type Group struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
	Class string `json:"class"`
}

// Handle a function invocation
func Handle(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {

		data, err := getData()
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to get data from spreadsheet: %s",
				err.Error()), http.StatusInternalServerError)
			return
		}

		scoreList := []Group{}
		// creates a Group object for each entry in the sheet document
		for _, row := range data {
			group := Group{}
			group.Name = row[0].(string)
			group.Score, err = strconv.Atoi(row[1].(string))
			group.Class = strings.ToUpper(row[2].(string))
			if err != nil {
				http.Error(w, fmt.Sprintf("Failed to strconv: %s", err.Error()),
					http.StatusInternalServerError)
				return
			}
			scoreList = append(scoreList, group)
		}

		out, err := json.Marshal(scoreList)
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to marshal: %s", err.Error()),
				http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Write(out)
	} else {
		http.Error(w, fmt.Sprintf("Only allowed action is GET"),
			http.StatusForbidden)
	}
}
