import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";
import ArticleListing from './Components/ArticleListing';
import ArticleView from './Components/ArticleView';
import Header from './Components/Header';
import Hero from './Components/Hero';


class App extends Component {
  render() {
    return (
      <div className="application-content">
        <Header/>
        {/* <Hero codeName="on_roasts"/> */}
        <Router>
          <div>
            <Route exact path="/" component={Hero} />
            <Route exact path="/" component={ArticleListing} />
            <Route path="/post/:slug" component={ArticleView} />
          </div>
        </Router>
        
      </div>
    );
  }
}

export default App;