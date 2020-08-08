import React from 'react';
import './App.css';
import Emoji from './Emoji';

const Footer = () => (
  <div className="Footer">
    <p>
      laget med <Emoji symbol="🍺" label="øl" /> av{' '}
      <a
        target="blank"
        rel="noreferrer noopener"
        href="https://abakus.no/pages/komiteer/11"
      >
        <b>webkom</b>
      </a>
    </p>
  </div>
);

export default Footer;
