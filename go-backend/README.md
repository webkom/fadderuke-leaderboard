# Backend with Golang and openfaas

## Running locally

Run a local server at http:localhost:8008
( You will need to have a secrets.json file for google sheets API credentials in the go-backend folder. And change the spreadsheetID var in the getData func to correct ID for your sheet )

```bash
cd fadderuke-api/server && go run main.go
```

## Running with OpenFaaS

Firstly setup openfaas with docker swarm. Follow steps 1-2.1 in this [GUIDE](https://docs.openfaas.com/deployment/docker-swarm/).

Pull golang-http template:

```bash
faas-cli template store pull golang-http
```

You need to create a docker secret with the secrets.json for google sheets API:

```bash
docker secret create google-sheets-credentials \
 secrets.json
```

Then you need to build and deploy the backend (remember to login before doing this):

```bash
faas build -f spreadsheet-api.yml
faas deploy -f spreadsheet-api.yml
```
