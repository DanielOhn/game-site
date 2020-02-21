import * as React from "react"
import "../styles/App.css"

import image from "../images/pong.png"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Landing from "./Landing"

import Game from "../components/Game"

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
                render={() => <Game name="Pong" desc="Classic game of Pong." />}
              />
            </Switch>
          </div>
          <div className="games">
            <div className="box">
              <img src={image} alt="pong bois"></img>
              <Link to="/pong">Pong</Link>
            </div>
            <div className="box">
              <img src="http://placekitten.com/g/200/200" alt="cat"></img>
              <Link to="/">Cat!</Link>
            </div>
            <div className="box">
              <img src="http://placekitten.com/g/200/200" alt="cat"></img>
              <Link to="/">Cat Again...</Link>
            </div>
          </div>
        </div>
      </Router>
    </div>
  )
}

export default App
