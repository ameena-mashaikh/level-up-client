import { useEffect, useState, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getEventById, getGamers, deleteEvent } from "../../managers/EventManager"

export const EventDetails = () => {
    const [event, setEvent] = useState({  game: {},gamer: {}})
    const {eventId} = useParams() 
    const navigate = useNavigate()


    useEffect(() => {
        getEventById(eventId)
        .then(setEvent)
    }, [eventId])



    return (
        <section className="event">
          <h3 className="event__game">{event.gamer?.user?.first_name}'s {event.game?.title} Game Night</h3>
          <div className="event__description">About: {event.description}</div>
          <div className="event__date">Date: {event.date}</div>
          <div className="event__time">Time: {event.time}</div>
          <div className="event__gamer">Organizer: {event.gamer?.user?.first_name}</div>
    
          {/* <button onClick={() => releaseAnimal(animal.id).then(() => navigate("/animals"))} >Release Animal</button> */}
          <button onClick={() => {
            navigate(`/events/edit/${event.id}`)
          }}>Edit</button>


          <button onClick={() => {
            
            const eventDel = {
                id: event.id
            }
            deleteEvent(eventDel)
            .then(() => navigate("/events"))
          }}>Delete</button>
        </section>
      )
    
}