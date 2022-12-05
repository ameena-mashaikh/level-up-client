import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes, getGames } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        gameTypeId: 0,
        title: "",
        maker: "",
        numberOfPlayers: 1,
        skillLevel: 1
    })

    useEffect(() => {
        getGameTypes().then(setGameTypes)
      }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        // domEvent.preventDefault()
        // const newGame = Object.assign({}, currentGame)
        // newGame[domEvent.target.title] = domEvent.target.value
        // setCurrentGame(newGame)
        const copy = { ...currentGame }
        copy[domEvent.target.id] = domEvent.target.value
        setCurrentGame(copy)
        }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input 
                        // onChange={
                        //     (evt) => {
                        //         const copy = {...currentGame}
                        //         copy.title = evt.target.value
                        //         setCurrentGame(copy)
                        //     }
                        // }
                        onChange={changeGameState}
                        type="text" id = 'title' required autoFocus className="form-control"
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input 
                    //  onChange={
                    //     (evt) => {
                    //         const copy = {...currentGame}
                    //         copy.maker = evt.target.value
                    //         setCurrentGame(copy)
                    //     }
                    // }
                    onChange={changeGameState}
                        type="text" id = 'maker' required autoFocus className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label htmlFor="gameTypeId">Game Type: </label>
                <select 
                    onChange={changeGameState}
                    id="gameTypeId" className="form-control" 
                    >

                    <option value="0">Select a Game Type</option>
                    {
                    gameTypes.map((type) => {
                        return <option value={`${type.id}`} key={`type--${type.id}`}>{type.label}</option>
                    })
                    }
                </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input 
                    // onChange={
                    //     (evt) => {
                    //         const copy = {...currentGame}
                    //         copy.skillLevel = evt.target.value
                    //         setCurrentGame(copy)
                    //     }
                    // }
                        onChange={changeGameState}
                        type="number" name="skill_level" min = "1" max = "10" required autoFocus className="form-control"
                        id = 'skillLevel'
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of players: </label>
                    <input 
                    
                    onChange={changeGameState}
                        type="number" name="number_of_players" min = "1" max = "10" required autoFocus className="form-control"
                       id='numberOfPlayers'
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        game_type: parseInt(currentGame.gameTypeId),
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}