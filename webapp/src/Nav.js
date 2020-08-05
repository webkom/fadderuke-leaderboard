import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="Nav">
      <p>
        <a
          target="blank"
          rel="noreferrer noopener"
          href="https://abakus.no/articles/283"
          className="fadderukeLink"
        >
          <b>Abakus fadderuke</b>
        </a>
      </p>
      <Link className="leaderboardTitle" to={`/`}>
        <p>LEADERBOARD</p>
      </Link>
    </div>
  );
};
export default Nav;
