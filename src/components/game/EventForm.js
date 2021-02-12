import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EventContext } from "./EventProvider"
import { GameContext } from "./GameProvider"


export const EventForm = () => {
    const history = useHistory()
    const {getGames, games} = useContext(GameContext)
    const {events, getEvents, createEvent} = useContext(EventContext)

    const [currentEvent, setEvent] = useState({})

    useEffect(() => {
        // Get all existing games from API
        getGames()
    }, [])

    const changeEventState = (domEvent) => {
        // ...
        const newEventState = Object.assign({}, currentEvent)
        newEventState[domEvent.target.name] = domEvent.target.value
        setEvent(newEventState)
        
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game">Game: </label>
                    <select name="game" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option key = {game.id} value= {game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                    <label htmlFor = "event_time">Time:</label>
                    <br></br>
                    <input type = "datetime-local" name = "event_time" onChange= {changeEventState}></input>
                    <br></br>
                    <label htmlFor = "text">Location:</label>
                    <br></br>
                    <input type = "text" name = "location" required autoFocus className = "form-control" onChange = {changeEventState}></input>
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    const event = {
                        event_time : currentEvent.event_time,
                        game : currentEvent.game,
                        location : currentEvent.location
                    }


                    // Once event is created, redirect user to event list
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}