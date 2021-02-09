import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"

export const GameList = (props) => {
    const { games, getGames } = useContext(GameContext)

    useEffect(() => {
        getGames()
    }, [])

    return (
        <article className="games">
            <h1>Games</h1>
            <hr />
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        
                        <div className="game__title">Title: {game.title}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__type">Game type: {game.game_type.label}</div>
                        <hr />
                    </section>
                })
            }
        </article>
    )
}