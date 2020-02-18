import React from "react"

interface Props {
  name: string
  desc: string
}

function Game(props: Props): JSX.Element {
  return (
    <div className="game">
      <h2>{props.name}</h2>
      <p>{props.desc}</p>
      <canvas id="mycanvas"></canvas>
    </div>
  )
}

export default Game
