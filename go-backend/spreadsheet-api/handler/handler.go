package function

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
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
func getData(sheetRange string) ([][]interface{}, error) {
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

	ctx := context.Background()
	spreadsheetID := "1zquxtdTRSmOR8HZr1odgbUMtz8-LaPi_kpCKqrO5ATI"
	readRange := sheetRange
	resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).ValueRenderOption("UNFORMATTED_VALUE").Context(ctx).Do()
	if len(resp.Values) == 0 {
		return nil, err
	}
	return resp.Values, err
}

// Group struct for json response
type Group struct {
	Name             string      `json:"name"`
	ScoreSum         float64     `json:"scoreSum"`
	Class            string      `json:"class"`
	Image            string      `json:"image"`
	ScoreByChallenge []Challenge `json:"scoreByChallenge"`
}

// Challenge struct for individual challenge
type Challenge struct {
	Name  string  `json:"name"`
	Score float64 `json:"score"`
}

// Handle a function invocation
func Handle(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {

		data, err := getData("A2:I")
		if err != nil {
			http.Error(w, fmt.Sprintf("Failed to get data from spreadsheet: %s",
				err.Error()), http.StatusInternalServerError)
			return
		}

		scoreList := []Group{}
		challengeList := []string{}
		// creates a Group object for each entry in the sheet document
		for i, row := range data {
			group := Group{}
			// creates an array with the names of all the 4 challenges
			// TODO make this dynamic
			if i == 0 {
				challengeList = append(challengeList, row[3].(string))
				challengeList = append(challengeList, row[4].(string))
				challengeList = append(challengeList, row[5].(string))
				challengeList = append(challengeList, row[6].(string))
			} else {
				group.Name = row[0].(string)
				score, err := row[7].(float64)
				if err == true {
					score = 0
				}
				group.ScoreSum = score
				group.Image = row[2].(string)
				group.Class = strings.ToUpper(row[1].(string))
				// appends each challenge and associated score to the group
				for j, c := range challengeList {
					tmpScore, err := row[3+j].(float64)
					if err == true {
						tmpScore = 0
					}
					group.ScoreByChallenge = append(group.ScoreByChallenge, Challenge{c, tmpScore})
				}
				scoreList = append(scoreList, group)
			}
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
