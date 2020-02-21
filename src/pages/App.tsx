import * as React from "react"
import "../styles/App.css"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"

import Landing from "./Landing"

import Game from "../components/Game"

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/pong">Pong</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact render={() => <Landing />} />
            <Route
              path="/pong"
              exact
              render={() => <Game name="Pong" desc="Classic game of Pong." />}
            />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
