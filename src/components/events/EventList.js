import React, { useContext, useEffect } from "react"
import { Link } from 'react-router-dom';
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
    const { events, getEvents, joinEvent, leaveEvent } = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
            </header>
            <Link to="/events/new">Create an Event</Link>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.name}</div>
                        <div>{event.location}</div>
                        <div>
                            {
                                new Date(event.date).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                              }
                                @ {event.time}
                        </div>
                        {
                          event.joined ?
                            <button onClick={() => leaveEvent(event.id)}>Leave Event</button> :
                            <button onClick={() => joinEvent(event.id)}>Join Event</button>
                        }
                    </section>
                })
            }
        </article >
    )
}