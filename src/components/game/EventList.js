import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { Navigate, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { joinEvent, leaveEvent } from "../../managers/EventManager.js"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const navigate = useNavigate()
    return (
        <><button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
            navigate({ pathname: "/events/new" })
        }}>Create New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__game"><Link to={`/events/${event.id}`}>{event.gamer.user.first_name}'s {event?.game?.title} Game Night!</Link></div>
                        <div className="event__description">About: {event.description}</div>
                        <div className="event__date">Date: {event.date}</div>
                        <div className="event__time">Time: {event.time}</div>
                        <div className = "event__organizer">Organizer: {event.gamer.user.first_name}</div>
                            {
                                event.joined ?
                                // TODO: create the Leave button
                                <button className="btn btn-2 btn-sep icon-create"
                                    onClick={(evt) => {
                                        evt.preventDefault()
                                        leaveEvent(event.id)
                                        .then(() => navigate("/games"))
                                        
                                    }
                                    }>
                                        Leave Event
                                </button>
                                :
                                // TODO: create the Join button
                                <button className="btn btn-2 btn-sep icon-create"
                                onClick={(evt) => {
                                    evt.preventDefault()
                                    joinEvent(event.id)
                                    .then(() => navigate("/games"))
                                    
                                }
                                }>
                                    Join Event
                                </button>
                                }

                    </section>
                })
            }
        </article>
    </>)
}