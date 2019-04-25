import React, { Component } from "react";

import { HeroStore } from "../Store/Hero";
import RichTextElement from "../Components/RichTextElement";
import Metadata from "../Components/Metadata";

let getState = props => {
  return {
    hero: HeroStore.getHero(props.match.params.heroId)
  };
};

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = getState(props);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HeroStore.provideHero(this.props.match.params.heroId);
  }

  componentWillUnmount() {
    HeroStore.unsubscribe();
  }

  static getDerivedStateFromProps(nextProps) {
    HeroStore.provideHero(nextProps.match.params.heroId);
  }

  onChange() {
    this.setState(getState(this.props));
  }

  render() {
    let hero = this.state.hero;

    if (!hero) {
      return <div className="container" />;
    }

    let title =
      hero.title.value.trim().length > 0
        ? hero.title.value
        : this.props.t("noTitleValue");

    let imageLink =
      hero.teaserImage.value[0] !== undefined ? (
        <img
          alt={title}
          className="img-responsive"
          src={hero.teaserImage.value[0].url}
          title={title}
        />
      ) : (
        <div className="img-responsive placeholder-tile-image">
          {this.props.t("noTeaserValue")}
        </div>
      );

    let bodyCopyElement =
      hero.bodyCopy.value !== "<p><br></p>" ? (
        <RichTextElement
          className="article-detail-content"
          element={hero.bodyCopy}
        />
      ) : (
        <p className="article-detail-content">
          {this.props.t("noBodyCopyValue")}
        </p>
      );
    return (
      <div className="container">
        <Metadata
          title={hero.metadataMetaTitle}
          description={hero.metadataMetaDescription}
          ogTitle={hero.metadataOgTitle}
          ogImage={hero.metadataOgImage}
          ogDescription={hero.metadataOgDescription}
          twitterTitle={hero.metadataMetaTitle}
          twitterSite={hero.metadataTwitterSite}
          twitterCreator={hero.metadataTwitterCreator}
          twitterDescription={hero.metadataTwitterDescription}
          twitterImage={hero.metadataTwitterImage}
        />
        <article className="article-detail col-lg-9 col-md-12 article-detail-related-box">
        <h2>{title}</h2>
        <div className="row">
            <div className="article-detail-image col-md-push-2 col-md-8">
              {imageLink}
            </div>
          </div>
          <div className="row">{bodyCopyElement}</div>
        </article>
      </div>
    );
  }
}

export default Hero;
