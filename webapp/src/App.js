import React from 'react';
import './App.css';
import LeaderBoard from './LeaderBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import GroupPage from './GroupPage';
import Async from 'react-async';
import Footer from './Footer';

const fetchData = () =>
  fetch(process.env.REACT_APP_API_URL)
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
              <Footer />
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
              <Footer />
            </div>
          </Router>
        );
      if (data) {
        const responseData = data.data;
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
                  path="/data"
                  exact
                  component={() => (
                    <LeaderBoard
                      data={responseData.filter((g) => g.major !== 'K')}
                    />
                  )}
                />
                <Route
                  path="/komtek"
                  exact
                  component={() => (
                    <LeaderBoard
                      data={responseData.filter((g) => g.major === 'K')}
                    />
                  )}
                />
                <Route
                  path="/group/:name"
                  render={({ match }) => (
                    <GroupPage
                      group={responseData.find(
                        (g) => g.name === match.params.name
                      )}
                    />
                  )}
                />
              </Switch>
              <Footer />
            </div>
          </Router>
        );
      }
    }}
  </Async>
);

export default App;
