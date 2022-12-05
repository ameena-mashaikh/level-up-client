import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createEvent, getGamers, updateEvent, getEventById} from '../../managers/EventManager.js'
import { getGames } from "../../managers/GameManager.js"


export const EventEdit = () => {
    const navigate = useNavigate()
    const [games, setGame] = useState([])
    const [gamers, setGamer] = useState([])
    const [chosenGame, setChosenGame] = useState(0)
    const {eventId} = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        id:0,
        game: 0,
        description: "",
        date: "",
        time: ""
    })

    useEffect(() => {
        getGamers().then(setGamer)
    }, [])

    useEffect(() => {
        getGames().then(setGame)
    }, [])

    useEffect(() => {
        setChosenGame(currentEvent.game.id)
        }, [currentEvent])

    useEffect(() => {
        getEventById(eventId)
        .then(setCurrentEvent)
        }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        // domEvent.preventDefault()
        // const newGame = Object.assign({}, currentGame)
        // newGame[domEvent.target.title] = domEvent.target.value
        // setCurrentGame(newGame)
        const copy = { ...currentEvent }
        const modify = domEvent.target.id
        copy[modify] = domEvent.target.value
        setCurrentEvent(copy)
        }

    return (
        <form className="eventFormUpdate">
            <h2 className="eventForm__title">Update Event</h2>
            <fieldset>
                <div className="form-group">
                <label htmlFor="gameId">Game: </label>
                <select 
                    id="game" className="form-control" value = {chosenGame} onChange= {evt => setChosenGame(evt.target.value)}
                    >
                    {
                    games.map((game) => {
                        return <option selected value={`${game.id}`} key={`game--${game.id}`}>{game.title}</option>
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
                        type="text" id = 'description'  value = {currentEvent.description} required autoFocus className="form-control"
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date of Event: </label>
                    <input 
                        onChange={changeEventState}
                        type="date" value = {currentEvent.date} required autoFocus className="form-control"
                        id = 'date'
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Start Time: </label>
                    <input 
                        onChange={changeEventState}
                        type="time" value={currentEvent.time} required autoFocus className="form-control"
                        id = 'time'
                    />
                </div>
            </fieldset>
            

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        id: currentEvent.id,
                        game: parseInt(currentEvent.game.id),
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    updateEvent(event)
                        .then(() => navigate("/events"))
                }}
                className="btn btn-primary">Update Event</button>
        </form>
    )
} 