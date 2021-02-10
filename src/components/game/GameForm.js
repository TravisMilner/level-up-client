import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'


export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        
        number_of_players: "",
        title: "",
        gamer: "",
        game_type: 1
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    /*
        Update the `currentGame` state variable every time
        the state of one of the input fields changes.
    */
    const changeGameState = (domEvent) => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[domEvent.target.name] = domEvent.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="gameCategoryDrop">Category:</label>
                    <br></br>
                    <select className = "gameCategoryDrop" onChange = {changeGameState} name= "game_type" >
                    <option>Game Category Selection...</option>
                        {
                            gameTypes.map(type => <option key = {type.id} value= {type.id}>{type.label}</option>)
                        }
                    </select>
                    <br></br>
                    <label>Number of Players:</label>
                    <br></br>
                    <input type="text" name = "number_of_players" required autoFocus className="form-control" value = {currentGame.number_of_players} onChange= {changeGameState}>
                        
                    </input>
                </div>
            </fieldset>

            {/* You create the rest of the input fields for each game property */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        gamer: currentGame.gamer,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}