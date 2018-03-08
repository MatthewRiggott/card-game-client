import React from 'react';

const GameSession = (props) => {
  return (
    <div className="GameSession">
      <span><label htmlFor="gameName">Name:</label>{props.match.params.id}</span>
    </div>
  );
}

export default GameSession;