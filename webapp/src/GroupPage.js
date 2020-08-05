import React from 'react';
import './App.css';

const GroupPage = ({ group }) => {
  console.log(group);
  return (
    <div className="GroupPage">
      {group ? (
        <div>
          <h2>{group.name}</h2>
          <img className="groupImage" src={group.image} alt="Group"></img>
          {group.scoreByChallenge.map((c, i) => {
            return (
              <div key={c.name}>
                <p>
                  {c.name}: {c.score}
                </p>
              </div>
            );
          })}
          <h3>Total Score: {group.scoreSum}</h3>
        </div>
      ) : (
        <div>Laster...</div>
      )}
    </div>
  );
};

export default GroupPage;
