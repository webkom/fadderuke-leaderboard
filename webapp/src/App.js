import React from 'react';
import './App.css';
import LeaderBoard from './LeaderBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import GroupPage from './GroupPage';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    const fetchItem = async () => {
      await fetch('http://127.0.0.1:8008')
        //await fetch('http://127.0.0.1:8080/function/spreadsheet-api')
        .then((response) => response.json())
        .then((json) =>
          this.setState({
            data: json.sort((a, b) => b.score - a.score),
            loading: false,
          })
        );
    };

    fetchItem();
  }

  render() {
    const { data } = this.state;

    return (
      <Router>
        <div className="container">
          <Nav />
          {this.state.loading ? (
            <div className="loading">
              <h2>Laster...</h2>
            </div>
          ) : (
            <Switch>
              <Route
                path="/"
                exact
                component={() => <LeaderBoard data={data} />}
              />
              <Route
                path="/user/:id"
                render={({ match }) => (
                  <GroupPage group={data[match.params.id]} />
                )}
              />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
