import * as React from "react"
import * as PIXI from "pixi.js"

import { SpriteVector, GraphicsVector } from "./Interfaces"

export const loader = PIXI.Loader.shared.resources

// IDEA - Maybe run only one app for all games.
// Loads new stuff when switching links
// export const app = new PIXI.Application({
//   width: 800,
//   height: 600,
//   transparent: false
// })

export const style = new PIXI.TextStyle({
  fontFamily: "Roboto",
  fill: ["#ffff"],
  fontSize: 24,
})

let initGameObject = (obj: SpriteVector | GraphicsVector) => {
  let sprite = (obj: SpriteVector) => {}

  let graphics = (obj: GraphicsVector) => {}
}
