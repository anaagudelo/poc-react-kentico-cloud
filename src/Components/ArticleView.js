import React, { Component } from "react";
import { Link } from "react-router-dom";
import { client } from '../../src/config';


class ArticleView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      article: null
    };
  }
  fetchArticle(slug) {
    client
      .items()
      .equalsFilter("elements.url_pattern", slug)
      .depthParameter(1)
      .getObservable()
      .subscribe(response => {
        console.log(response);
        this.setState({
          loaded: true,
          article: response.items[0]
        });
      });
  }

  componentDidMount() {
    let slug = this.props.match.params.slug;
    this.fetchArticle(slug);
  } 

  render = (props) => {
    if (this.state.loaded) {
      const article = this.state.article;
      const title = article.title.value;
      const bodyCopy = article.body_copy;

      return (
        <div>
          <Link to="/">Home</Link>
          <h1>{title}</h1>
          <div className="article_body"
            dangerouslySetInnerHTML={{ __html: bodyCopy.getHtml() }} />
        </div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

export default ArticleView;
