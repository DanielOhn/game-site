import * as React from "react"
import * as PIXI from "pixi.js"
import { GraphicsVector } from "../lib/Interfaces"
import { setGraphicPoints } from "../lib/Vector"

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

  const app = new PIXI.Application({
    width: 800,
    height: 600,
    transparent: false,
  })

  function setup(): void {
    loader.reset()

    loader.load(init)
  }

  function init(): void {
    stage = new PIXI.Container()
    app.stage.addChild(stage)

    stage.x = app.screen.width / 2
    stage.y = app.screen.height / 2

    initRectangle(rectOne, 0, 0)
    initRectangle(rectTwo, 50, 50)
    initRectangle(rectThree, -50, -50)

    rectOne.name = "box one"
    rectTwo.name = "box two"
    rectThree.name = "box three"
  }

  function initRectangle(rect: GraphicsVector, x: number, y: number) {
    rect.lineStyle(5, 0xffffff)
    rect.drawRect(0, 0, 50, 50)
    rect.endFill()

    rect.interactive = true
    rect.buttonMode = true

    rect.position.set(x, y)

    rect.hitArea = new PIXI.Rectangle(0, 0, 50, 50)

    stage.addChild(rect)

    rect
      .on("pointerdown", function dragStart(this: any) {
        this.alpha = 0.7
        this.dragging = true
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
        }
      })
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
