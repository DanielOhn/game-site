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
    initRectangle(rectTwo, 100, 100)
  }

  function initRectangle(rect: GraphicsVector, x: number, y: number) {
    rect.lineStyle(5, 0xffffff)
    rect.drawRect(0, 0, 50, 50)
    rect.endFill()

    rect.interactive = true
    rect.buttonMode = true

    rect.position.set(x, y)

    rect.hitArea = new PIXI.Rectangle(x, y, 50, 50)
    setGraphicPoints(rect)

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
        if (this.dragging && this.center) {
          let newPos = e.data.getLocalPosition(stage)
          this.x = newPos.x - this.center.x
          this.y = newPos.y - this.center.y
        }
      })

    stage.addChild(rect)
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
