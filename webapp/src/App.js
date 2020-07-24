import React from 'react';
import './App.css';
import LeaderBoard from './LeaderBoard';

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
      <div className="container">
        <div className="header">
          <p>Abakus fadderuke scoreboard</p>
        </div>
        <LeaderBoard data={data} />
      </div>
    );
  }
}

export default App;
