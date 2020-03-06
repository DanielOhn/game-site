// import * as React from "react"

import { Vector, GraphicsVector, SpriteVector, ProjResult } from "./Interfaces"

export let setGraphicPoints = (obj: GraphicsVector) => {
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

export let setVectorPoints = (obj: SpriteVector) => {
  //  THIS ONLY APPLIES IF anchor IS SET TO .5
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

let normVector = (v: Vector): Vector => {
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
