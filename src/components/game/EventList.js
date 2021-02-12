import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider.js"

export const EventList = (props) => {
    const { events, getEvents } = useContext(EventContext)
    const history = useHistory()

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/events/new" })
                    }}
                >Schedule New Event</button>
                <hr />
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">

                        <div className="registration__game">Game: {event.game.title}</div>
                        <div>Location: {event.location}</div>
                        <div>

                            <strong>Date: </strong>  {
                                new Date(event.event_time).toLocaleDateString("en-US",
                                    {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                            }

                        </div>
                        <hr />
                    </section>

                })
            }
        </article >
    )
}