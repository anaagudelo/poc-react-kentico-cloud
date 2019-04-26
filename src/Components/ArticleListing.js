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
      .elementsParameter(["title"])
      .getObservable()
      // unsubscribe when unsubscribeSubject fires
      .pipe(takeUntil(unsubscribeSubject))
      .subscribe(response => {
        console.log("Esto es lo que viene de fecthArticles",response.items);
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
          <div>
            <br></br>
          <h1 className="title-tab">Articles Listing</h1>
          <ul>
            {this.state.articles.map((article) => {
              //  console.log("estas son las props que vienen del ArticleLinsting",article)
              return (
                <div className="col-md-12 col-lg-2 tag"  key={article.title.value}>
                  <Link to={`/post/${article.elements.title.value}`}>
                    {article.title.value}
                  </Link>
                  <div className="article-tile-content">
                <h2 className="h4">
                </h2>
                <p className="article-tile-text">Resumen</p>
              </div>
                </div>
                
              )
            })}
          </ul>
          </div>
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
