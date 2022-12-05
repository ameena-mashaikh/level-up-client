export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        method: "GET",    
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}


export const createEvent = (newEventObject) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(newEventObject)
    })
        .then(res => res.json())
}


export const getGamers = () => {
    return fetch("http://localhost:8000/gamers", {
        method: "GET",    
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: "PUT",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(event)
         })
}

export const getEventById = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "GET",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
     })
        .then(response => response.json())
    }

export const deleteEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: "DELETE",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            })
}

export const leaveEvent = eventId => {
    // TODO: Write the DELETE fetch request to leave an event
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        method: "DELETE",
        headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
  }
  
  export const joinEvent = eventId => {
      // TODO: Write the POST fetch request to join and event
      return fetch(`http://localhost:8000/events/${eventId}/signup`, {
        method: "POST",
        headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(eventId)
    })
        .then(res => res.json())
}
