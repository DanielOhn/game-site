import * as React from "react"
import Pong from "../games/pong/pong"

interface Props {
  name: string
  desc: string
}

function Game(props: Props): JSX.Element {
  return (
    <div className="game">
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
      <Pong />
    </div>
  )
}

export default Game
