import * as React from "react"
import * as PIXI from "pixi.js"

import { GraphicsVector, SpriteVector } from "../lib/Interfaces"
import checkCollision from "../lib/Collision"
import square from "./images/square.png"

function TestGame(): JSX.Element {
  let pixi_client = null

  PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(
    PIXI.settings.SPRITE_MAX_TEXTURES,
    16
  )

  const loader = PIXI.Loader.shared

  let stage: PIXI.Container

  let rectOne: GraphicsVector = new PIXI.Graphics()
  let rectTwo: GraphicsVector = new PIXI.Graphics()
  let rectThree: GraphicsVector = new PIXI.Graphics()

  let spriteOne: SpriteVector = new PIXI.Sprite()
  // let spriteTwo: SpriteVector = new PIXI.Sprite()

  let rects: GraphicsVector[] = []
  let text: PIXI.Text
  let str: string = "text here!"

  const app = new PIXI.Application({
    width: 800,
    height: 600,
    transparent: false,
  })

  function setup(): void {
    loader.reset()

    loader.add("square", square).load(init)
  }

  function init(): void {
    stage = new PIXI.Container()
    app.stage.addChild(stage)

    rectOne.name = "box one"
    rectTwo.name = "box two"
    rectThree.name = "box three"
    spriteOne.name = "sprite one"

    initRectangle(rectOne, 400, 250)
    initRectangle(rectTwo, 500, 300)
    initRectangle(rectThree, 575, 200)

    spriteOne = initSprite(spriteOne, 500, 500)

    initText()
    console.log(spriteOne.getBounds())
    console.log(spriteOne.getBounds().top)
    console.log(spriteOne.getBounds().bottom)

    console.log(spriteOne.getBounds().left)
    console.log(spriteOne.getBounds().right)
    console.log(rectOne.getLocalBounds())
    app.ticker.add(delta => gameLoop(delta))
  }

  function initRectangle(rect: GraphicsVector, x: number, y: number) {
    rect.lineStyle(4, 0xffffff)
    rect.drawRect(0, 0, 50, 50)
    rect.endFill()

    rect.interactive = true
    rect.buttonMode = true

    rect.position.set(x, y)
    rect.hitArea = new PIXI.Rectangle(0, 0, 50, 50)

    stage.addChild(rect)
    rects.push(rect)

    rect
      .on("pointerdown", function dragStart(this: any) {
        this.alpha = 0.5
        this.dragging = true

        str =
          this.name +
          "\nx: " +
          this.x +
          "\ny: " +
          this.y +
          "\nisSprite: " +
          this.isSprite +
          "\n\nGet Bounds" +
          "\nleft: " +
          this.getBounds().left +
          "\nright: " +
          this.getBounds().right +
          "\ntop: " +
          this.getBounds().top +
          "\nbot: " +
          this.getBounds().bottom
      })
      .on("pointerup", function dragEnd(this: any) {
        this.alpha = 1
        this.dragging = false
      })
      .on("pointerupoutside", function dragEnd(this: any) {
        this.alpha = 1
        this.dragging = false
      })
      .on("pointermove", function dragMove(this: any, e: any) {
        if (this.dragging) {
          let newPos = e.data.getLocalPosition(stage)
          this.x = newPos.x - this.width / 2
          this.y = newPos.y - this.height / 2
          str =
            this.name +
            "\nx: " +
            this.x +
            "\ny: " +
            this.y +
            "\nisSprite: " +
            this.isSprite +
            "\n\nGet Bounds" +
            "\nleft: " +
            this.getBounds().left +
            "\nright: " +
            this.getBounds().right +
            "\ntop: " +
            this.getBounds().top +
            "\nbot: " +
            this.getBounds().bottom
        }
      })
  }

  function initSprite(
    sprite: SpriteVector,
    x: number,
    y: number
  ): SpriteVector {
    sprite = new PIXI.Sprite(PIXI.Loader.shared.resources.square.texture)

    sprite.anchor.set(0.5)
    sprite.position.set(x, y)

    stage.addChild(sprite)

    sprite.interactive = true
    sprite.buttonMode = true

    sprite
      .on("pointerdown", function dragStart(this: any) {
        this.alpha = 0.5
        this.dragging = true

        str =
          this.name +
          "\nx: " +
          this.x +
          "\ny: " +
          this.y +
          "\nisSprite: " +
          this.isSprite +
          "\n\nGet Bounds" +
          "\nleft: " +
          this.getBounds().left +
          "\nright: " +
          this.getBounds().right +
          "\ntop: " +
          this.getBounds().top +
          "\nbot: " +
          this.getBounds().bottom
      })
      .on("pointerup", function dragEnd(this: any) {
        this.alpha = 1
        this.dragging = false
      })
      .on("pointerupoutside", function dragEnd(this: any) {
        this.alpha = 1
        this.dragging = false
      })
      .on("pointermove", function dragMove(this: any, e: any) {
        if (this.dragging) {
          let newPos = e.data.getLocalPosition(stage)
          this.x = newPos.x
          this.y = newPos.y
          str =
            this.name +
            "\nx: " +
            this.x +
            "\ny: " +
            this.y +
            "\nisSprite: " +
            this.isSprite +
            "\n\nGet Bounds" +
            "\nleft: " +
            this.getBounds().left +
            "\nright: " +
            this.getBounds().right +
            "\ntop: " +
            this.getBounds().top +
            "\nbot: " +
            this.getBounds().bottom
        }
      })

    return sprite
  }

  function initText() {
    const style = new PIXI.TextStyle({
      fontFamily: "Roboto",
      fill: ["#ffff"],
      fontSize: 18,
    })

    text = new PIXI.Text(str, style)
    stage.addChild(text)

    text.position.set(0, 0)
  }

  function gameLoop(d: number) {
    collision()
    if (text.text !== str) text.text = str
  }

  function collision() {
    for (let rect of rects) {
      if (!checkCollision(spriteOne, rect, stage)) {
        rect.tint = 0xff0000
        spriteOne.tint = 0xff0000
      } else {
        rect.tint = 0xffffff
        spriteOne.tint = 0xffffff
      }
    }

    // if (!checkCollision(rectOne, rectTwo, stage)) {
    //   rectOne.tint = 0x  ff0000
    //   rectTwo.tint = 0xff0000
    // } else if (!checkCollision(rectTwo, rectThree, stage)) {
    //   rectTwo.tint = 0xff0000
    //   rectThree.tint = 0xff0000
    // } else if (!checkCollision(rectOne, rectThree, stage)) {
    //   rectOne.tint = 0xff0000
    //   rectThree.tint = 0xff0000
    // } else {
    //   rectOne.tint = 0xffffff
    //   rectTwo.tint = 0xffffff
    //   rectThree.tint = 0xffffff
    // }
  }

  function updatePIXIClient(elm: any) {
    pixi_client = elm

    if (pixi_client && pixi_client.children.length <= 0)
      pixi_client.appendChild(app.view)

    setup()
  }

  return <div ref={updatePIXIClient} />
}

export default TestGame
