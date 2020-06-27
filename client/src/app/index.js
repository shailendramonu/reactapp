import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { AlternatesList, AlternatesInsert, AlternatesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/alternates/list" exact component={AlternatesList} />
        <Route path="/alternates/create" exact component={AlternatesInsert} />
        <Route
          path="/alternates/update/:id"
          exact
          component={AlternatesUpdate}
        />
      </Switch>
    </Router>
  )
}

export default App
