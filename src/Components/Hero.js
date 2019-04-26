import React, { Component } from "react";

class Hero extends Component {
  
  render() {
    return (
      <div className="hero">
      <img
         alt={this.props.teaserImageAlt}
         src={this.props.teaserImageSrc}
        /> 
        <div className="heroDetails">
        <h2 className="banner-heading">{this.props.title}</h2>
        <p className="banner-text"> {this.props.message} </p> 
        </div>
      </div>
    );
  }
}
export default Hero;