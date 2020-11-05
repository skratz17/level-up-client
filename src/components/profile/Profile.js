import React, { useContext, useEffect } from 'react';
import { ProfileContext } from './ProfileProvider';

export const Profile = () => {
  const { profile, getProfile } = useContext(ProfileContext);

  const { gamer, events } = profile;

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <article>
      <h1>Your Profile</h1>
      <section className="profile__info">
        <h2>Your Info</h2>
        <p className="profile__name">Welcome: {gamer?.user?.first_name} {gamer?.user?.last_name}</p>
        <p className="profile__username">Username: {gamer?.user?.username}</p>
        <p className="profile__bio">About you: {gamer?.bio}</p>
      </section>

      <section className="profile__registrations">
        <h2>Your Events</h2>
        <div className="registrations">
          {
            events && events.map(e => (
              <div key={e.id}>
                <p className="registration__game">{e.game.title}</p>
                <p className="registration__location">{e.location}</p>
                <p className="registration__time">{e.date} @ {e.time}</p>
              </div>
            ))
          }
        </div>
      </section>
    </article>
  )
};