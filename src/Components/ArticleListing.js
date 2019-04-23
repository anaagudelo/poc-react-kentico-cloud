import React, { Component } from "react";
import { Link } from "react-router-dom";
import { client } from '../../src/config';



class ArticleListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  fetchArticles() {
    client
      .items()
      .type("article")
      .elementsParameter(["url_pattern", "title"])
      .getObservable()
      .subscribe(response => {
        console.log(response.items);
        this.setState({
          loaded: true,
          articles: response.items
        });
      });
  }

  componentDidMount() {
    this.fetchArticles();
  }

  render() {
    if (this.state.loaded) {
        return (
          <ul>
            {this.state.articles.map((article) => {
              return (
                <li key={article.url_pattern.value}>
                  <Link to={`/post/${article.elements.url_pattern.value}`}>
                    {article.title.text}
                  </Link>
                </li>
              )
            })}
          </ul>
        );
      } 
       if (this.state.loaded) {
      return (
        <ul>
          {this.state.articles.map((article) => {
            return (
              <li key={article.url_pattern.value}>
                <Link to={`/post/${article.elements.url_pattern.value}`}>
                  {article.title.text}
                </Link>
              </li>
            )
          })}

        </ul>
      );
    } else {
        return (
          <div>
            Loading...
            </div>
        )
    }
  }
}

export default ArticleListing;
