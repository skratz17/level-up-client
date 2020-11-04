import React from 'react';
import { Route } from 'react-router-dom';
import { GameProvider } from './game/GameProvider';
import { GameList } from './game/GameList';
import { GameForm } from './game/GameForm';
import { EventProvider } from './events/EventProvider';
import { EventList } from './events/EventList';

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
          <GameProvider>
            <Route exact path="/" component={GameList} />
            <Route exact path="/games" component={GameList} />

            <Route path="/games/new">
              <GameForm />
            </Route>
          </GameProvider>

          <EventProvider>
            <Route exact path="/events">
                <EventList />
            </Route>
          </EventProvider>
        </main>
    </>
}
