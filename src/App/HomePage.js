import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../Components/Header";
import HeroStore from "../Store/HeroStore";
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
      <div className="container">
      <HeroStore codeName="home_page_hero_unit"/>
        <Router>
          <div>
            <Route exact path="/" component={ArticleListing} />
            <Route path="/post/:slug" component={ArticleView} />
          </div>
        </Router>
        </div>
      </div>
    );
  }
}

export default HomePage;
