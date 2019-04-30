import React from "react";

import {HomeStore} from '../Store/Home'
import Header from "../Components/Header";
import HeroStore from '../Store/HeroStore'
import LatestArticles from '../Components/LastesArticles';
import Metadata from '../Components/Metadata'

let getState = () => {
  return {
    metaData: HomeStore.getMetaData()
  };
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.addChangeListener(this.onChange);
    HomeStore.provideMetaData();
  }

  componentWillUnmount() {
    HomeStore.removeChangeListener(this.onChange);
    HomeStore.unsubscribe();
  }


  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let metaData = this.state.metaData;
    return (
      <div className="application-content">
      <Header/>
      <div className="container">
        <Metadata
          title={metaData.metadataMetaTitle}
          description={metaData.metadataMetaDescription}
          ogTitle={metaData.metadataOgTitle}
          ogImage={metaData.metadataOgImage}
          ogDescription={metaData.metadataOgDescription}
          twitterTitle={metaData.metadataMetaTitle}
          twitterSite={metaData.metadataTwitterSite}
          twitterCreator={metaData.metadataTwitterCreator}
          twitterDescription={metaData.metadataTwitterDescription}
          twitterImage={metaData.metadataTwitterImage}
        />
        <HeroStore codeName="home_page_hero_unit"/> 
        <LatestArticles language={this.props.language} />
      </div>
      </div>
    );
  }
}

export default HomePage;
