import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getGameById, updateGame, deleteGame } from "../../managers/GameManager"

export const GameDetails = () => {
    const [game, setGame] = useState({ gameType: {}})
    const {gameId} = useParams() 
    const navigate = useNavigate()

    // const fetchGame = useCallback(() => {
    //     return fetch(`http://localhost:8000/games/${gameId}`)
    // })

    useEffect(() => {
        getGameById(gameId)
        .then(setGame)
    }, [gameId])



    return (
        <section className="game">
          <h3 className="game__title">{game.title}</h3>
          <div className="game__type">Game Type: {game.game_type?.label}</div>
          <div className="game__maker">Maker: {game.maker}</div>
          <div className="game__players">Number of Players: {game.number_of_players}</div>
          <div className="game__skillLevel">Skill Level: {game.skill_level}</div>
    
          {/* <button onClick={() => releaseAnimal(animal.id).then(() => navigate("/animals"))} >Release Animal</button> */}
    
          <button onClick={() => {
            navigate(`/games/edit/${game.id}`)
          }}>Edit</button>

          <button onClick={() => {
            
            const gameDel = {
                id: game.id
            }
            deleteGame(gameDel)
            .then(() => navigate("/games"))
          }}>Delete</button>
        </section>
      )
    
}