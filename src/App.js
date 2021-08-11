import React, { StrictMode, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Navmenu from './Navmenu';
import Home from './Home';
import StateData from './StateData';
import AppContext from './AppContext';

function App() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <StrictMode>
      <AppContext.Provider value={{ modalShow, setModalShow }}>
        <Navmenu />
        <Router basename='covid-tracker'>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />} />
            <Route path="/state/:shortkey" component={StateData} />
            {/* <Route path="/district/:shortkey" component={DistrictData} /> */}
          </Switch>
        </Router>
      </AppContext.Provider>
    </StrictMode>
  );
}

export default App;
