// import * as React from "react"
import { Vector, GraphicsVector, SpriteVector, ProjResult } from "./Interfaces"
import { getMinMax, setCenter } from "./Vector"

let checkCollision = (
  a: SpriteVector | GraphicsVector,
  b: SpriteVector | GraphicsVector,
  stage: PIXI.Container
) => {
  // Get Points/Dots
  // 1) Center
  // 2) Top Right
  // 3) Bottom Right
  // 4) Bottom Left
  // 5) Top Left

  setCenter(a)
  setCenter(b)

  let botAxis: Vector = { x: 0, y: stage.height / 2 }
  let topAxis: Vector = { x: 0, y: -stage.height / 2 }
  let leftAxis: Vector = { x: stage.width / 2, y: 0 }
  let rightAxis: Vector = { x: stage.width / 2, y: 0 }

  let axis: Vector[] = []
  axis.push(botAxis)
  axis.push(topAxis)
  axis.push(leftAxis)
  axis.push(rightAxis)

  let vecBoxA: Vector[] | undefined
  let vecBoxB: Vector[] | undefined

  // botLeft = minX maxY
  // botRight = maxX maxY

  // topLeft = minX minY
  // topRight = maxX minY

  if (a.center) {
    vecBoxA = [
      { x: a.center.x, y: a.center.y }, //dot 10
      { x: a.getBounds().right, y: a.getBounds().top }, //dot 11
      { x: a.getBounds().right, y: a.getBounds().bottom }, // dot 12
      { x: a.getBounds().left, y: a.getBounds().bottom }, // dot 13
      { x: a.getBounds().left, y: a.getBounds().top }, // dot 14
    ]
  } else {
    console.log("Set your graphics vector up boi!")
  }

  if (b.center) {
    vecBoxB = [
      { x: b.center.x, y: b.center.y },
      { x: b.getBounds().right, y: b.getBounds().top },
      { x: b.getBounds().right, y: b.getBounds().bottom },
      { x: b.getBounds().left, y: b.getBounds().bottom },
      { x: b.getBounds().left, y: b.getBounds().top },
    ]
  } else {
    console.log("Yo this mofo didn't set up the SPRITE VECTORS!")
  }

  if (vecBoxA && vecBoxB) {
    // get normals (boxes won't rotate) so leave this for now

    // Result of P, Q
    let resultP1: ProjResult = getMinMax(vecBoxA, leftAxis)
    let resultP2: ProjResult = getMinMax(vecBoxB, leftAxis)

    let resultQ1: ProjResult = getMinMax(vecBoxA, botAxis)
    let resultQ2: ProjResult = getMinMax(vecBoxB, botAxis)

    // Result of R, S
    let resultR1: ProjResult = getMinMax(vecBoxA, rightAxis)
    let resultR2: ProjResult = getMinMax(vecBoxB, rightAxis)

    let resultS1: ProjResult = getMinMax(vecBoxA, topAxis)
    let resultS2: ProjResult = getMinMax(vecBoxB, topAxis)

    let seperateP: boolean =
      resultP1.maxProj < resultP2.minProj || resultP2.maxProj < resultP1.minProj
    let seperateQ: boolean =
      resultQ1.maxProj < resultQ2.minProj || resultQ2.maxProj < resultQ1.minProj
    let seperateR: boolean =
      resultR1.maxProj < resultR2.minProj || resultR2.maxProj < resultR1.minProj
    let seperateS: boolean =
      resultS1.maxProj < resultS2.minProj || resultS2.maxProj < resultS1.minProj

    let isSeperated: boolean = false
    isSeperated = seperateP || seperateQ || seperateR || seperateS

    return isSeperated
  }
}

export default checkCollision
