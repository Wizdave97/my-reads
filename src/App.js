import React, { Component } from 'react';
import './App.css';
import Library from './components/library/Library';
import { Route } from 'react-router-dom';
import Search from './components/search/Search';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Library}/>
        <Route path="/search" component={Search}/>
      </React.Fragment>
    );
  }
}

export default App;
