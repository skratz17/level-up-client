import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GameContext } from '../game/GameProvider';
import { EventContext } from './EventProvider';

export const EventForm = () => {
  const [ formValues, setFormValues ] = useState({});

  const { games, getGames } = useContext(GameContext);
  const { createEvent } = useContext(EventContext);

  const history = useHistory();

  useEffect(() => {
    getGames();
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

    createEvent(formValues)
      .then(() => history.push('/events'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Game</label>
        <select name="gameId" value={formValues.gameId || 0} onChange={handleChange}>
          <option value="0" disabled>Select a game</option>
          {
            games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)
          }
        </select>

        <fieldset>
          <label>Date</label>
          <input type="date" name="date" value={formValues.date || ''} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <label>Time</label>
          <input type="time" name="time" value={formValues.time || ''} onChange={handleChange} />
        </fieldset>

        <fieldset>
          <label>Location</label>
          <input type="text" name="location" value={formValues.location || ''} onChange={handleChange} />
        </fieldset>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};