import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import FAQContainer from './FAQContainer'
import LauncherList from '../components/LauncherList'
import LauncherShow from './LauncherShow'

const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={FAQContainer} />
        <Route path='launchers' component={LauncherList}/>
        <Route path = 'launcher/:id' component = {LauncherShow} />
      </Route>
    </Router>
  )
}

export default App;
