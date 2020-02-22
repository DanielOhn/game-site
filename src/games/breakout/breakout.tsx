import * as React from "react"
import * as PIXI from "pixi.js"

import bar from "./images/bar.png"
import ballImg from "./images/ball.png"
import Game from "../../components/Game"

interface MovingObject extends PIXI.Sprite {
  vx?: number
  vy?: number
  lives?: number
  score?: number
}

function Breakout(): JSX.Element {
  let pixi_client = null

  PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(
    PIXI.settings.SPRITE_MAX_TEXTURES,
    16
  )

  const loader = PIXI.Loader.shared
  const sprite = PIXI.Sprite

  let player: MovingObject
  let balls: MovingObject[] = []

  // let bricks = []
  // let walls = []

  // let row,
  //   col = 5

  let left = keyboard("a")
  let right = keyboard("d")
  let space = keyboard(" ")

  const app = new PIXI.Application({
    width: 800,
    height: 600,
    transparent: false,
  })

  function setup(): void {
    loader.reset()

    loader
      .add("bar", bar)
      .add("ball", ballImg)
      .load(init)
  }

  function init(): void {
    let bar_texture = loader.resources.bar.texture
    let ball_texture = loader.resources.ball.texture

    let stage = new PIXI.Container()
    app.stage.addChild(stage)

    stage.x = app.screen.width / 2
    stage.y = app.screen.height / 2

    initPlayer(stage, bar_texture)
    initBall(stage, ball_texture)

    left.press = () => {
      player.vx = -1
    }

    left.release = () => {
      player.vx = 0
    }

    right.press = () => {
      player.vx = 1
    }

    right.release = () => {
      player.vx = 0
    }

    app.ticker.add(delta => game(delta))
  }

  function initPlayer(stage: PIXI.Container, texture: PIXI.Texture): void {
    player = new sprite(texture)
    stage.addChild(player)

    player.y = 250
    player.rotation = Math.PI / 2
    player.anchor.set(0.5)

    player.vx = 0
  }

  function initBall(stage: PIXI.Container, texture: PIXI.Texture): void {
    let ball: MovingObject
    ball = new sprite(texture)

    ball.y = 225
    ball.x = -8

    ball.vy = 0
    ball.vx = 0

    balls.push(ball)

    stage.addChild(ball)
  }

  function game(delta: number): void {
    let speed = delta * 5

    if (player.vx) player.x += speed * player.vx
  }

  function keyboard(value: string) {
    let key = {
      value: value,
      isDown: false,
      isUp: true,
      press: () => {},
      release: () => {},

      downHandler: (event: any) => {
        if (event.key === key.value) {
          if (key.isUp && key.press) key.press()
          key.isDown = true
          key.isUp = false
          event.preventDefault()
        }
      },

      upHandler: (event: any) => {
        if (event.key === key.value) {
          if (key.isDown && key.release) key.release()
          key.isDown = false
          key.isUp = true
          event.preventDefault()
        }
      },

      unsubscribe: () => {
        window.removeEventListener("keydown", downListener)
        window.removeEventListener("keyup", upListener)
      },
    }
    // Attach Event listeners
    const downListener = key.downHandler.bind(key)
    const upListener = key.upHandler.bind(key)

    window.addEventListener("keydown", downListener, false)
    window.addEventListener("keyup", upListener, false)

    return key
  }

  function updatePixiClient(elm: any): void {
    pixi_client = elm

    if (pixi_client && pixi_client.children.length <= 0) {
      pixi_client.appendChild(app.view)
    }

    setup()
  }

  return <div ref={updatePixiClient} />
}

export default Breakout
