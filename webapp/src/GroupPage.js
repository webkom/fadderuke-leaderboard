import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function GroupPage(props) {
  const { group } = props;
  return (
    <div className="GroupPage">
      {group ? (
        <div>
          <h2>{group.name}</h2>
          <h3>Linje: {group.major === 'K' ? 'komtek' : 'data'}</h3>
          <img
            className="groupImage"
            src={group.image ? group.image : 'https://i.imgur.com/NquUygt.jpg'}
            alt="gruppebilde"
          ></img>
          {group.scoreByChallenge.map((c, i) => {
            return (
              <div key={c.name}>
                <p>
                  {c.name}: {c.score}
                </p>
              </div>
            );
          })}
          <h3>Poeng totalt: {group.scoreSum}</h3>
        </div>
      ) : (
        <div>Laster...</div>
      )}
    </div>
  );
}

GroupPage.propTypes = {
  group: PropTypes.object,
};

export default GroupPage;
