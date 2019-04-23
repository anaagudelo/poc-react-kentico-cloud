import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import ArticleListing from './Components/ArticleListing';
import ArticleView from './Components/ArticleView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Our blog</h1>
        </header>
        <Router>
          <div>
            <Route exact path="/" component={ArticleListing} />
            <Route path="/post/:slug" component={ArticleView} />
          </div>
        </Router>

      </div>
    );
  }
}

export default App;