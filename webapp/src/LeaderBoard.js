import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

const LeaderBoard = (props) => {
  const data = props.data;

  return (
    <div className="LeaderBoard">
      {data.map((obj, i) => {
        return (
          <div
            key={i}
            className={
              i % 2 === 1 ? 'listElement ' : 'listElement listElementDark'
            }
          >
            <div className="rank">
              <p>{i + 1}</p>
            </div>
            <div className="name">
              <p>{obj.name}</p>
            </div>
            <div className="score">
              <p>{obj.score}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

LeaderBoard.propTypes = {
  data: PropTypes.array,
};

export default LeaderBoard;
