import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import ArticleListing from "../Components/ArticleListing";
import ArticleView from "../Components/ArticleView";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="application-content">
      <Header/>
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

export default HomePage;
