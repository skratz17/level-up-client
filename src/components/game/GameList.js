import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GameContext } from './GameProvider';

export const GameList = props => {
  const { games, getGames } = useContext(GameContext);

  useEffect(() => {
    getGames();
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>
      <Link to="/games/new">Create Game</Link>
      {
        games.map(game => (
          <section key={game.id} className="game">
            <div className="game__name">
              <Link to={`/games/${game.id}/edit`}>{game.name}</Link>
            </div>
            <div className="game__type">Type: {game.game_type.name}</div>
            <div className="game__players">{game.num_players} players allowed</div>
            <div className="game__skillLevel">Skill level is {game.skill_level}</div>
            <div className="game__creator">Created by {game.creator.user.first_name} {game.creator.user.last_name}</div>
          </section>
        ))
      }
    </article>
  )
};