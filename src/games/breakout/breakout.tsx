import * as React from "react"
import * as PIXI from "pixi.js"

import bar from "./images/side_bar.png"
import ballImg from "./images/ball.png"
// import Game from "../../components/Game" (Futuer, Make Library for all 2D Math Code, collision, keyboard, reusable stuff)

interface Vector {
  x: number
  y: number
}

interface SpriteVector extends PIXI.Sprite {
  vx?: number
  vy?: number
  hp?: number
  lives?: number
  score?: number
  dock?: boolean
  bounce?: number

  topLeft?: Vector
  topRight?: Vector
  botLeft?: Vector
  botRight?: Vector
  center?: Vector
}

interface GraphicsVector extends PIXI.Graphics {
  topLeft?: Vector
  topRight?: Vector
  botLeft?: Vector
  botRight?: Vector
  center?: Vector
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

  let player: SpriteVector
  let ball: SpriteVector

  let test_text: PIXI.Text
  let text: string = "TExt Goes here"

  let bricks: SpriteVector[] = []
  let walls: GraphicsVector[] = []
  let left_wall: GraphicsVector

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

    const style = new PIXI.TextStyle({
      fontFamily: "Roboto",
      fill: ["#ffffff"],
      fontSize: 24,
    })

    test_text = new PIXI.Text(text, style)
    stage.addChild(test_text)

    test_text.x = -300
    test_text.y = 100

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

    setVectorPoints(player)
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
    let leftWall: GraphicsVector
    let rightWall: GraphicsVector
    let midWall: GraphicsVector

    leftWall = new PIXI.Graphics()
    rightWall = new PIXI.Graphics()
    midWall = new PIXI.Graphics()

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

    setGraphicPoints(leftWall)
    setGraphicPoints(rightWall)
    setGraphicPoints(midWall)

    left_wall = leftWall
  }

  function initBricks(stage: PIXI.Container, texture: PIXI.Texture): void {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        let brick: SpriteVector
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
    let speed = delta * 5
    let ball_speed = delta * 4

    collision()

    test_text.text = text

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
    // let playerX = player.x - player.width / 2
    // let playerY = player.y - player.height / 2

    // let ballX = ball.x - ball.width / 2
    // let ballY = ball.y - ball.height / 2

    // let playerHit = undefined
    // player.bounce = 0

    // for (let wall of walls) {
    //   if (
    //     playerX < wall.x + wall.width &&
    //     playerX + player.width > wall.x &&
    //     playerY < wall.y + wall.height &&
    //     playerY + player.height > wall.y
    //   ) {
    //     if (player.vx && player.vx < 0) {
    //       playerHit = "left"
    //     }

    //     if (player.vx && player.vx > 0) {
    //       playerHit = "right"
    //     }
    //   }

    //   if (
    //     ballX < wall.x + wall.width &&
    //     ballX + ball.width > wall.x &&
    //     ballY < wall.y + wall.height &&
    //     ballY + ball.height > wall.y
    //   ) {
    //     if (ball.vx) ball.vx = -ball.vx
    //   }
    // }

    // if (playerHit === "left") {
    //   player.vx = 0
    //   player.bounce = 1
    // }

    // if (playerHit === "right") {
    //   player.vx = 0
    //   player.bounce = -1
    // }

    checkCollisionWalls(left_wall, player)
  }

  function setGraphicPoints(obj: GraphicsVector) {
    let x0 = obj.x
    let x1 = obj.x + obj.width

    let y0 = obj.y
    let y1 = obj.y + obj.height

    obj.center = { x: x0 + obj.width / 2, y: y0 + obj.height / 2 } // dot 10
    obj.topLeft = { x: x0, y: y0 } // dot 14
    obj.topRight = { x: x1, y: y0 } // dot 11
    obj.botLeft = { x: x0, y: y1 } // dot 13
    obj.botRight = { x: x1, y: y1 } // dot 12
  }

  function setVectorPoints(obj: SpriteVector) {
    //  THIS ONLY APPLIES IF ANCHOR IS SET TO .5
    // sprite.anchor.set(0.5)
    let x0 = obj.x - obj.width / 2
    let x1 = obj.x + obj.width / 2

    let y0 = obj.y + obj.height / 2
    let y1 = obj.y - obj.height / 2

    obj.center = { x: obj.x, y: obj.y }
    obj.topLeft = { x: x0, y: y1 }
    obj.topRight = { x: x1, y: y1 }
    obj.botLeft = { x: x0, y: y0 }
    obj.botRight = { x: x1, y: y0 }
  }

  function checkCollisionWalls(a: GraphicsVector, b: SpriteVector) {
    // Get Points/Dots
    // 1) Center
    // 2) Top Right
    // 3) Bottom Right
    // 4) Bottom Left
    // 5) Top Left

    let botAxis: Vector = { x: 0, y: stage.height / 2 }
    let topAxis: Vector = { x: 0, y: -stage.height / 2 }
    let leftAxis: Vector = { x: -stage.width / 2, y: 0 }
    let rightAxis: Vector = { x: stage.width / 2, y: 0 }

    let vecBoxA: Vector[] | undefined
    let vecBoxB: Vector[] | undefined

    if (a.center && a.topRight && a.topLeft && a.botRight && a.botLeft) {
      vecBoxA = [
        { x: a.center.x, y: a.center.y },
        { x: a.topRight.x, y: a.topRight.y },
        { x: a.botRight.x, y: a.botRight.y },
        { x: a.botLeft.x, y: a.botLeft.y },
        { x: a.topLeft.x, y: a.topLeft.y },
      ]
    } else {
      text = "Set your graphics vector up boi!"
    }

    if (b.center && b.topRight && b.topLeft && b.botRight && b.botLeft) {
      vecBoxB = [
        { x: b.center.x, y: b.center.y },
        { x: b.topRight.x, y: b.topRight.y },
        { x: b.botRight.x, y: b.botRight.y },
        { x: b.botLeft.x, y: b.botLeft.y },
        { x: b.topLeft.x, y: b.topLeft.y },
      ]
    } else {
      text = "Yo this mofo didn't set up the SPRITE VECTORS!"
    }

    if (vecBoxA && vecBoxB) {
      let min_BoxA: number = dotProduct(vecBoxA[1], leftAxis)
      let min_dot_BoxA: number = 1

      let max_BoxA: number = dotProduct(vecBoxA[1], leftAxis)
      let max_dot_BoxA: number = 1

      let min_BoxB: number = dotProduct(vecBoxB[1], leftAxis)
      let max_BoxB: number = dotProduct(vecBoxB[1], leftAxis)

      let min_dot_BoxB: number = 1
      let max_dot_BoxB: number = 1

      for (let i: number = 0; i < vecBoxA.length; i++) {
        let currProj: number = dotProduct(vecBoxA[i], leftAxis)

        if (min_BoxA > currProj) {
          min_BoxA = currProj
          min_dot_BoxA = i
        }

        if (currProj > max_BoxA) {
          max_BoxA = currProj
          max_dot_BoxA = i
        }
      }

      for (let i: number = 0; i < vecBoxB.length; i++) {
        let currProj: number = dotProduct(vecBoxB[i], leftAxis)

        if (min_BoxB > currProj) {
          min_BoxB = currProj
          min_dot_BoxB = i
        }

        if (currProj > max_BoxB) {
          max_BoxB = currProj
          max_dot_BoxB = i
        }
      }

      let isSeperated: Boolean = max_BoxB < min_BoxA || max_BoxA < min_BoxB

      if (isSeperated) text = "There's a gap!"
      else text = "right"
    } else {
      text = "Boxes not set"
    }
  }

  function dotProduct(C: Vector, axis: Vector): number {
    return Math.floor(C.x * axis.x + C.y + axis.y)
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
