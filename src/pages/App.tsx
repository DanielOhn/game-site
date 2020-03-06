import * as React from "react"
import "../styles/App.css"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Landing from "./Landing"
import Game from "../components/Game"

import Pong from "../games/pong/pong"
import Breakout from "../games/breakout/breakout"
import TestGame from "../games/testGame/testGame"

import pong from "../images/pong.png"

function App() {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <h1 className="title">
            <Link to="/">Ohnage Games</Link>
          </h1>
        </div>
        <div className="content">
          <div className="body">
            <Switch>
              <Route path="/" exact render={() => <Landing />} />
              <Route
                path="/pong"
                exact
                render={() => (
                  <div>
                    <Game name="Pong" desc="Classic game of Pong." />
                    <Pong />
                  </div>
                )}
              />
              <Route
                path="/breakout"
                exact
                render={() => (
                  <div>
                    <Game name="Breakout" desc="Classic game of Breakout." />
                    <Breakout />
                  </div>
                )}
              />
              <Route
                path="/test"
                exact
                render={() => (
                  <div>
                    <Game
                      name="Collision Test"
                      desc="Nothing helps make up minds like roses or a lot of time"
                    />
                    <TestGame />
                  </div>
                )}
              />
            </Switch>
          </div>
          <div className="games">
            <Link to="/pong" className="box">
              <img src={pong} alt="pong bois"></img>
              <span>Pong</span>
            </Link>
            <Link to="/breakout" className="box">
              <img src="http://placekitten.com/g/200/200" alt="cat"></img>
              <span>Breakout</span>
            </Link>
            <Link to="/test" className="box">
              <img src="http://placekitten.com/g/200/200" alt="cat"></img>
              <span>Cat Again...</span>
            </Link>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
