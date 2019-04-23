import React, { Component } from "react";
import { Link } from "react-router-dom";

import { client } from '../../src/config';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


let unsubscribeSubject = new Subject();

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
      // unsubscribe when unsubscribeSubject fires
      .pipe(takeUntil(unsubscribeSubject))
      .subscribe(response => {
        console.log(response.items);
        this.setState({
          loaded: true,
          articles: response.items
        });
      });
  }

  unsubscribe() {
    unsubscribeSubject.next();
    unsubscribeSubject.complete();
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
