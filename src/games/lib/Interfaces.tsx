import * as React from "react"
import { Graphics } from "pixi.js"

export interface Vector {
  x: number
  y: number
}

export interface SpriteVector extends PIXI.Sprite {
  vx?: number
  vy?: number
  hp?: number
  lives?: number
  score?: number
  dock?: boolean
  bounce?: number

  center?: Vector
}

export interface GraphicsVector extends PIXI.Graphics {
  center?: Vector
}

export interface ProjResult {
  minProj: number
  maxProj: number
  minIndex: number
  maxIndex: number
}
