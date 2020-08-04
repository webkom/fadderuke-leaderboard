import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Link } from 'react-router-dom';

const LeaderBoard = (props) => {
  const data = props.data;

  return (
    <div className="LeaderBoard">
      {data.map((obj, i) => {
        return (
          <Link
            to={`/user/${obj.name}`}
            key={i}
            className={
              i % 2 === 1 ? 'listElement ' : 'listElement listElementDark'
            }
          >
            <div className="boardRank">
              <p>{i + 1}</p>
            </div>
            <div className="boardName">
              <p>
                {obj.name}, {obj.class}
              </p>
            </div>
            <div className="boardScore">
              <p>{obj.scoreSum}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

LeaderBoard.propTypes = {
  data: PropTypes.array,
};

export default LeaderBoard;
