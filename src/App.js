import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {MainPage, Coba} from './containers'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path ="/coba" component={Coba} />
      </Switch>
    </Router>
  );
}

export default App;
