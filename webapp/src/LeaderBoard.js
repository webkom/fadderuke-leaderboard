import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Link } from 'react-router-dom';

function LeaderBoard(props) {
  const data = props.data;

  return (
    <div className="LeaderBoard">
      {data.map((group, i) => {
        return (
          <Link
            to={`/group/${group.name}`}
            key={i}
            className={
              i % 2 === 1 ? 'listElement ' : 'listElement listElementDark'
            }
          >
            <div className="boardRank">
              <p>{i + 1}</p>
            </div>
            <div className="boardName">
              <p>{group.name}</p>
            </div>
            <div className="boardScore">
              <p>{group.scoreSum}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

LeaderBoard.propTypes = {
  data: PropTypes.array,
};

export default LeaderBoard;
