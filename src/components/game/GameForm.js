import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { GameContext } from './GameProvider';

export const GameForm = () => {
  const [ formValues, setFormValues ] = useState({});

  const { gameTypes, getGameById, getGameTypes, createGame, updateGame } = useContext(GameContext);

  const history = useHistory();
  const location = useLocation();
  const { gameId } = useParams();

  const isEditMode = location.pathname.includes('edit');

  useEffect(() => {
    getGameTypes()
    if(isEditMode) {
      getGameById(gameId)
        .then(game => {
          setFormValues({
            name: game.name,
            numPlayers: game.num_players,
            skillLevel: game.skill_level,
            gameTypeId: game.game_type.id
          })
        })
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if(isEditMode) {
      updateGame(gameId, { ...formValues, id: gameId })
        .then(() => history.push('/'))
    }

    else {
      createGame(formValues)
        .then(() => history.push('/'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Name</label>
        <input type="text" name="name" value={formValues.name || ''} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <label>Number of Players</label>
        <input type="number" name="numPlayers" value={formValues.numPlayers || 0} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <label>Skill Level</label>
        <input type="number" name="skillLevel" value={formValues.skillLevel || 0} onChange={handleChange} />
      </fieldset>

      <fieldset>
        <label>Type of Game</label>
        <select name="gameTypeId" value={formValues.gameTypeId || 0} onChange={handleChange}>
          <option value="0" disabled>Select a game type...</option>
          {
            gameTypes.map(gT => (
              <option key={gT.id} value={gT.id}>{gT.name}</option>
            ))
          }
        </select>
      </fieldset>

      <button type="submit">Create Game</button>
    </form>
  );
};