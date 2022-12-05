import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createEvent, getGamers} from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"


export const EventForm = () => {
    const navigate = useNavigate()
    const [games, setGame] = useState([])
    const [gamers, setGamer] = useState([])


    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        gameId: 0,
        description: "",
        date: "",
        time: "",
        gamerId: 0
    })

    useEffect(() => {
        getGamers().then(setGamer)
    }, [])

    useEffect(() => {
        getGames().then(setGame)
    }, [])


    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        // domEvent.preventDefault()
        // const newGame = Object.assign({}, currentGame)
        // newGame[domEvent.target.title] = domEvent.target.value
        // setCurrentGame(newGame)
        const copy = { ...currentEvent }
        copy[domEvent.target.id] = domEvent.target.value
        setCurrentEvent(copy)
        }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="gameId">Game: </label>
                <select 
                    onChange={changeEventState}
                    id="gameId" className="form-control" 
                    >

                    <option value="0">Select a Game</option>
                    {
                    games.map((game) => {
                        return <option value={`${game.id}`} key={`game--${game.id}`}>{game.title}</option>
                    })
                    }
                </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input 
                    onChange={changeEventState}
                        type="text" id = 'description' required autoFocus className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of Event: </label>
                    <input 
                        onChange={changeEventState}
                        type="date" name="date" required autoFocus className="form-control"
                        id = 'date'
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Start Time: </label>
                    <input 
                        onChange={changeEventState}
                        type="time" name="time" required autoFocus className="form-control"
                        id = 'time'
                    />
                </div>
            </fieldset>
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        game: parseInt(currentEvent.gameId),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        gamer: parseInt(localStorage.getItem("level_user"))
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}