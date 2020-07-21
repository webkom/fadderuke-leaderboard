package function

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	handler "github.com/openfaas-incubator/go-function-sdk"
	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/sheets/v4"
)

func renderError(err error) handler.Response {
	message := fmt.Sprintf("Unexpected error occured %s", err)
	return handler.Response{
		Body:   []byte(message),
		Header: http.Header{"Access-Control-Allow-Origin": []string{"*"}},
	}
}

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
		return nil, err
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
	readRange := "A2:B"
	resp, err := srv.Spreadsheets.Values.Get(spreadsheetID, readRange).Do()
	if len(resp.Values) == 0 {
		return nil, err
	} else {
		return resp.Values, err
	}
}

type Group struct {
	Name  string `json:"name"`
	Score string `json:"score"`
}

// Handle a function invocation
func Handle(req handler.Request) (handler.Response, error) {
	var err error

	data, err := getData()
	if err != nil {
		return renderError(err), err
	}

	scoreList := []Group{}
	for _, row := range data {
		group := Group{}
		group.Name = row[0].(string)
		group.Score = row[1].(string)
		scoreList = append(scoreList, group)
	}

	jsonObj, err := json.Marshal(scoreList)
	if err != nil {
		return renderError(err), err
	}

	message := fmt.Sprintf("%s", jsonObj)

	return handler.Response{
		Body:       []byte(message),
		StatusCode: http.StatusOK,
		Header: http.Header{"Access-Control-Allow-Origin": []string{"*"},
			"Access-Control-Allow-Methods": []string{"GET"},
			"Content-Type":                 []string{"application/json"}},
	}, err
}
