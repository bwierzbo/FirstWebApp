// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import UploadComponent from './components/UploadComponent';
import DashboardComponent from './components/DashboardComponent';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/signup" component={SignupComponent} />
        <Route path="/upload" component={UploadComponent} />
        <Route path="/dashboard" component={DashboardComponent} />
        <Route path="/" component={LoginComponent} />
      </Switch>
    </Router>
  );
};

export default App;
