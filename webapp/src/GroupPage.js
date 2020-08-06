import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function GroupPage(props) {
  const { group } = props;
  return (
    <div className="GroupPage">
      {group ? (
        <div>
          <h2 className="groupName">{group.name}</h2>
          <h3>Linje: {group.major === 'K' ? 'komtek' : 'data'}</h3>
          <img
            className="groupImage"
            src={
              group.image
                ? group.image
                : `${process.env.PUBLIC_URL}/images/abakule.png`
            }
            alt="gruppebilde"
          ></img>
          {group.scoreByChallenge.map((c) => {
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
