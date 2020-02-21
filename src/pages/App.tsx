import * as React from "react"
import "../styles/App.css"

import Landing from "./Landing"

import Game from "../components/Game"

function App() {
  return (
    <div className="App">
      <Landing />
      <Game name="Pong" desc="A simple, classic game of Pong." />
    </div>
  )
}

export default App
