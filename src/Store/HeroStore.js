import Hero from "../Components/Hero";
import React, { Component } from "react";
import config from "../Client";
import withDeliveryClient from "../Utilities/withDeliveryClient";

class HeroStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hero: undefined
    };
  }

  componentDidMount() {
    // console.log("esto es this.props.clien",this.props.client)
    this.subscription = this.props.client
      .item(this.props.codeName)
      .getObservable()
      .subscribe(response => {
        this.setState({
          hero: response.item
        });
        
      }); 
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  render() {
    if (!this.state.hero) {
      return <Hero/>;
    }
    console.log("estas son las props que vienen del Heromodl",this.state.hero)
    const { title, marketing_message } = this.state.hero;
    // const teaserAlt = this.state.hero.teaserImage.assets[0].description;
    // const teaserUrl = this.state.hero.teaserImage.assets[0].url;

    return (
      <Hero
        title={title.value}
        message={marketing_message.value}
        // teaserImageAlt={teaserAlt}
        // teaserImageSrc={teaserUrl}
      />
    );
  }
}
export default withDeliveryClient(config)(HeroStore);
