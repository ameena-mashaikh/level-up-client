import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/game/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/game/EventForm"
import { GameDetails } from "../components/game/GameDetail"
import { GameEdit } from "../components/game/GameEdit"
import { EventDetails } from "../components/game/EventDetail"
import { EventEdit } from "../components/game/EventEdit"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/games" element={<GameList />} />
                <Route path="/games/:gameId" element={<GameDetails />} />
                <Route path="/games/new" element={<GameForm />} />
				<Route path="/games/edit/:gameId" element={<GameEdit/>} />
                <Route path="/events" element={<EventList />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/events/:eventId" element={<EventDetails />} />
				<Route path="/events/edit/:eventId" element={<EventEdit />} />
                


            </Route>
        </Routes>
    </>
}