import * as React from "react"
import * as PIXI from "pixi.js"
import { setupMaster } from "cluster"

function TestGame(): JSX.Element {
  let pixi_client = null

  PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(
    PIXI.settings.SPRITE_MAX_TEXTURES,
    16
  )

  const loader = PIXI.Loader.shared
  const sprite = PIXI.Sprite

  let stage: PIXI.Container

  const app = new PIXI.Application({
    width: 800,
    height: 600,
    transparent: false,
  })

  function setup(): void {
    loader.reset()

    loader.load(init)
  }

  function init(): void {}

  function updatePIXIClient(elm: any) {
    pixi_client = elm

    if (pixi_client && pixi_client.children.length <= 0)
      pixi_client.appendChild(app.view)

    setup()
  }

  return <div ref={updatePIXIClient} />
}

export default TestGame
