import React from 'react';
import './App.css';
import LeaderBoard from './LeaderBoard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const fetchItem = async () => {
      //await fetch("http://127.0.0.1:8008")
      await fetch('http://127.0.0.1:8080/function/spreadsheet-api')
        .then((response) => response.json())
        .then((json) =>
          this.setState({
            data: json.sort((a, b) => b.score - a.score),
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
          <Switch>
            <Route
              path="/"
              exact
              component={() => <LeaderBoard data={data} />}
            />
            <Route path="/user/:name" component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const User = ({ match }) => <div>{match.params.name}</div>;

export default App;
