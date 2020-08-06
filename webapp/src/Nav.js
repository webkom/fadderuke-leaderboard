import React from 'react';
import './App.css';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="Nav">
      <div className="leaderboardTitle">
        <p>
          <a
            target="blank"
            rel="noreferrer noopener"
            href="https://abakus.no/"
            className="fadderukeLink"
          >
            ABAKUS
          </a>{' '}
          LEADERBOARD
        </p>
        <p>
          Mer om fadderuken&nbsp;
          <a
            target="blank"
            rel="noreferrer noopener"
            href="https://abakus.no/articles/283"
            className="fadderukeLink"
          >
            <b>her</b>
          </a>
        </p>
      </div>
      <ul className="sortBar">
        <Link
          to="/data"
          className={`sortElement ${
            useLocation().pathname === '/data' ? 'sortElementSelected' : ''
          }`}
        >
          Data
        </Link>
        <Link
          to="/"
          className={`sortElement ${
            useLocation().pathname === '/' ? 'sortElementSelected' : ''
          }`}
        >
          Alle
        </Link>
        <Link
          to="/komtek"
          className={`sortElement ${
            useLocation().pathname === '/komtek' ? 'sortElementSelected' : ''
          }`}
        >
          Komtek
        </Link>
      </ul>
    </div>
  );
};
export default Nav;
