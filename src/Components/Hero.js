import React, { Component } from "react";

class Hero extends Component {
  
  render() {
    return (
      <div className="hero">
      <img
          src="https://assets-us-01.kc-usercontent.com:443/2de25277-7ba8-0068-2a7a-58ef97ce76fe/55caecc2-400c-4ee3-91c3-0f7f067414ec/banner-default.jpg"
        /> 
        <div claName="heroDetails">
        <h2 className="banner-heading">{this.props.title}</h2>
        <p className="banner-text"> {this.props.message} </p> 
        </div>
      </div>
    );
  }
}
export default Hero;