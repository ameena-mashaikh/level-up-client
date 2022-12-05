export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        method: "GET",    
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (newGameObject) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(newGameObject)
    })
        .then(res => res.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
    method: "GET",    
    headers:{
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
     })
        .then(response => response.json())
}

export const updateGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
        method: "PUT",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(game)
         })
}

export const getGameById = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: "GET",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
     })
        .then(response => response.json())
  }

export const deleteGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
        method: "DELETE",    
        headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            })
    }