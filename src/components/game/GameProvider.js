import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = props => {
  const [ games, setGames ] = useState([]);
  const [ gameTypes, setGameTypes ] = useState([]);

  const getGames = () => {
    return fetch('http://localhost:8000/games', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    })
      .then(res => res.json())
      .then(setGames);
  };

  const getGameTypes = () => {
    return fetch('http://localhost:8000/gametypes', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`
      }
    })
      .then(res => res.json())
      .then(setGameTypes);
  };

  const createGame = game => {
    return fetch('http://localhost:8000/games', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${localStorage.getItem('lu_token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(game)
    })
      .then(getGames);
  };

  return (
    <GameContext.Provider value={{ games, gameTypes, getGames, createGame, getGameTypes }}>
      { props.children }
    </GameContext.Provider>
  );
};