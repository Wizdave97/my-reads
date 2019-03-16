import React, { Component } from 'react';
import './App.css';
import Library from './components/library/Library';
import { Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Library}/>
      </React.Fragment>
    );
  }
}

export default App;
