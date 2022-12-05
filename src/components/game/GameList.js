import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { Navigate, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate({ pathname: "/games/new" })
            }}
            >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title"> <Link to={`/games/${game.id}`}>
                            {game.title}
                        </Link> by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                    </section>
                })
            }
        </article></>
    )
}