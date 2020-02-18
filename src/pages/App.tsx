import * as React from "react"
import "../styles/App.css"

import Hello from "./Hello"

import Game from "../components/Game"

function App() {
  return (
    <div className="App">
      <Hello name="world" />
      <Game name="Pong" desc="A simple, classic game of Pong." />
    </div>
  )
}

export default App
