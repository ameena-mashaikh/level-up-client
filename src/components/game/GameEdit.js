import { useState, useEffect } from "react"
import { useNavigate, useParams} from 'react-router-dom'
import { createGame, getGameTypes, getGames, getGameById, updateGame } from '../../managers/GameManager.js'


export const GameEdit = () => {
    const navigate = useNavigate()
    const {gameId} = useParams()
    const [gameTypes, setGameTypes] = useState([])
    const [chosenGameType, setChosenGameType] = useState(0)
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        id:0,
        game_type: 0,
        title: "",
        maker: "",
        number_of_players: 1,
        skill_level: 1
    })
    


    useEffect(() => {
        getGameTypes().then(setGameTypes)
      }, [])



    useEffect(() => {
        getGameById(gameId)
        .then(setCurrentGame)
        }, [])

    useEffect(() => {
        setChosenGameType(currentGame.game_type.id)
        }, [currentGame])


    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        // const newGame = Object.assign({}, currentGame)
        // newGame[domEvent.target.title] = domEvent.target.value
        // setCurrentGame(newGame)
        const copy = { ...currentGame }
        const modify = domEvent.target.id
        copy[modify] = domEvent.target.value
        setCurrentGame(copy)
        }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Edit: {currentGame?.title}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input 
                        onChange={changeGameState}
                        type="text" id = 'title' required autoFocus className="form-control"
                        value = {currentGame.title}
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
                        value = {currentGame.maker}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                <label htmlFor="gameTypeId">Game Type: </label>
                <select id="game_type"
                    
                     className="form-control" value = {chosenGameType} onChange= {event => setChosenGameType(event.target.value)}
                    >
                    {
                    gameTypes.map((type) => {
                        return <option selected value={`${type.id}`} key={`type--${type.id}`}>{type.label}</option>
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
                        type="number" min = "1" max = "10" required autoFocus className="form-control"
                        id = 'skill_level' value = {currentGame.skill_level}
                    />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of players: </label>
                    <input 
                    
                    onChange={changeGameState}
                        type="number" min = "1" max = "10" required autoFocus className="form-control"
                        id = 'number_of_players' value = {currentGame.number_of_players}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        game_type: parseInt(chosenGameType),
                        title: currentGame.title,
                        maker: currentGame.maker,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level)
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Save</button>
        </form>
    )
}