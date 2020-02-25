import * as React from "react"
import * as PIXI from "pixi.js"

import bar from "./images/side_bar.png"
import ballImg from "./images/ball.png"
// import Game from "../../components/Game" (Futuer, Make Library for all 2D Math Code, collision, keyboard, reusable stuff)

interface MovingObject extends PIXI.Sprite {
  vx?: number
  vy?: number
  hp?: number
  lives?: number
  score?: number
  dock?: boolean
  halfWidth?: number
  halfHeight?: number
  bounce?: number
}

function Breakout(): JSX.Element {
  let pixi_client = null

  PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(
    PIXI.settings.SPRITE_MAX_TEXTURES,
    16
  )

  const loader = PIXI.Loader.shared
  const sprite = PIXI.Sprite

  let stage: PIXI.Container

  let player: MovingObject
  let ball: MovingObject

  let bricks: MovingObject[] = []
  let walls: PIXI.Graphics[] = []

  let row = 5
  let col = 5

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

    stage = new PIXI.Container()
    app.stage.addChild(stage)

    stage.x = app.screen.width / 2
    stage.y = app.screen.height / 2

    initPlayer(stage, bar_texture)
    initBall(stage, ball_texture)
    initWalls(stage)
    initBricks(stage, bar_texture)

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

    space.press = () => {
      if (ball.dock === true) ball.dock = false
    }

    app.ticker.add(delta => game(delta))
  }

  function initPlayer(stage: PIXI.Container, texture: PIXI.Texture): void {
    player = new sprite(texture)
    stage.addChild(player)

    player.y = 250
    player.anchor.set(0.5)

    player.vx = 0
  }

  function initBall(stage: PIXI.Container, texture: PIXI.Texture): void {
    ball = new sprite(texture)

    ball.y = 225
    ball.x = -6

    ball.vy = 0
    ball.vx = 0

    ball.anchor.set(0.5)

    ball.dock = true

    // balls.push(ball)

    stage.addChild(ball)
  }

  function initWalls(stage: PIXI.Container): void {
    let leftWall = new PIXI.Graphics()
    let rightWall = new PIXI.Graphics()
    let midWall = new PIXI.Graphics()

    leftWall.beginFill(0x909090)
    leftWall.drawRect(0, 0, 50, 600)
    leftWall.endFill()
    leftWall.position.set(-400, -300)

    rightWall.beginFill(0x909090)
    rightWall.drawRect(0, 0, 50, 600)
    rightWall.endFill()
    rightWall.position.set(350, -300)

    midWall.beginFill(0x909090)
    midWall.drawRect(0, 0, 700, 50)
    midWall.endFill()
    midWall.position.set(-350, -300)

    stage.addChild(leftWall)
    stage.addChild(rightWall)
    stage.addChild(midWall)

    walls.push(leftWall)
    walls.push(rightWall)
    walls.push(midWall)
  }

  function initBricks(stage: PIXI.Container, texture: PIXI.Texture): void {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let brick: MovingObject
        brick = new sprite(texture)

        stage.addChild(brick)

        brick.x = (-row / 2) * 64 + 32 + 66 * i
        brick.y = (col / 2) * 16 + -18 * j
        brick.anchor.set(0.5)

        brick.hp = 3
        brick.tint = 0x355890
        bricks.push(brick)
      }
    }
  }

  function game(delta: number): void {
    let speed = delta * 8
    let ball_speed = delta * 4

    collision()

    if (ball.dock === true) {
      ball.x = player.x
      ball.y = player.y - 16
      if (player.vx) ball.x += player.vx * speed
    } else if (ball.dock === false) {
      send_ball()
    }

    if (ball.vx) ball.x += ball_speed * ball.vx
    if (ball.vy) ball.y += ball_speed * ball.vy
    if (player.vx) player.x += speed * player.vx
    if (player.bounce) player.x += speed * player.bounce
  }

  function send_ball(): void {
    ball.vx = player.vx
    ball.vy = -1
    ball.dock = undefined
  }

  function collision(): void {
    let playerX = player.x - player.width / 2
    let playerY = player.y - player.height / 2

    let ballX = ball.x - ball.width / 2
    let ballY = ball.y - ball.height / 2

    let playerHit = undefined
    player.bounce = 0

    for (let wall of walls) {
      if (
        playerX < wall.x + wall.width &&
        playerX + player.width > wall.x &&
        playerY < wall.y + wall.height &&
        playerY + player.height > wall.y
      ) {
        if (player.vx && player.vx < 0) {
          playerHit = "left"
        }

        if (player.vx && player.vx > 0) {
          playerHit = "right"
        }
      }

      if (
        ballX < wall.x + wall.width &&
        ballX + ball.width > wall.x &&
        ballY < wall.y + wall.height &&
        ballY + ball.height > wall.y
      ) {
        if (ball.vx) ball.vx = -ball.vx
      }
    }

    if (playerHit === "left") {
      player.vx = 0
      player.bounce = 1
    }

    if (playerHit === "right") {
      player.vx = 0
      player.bounce = -1
    }
  }

  function checkCollision(a: PIXI.Sprite, b: PIXI.Sprite) {
    let aX = a.x - a.width / 2
    let aY = a.y - a.height / 2

    let bX = b.x - b.width / 2
    let bY = b.y - b.height / 2

    return (
      aX < bX + b.width &&
      aX + a.width > bX &&
      aY < bY + b.height &&
      aY + a.height > bY
    )
  }

  function keyboard(value: string): any {
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
