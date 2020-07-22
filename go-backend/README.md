# Backend with Golang and openfaas

## Running locally

Run a local server at http:localhost:8008

```bash
go run spreadsheet-api/server/main.go
```

## Running with OpenFaaS 

Currently this is a private repo with the secrets available. This MUST be changed when the repo goes public.

Firstly setup openfaas with docker swarm. Follow steps 1-2.1 in this [GUIDE](https://docs.openfaas.com/deployment/docker-swarm/).

You need to create a docker secret with the secrets.json:

```bash
docker secret create google-sheets-credentials \
 secrets.json
```

Then you need to build and deploy the backend (remember to login before doing this):

```bash
faas build -f spreadsheet-api.yml
faas deploy -f spreadsheet-api.yml
```
