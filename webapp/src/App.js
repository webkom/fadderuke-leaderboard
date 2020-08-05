import React from 'react';
import './App.css';
import LeaderBoard from './LeaderBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import GroupPage from './GroupPage';
import Async from 'react-async';

const fetchData = () =>
  fetch('http://127.0.0.1:8080/function/spreadsheet-api')
    //fetch('http://127.0.0.1:8008')
    .then((res) => (res.ok ? res : Promise.reject(res)))
    .then((res) => res.json());

const App = () => (
  <Async promiseFn={fetchData}>
    {({ data, error, isLoading }) => {
      if (isLoading)
        return (
          <Router>
            <div className="container">
              <Nav />
              <div className="loading">
                <h2>Laster...</h2>
              </div>
            </div>
          </Router>
        );
      if (error)
        return (
          <Router>
            <div className="container">
              <Nav />
              <div className="loading">
                <h2>Noe gikk feil: ${error.message}</h2>
                <p>Webkom er på saken</p>
              </div>
            </div>
          </Router>
        );
      if (data) {
        const responseData = data.data.sort((a, b) => b.scoreSum - a.scoreSum);
        return (
          <Router>
            <div className="container">
              <Nav />
              <Switch>
                <Route
                  path="/"
                  exact
                  component={() => <LeaderBoard data={responseData} />}
                />
                <Route
                  path="/user/:id"
                  render={({ match }) => (
                    <GroupPage group={responseData[match.params.id]} />
                  )}
                />
              </Switch>
            </div>
          </Router>
        );
      }
    }}
  </Async>
);

export default App;
