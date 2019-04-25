import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeliveryClient } from 'kentico-cloud-delivery';
import { defaultProjectId } from "../Utilities/configProjectId";

const Client = new DeliveryClient({ projectId: defaultProjectId})


let unsubscribeSubject = new Subject();

class ArticleListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };
  }

  fetchArticles() {
    Client
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
    console.log("estos son los articulos",this.state.articles)
    if (this.state.loaded) {
        return (
          <ul>
            {this.state.articles.map((article) => {
              return (
                <li key={article.url_pattern.value}>
                  <Link to={`/post/${article.elements.url_pattern.value}`}>
                    {article.title.value}
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
