// import React, {Component} from "react";

// class Hero extends Component {
//   render() {
//     return (
//       <article>
//         <div className="col-md-3">
//         <header>
//           <h1>{this.props.title}</h1>
//         </header>
//         <img
//           alt={this.props.teaserImageAlt}
//           src={this.props.teaserImageSrc}
//           width="500"
//         />
//         <p>{this.props.summary}</p>
//         <div dangerouslySetInnerHTML={{ __html: this.props.bodyCopy }} />
//         </div>
        
//       </article>
//     );
//   }
// }
// export default Hero;
import React from 'react';


const Hero = props => {
  return (
    <section
      className="banner-section"
    >
      <h2 className="banner-heading">Heading</h2>
      <p className="banner-text">Texto</p>
    </section>
  );
};

export default Hero;