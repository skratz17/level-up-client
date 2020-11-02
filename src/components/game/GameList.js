import React, { useContext, useEffect } from 'react';
import { GameContext } from './GameProvider';

export const GameList = props => {
  const { games, getGames } = useContext(GameContext);

  useEffect(() => {
    getGames();
  }, []);

  return (
    <article className="games">
      {
        games.map(game => (
          <section key={game.id} className="game">
            <div className="game__name">{game.name}</div>
            <div className="game__type">Type: {game.game_type.name}</div>
            <div className="game__players">{game.num_players} players allowed</div>
            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
          </section>
        ))
      }
    </article>
  )
};