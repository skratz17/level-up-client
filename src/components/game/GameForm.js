import React, { useContext, useEffect, useState } from 'react';

import { GameContext } from './GameProvider';

export const GameForm = () => {
  const [ formValues, setFormValues ] = useState({});

  const { gameTypes, getGameTypes } = useContext(GameContext);

  useEffect(() => {
    getGameTypes();
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

    console.log(formValues);
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