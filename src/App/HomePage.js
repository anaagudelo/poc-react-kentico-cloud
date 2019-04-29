import React from "react";
import Header from "../Components/Header";
import HeroStore from "../Store/HeroStore";
import LatestArticles from '../Components/LastesArticles';

class HomePage extends React.Component {

  render() {
    return (
      <div className="application-content">
      <Header/>
      <div className="container">
        <HeroStore codeName="home_page_hero_unit"/>
        <LatestArticles language={this.props.language} />
        </div>
      </div>
    );
  }
}

export default HomePage;
