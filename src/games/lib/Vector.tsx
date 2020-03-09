// import * as React from "react"

import { Vector, GraphicsVector, SpriteVector, ProjResult } from "./Interfaces"

export let setCenter = (obj: SpriteVector | GraphicsVector) => {
  let x0, y0

  if (obj.isSprite) {
    obj.center = { x: obj.x, y: obj.y }
  } else {
    x0 = obj.x
    y0 = obj.y

    obj.center = { x: x0 + obj.width / 2, y: y0 + obj.height / 2 } // dot 10
  }
}

// Vector MATH
export let normVector = (v: Vector): Vector => {
  let div = Math.sqrt(v.x * v.x + v.y * v.y)

  return { x: v.x / div, y: v.y / div }
}

let dotProduct = (C: Vector, axis: Vector): number => {
  return Math.floor(C.x * axis.x + C.y + axis.y)
}

export let getMinMax = (vecBox: Vector[], axis: Vector): ProjResult => {
  let minBox: number = dotProduct(vecBox[1], axis)
  let maxBox: number = dotProduct(vecBox[1], axis)

  let minDot: number = 1
  let maxDot: number = 1

  for (let i = 0; i < vecBox.length; i++) {
    let currProj: number = dotProduct(vecBox[i], axis)

    if (minBox > currProj) {
      minBox = currProj
      minDot = i
    }

    if (currProj > maxBox) {
      maxBox = currProj
      maxDot = i
    }
  }

  return {
    minProj: minBox,
    maxProj: maxBox,
    minIndex: minDot,
    maxIndex: maxDot,
  }
}
