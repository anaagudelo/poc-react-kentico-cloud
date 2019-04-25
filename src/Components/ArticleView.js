import React, { Component } from "react";
import { Link } from "react-router-dom";


import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { resolveItemInRichText } from "../itemResolver";
import { resolveContentLink } from "../linkResolver";
import { DeliveryClient } from 'kentico-cloud-delivery';
import { defaultProjectId } from "../Utilities/configProjectId";

const Client = new DeliveryClient({ projectId: defaultProjectId})
let unsubscribeSubject = new Subject();

class ArticleView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      articleId: null
    };
  }
  fetchArticle(slug) {
    Client
      .items()
      .equalsFilter("elements.url_pattern", slug)
      .depthParameter(1)
      .queryConfig({
        richTextResolver: resolveItemInRichText,
        linkResolver: resolveContentLink
      })
      .getObservable()
      // unsubscribe when unsubscribeSubject fires
      .pipe(takeUntil(unsubscribeSubject))
      .subscribe(response => {
        console.log(response);
        this.setState({
          loaded: true,
          article: response.items[0]
        });
      });
  }

  unsubscribe() {
    unsubscribeSubject.next();
    unsubscribeSubject.complete();
  }

  componentDidMount() {
    let slug = this.props.match.params.slug;
    this.fetchArticle(slug);
  }

  componentDidUpdate(oldprops) {
    let oldSlug = oldprops.match.params.slug;
    let newSlug = this.props.match.params.slug;
    if (oldSlug !== newSlug) {
      this.fetchArticle(newSlug);
    }
  }

  handleClick(event, richTextElement) {
    if (event.target.tagName === 'A' && event.target.hasAttribute('data-item-id')) {
      event.preventDefault();
  
      const id = event.target.getAttribute('data-item-id');
      const link = richTextElement.links.find(link => link.itemId === id);
      const newPath = resolveContentLink(link);
      if (newPath) {
        this.props.history.push(newPath);
      }
    }
  }

  render = props => {
    if (this.state.loaded) {
      const article = this.state.article;
      const title = article.title.value;
      const bodyCopy = article.body_copy;

      return (
        <div>
          <Link to="/">Home</Link>
          <h1>{title}</h1>
          <div
            className="article_body"
            dangerouslySetInnerHTML={{ __html: bodyCopy.getHtml() }}
            onClick={event => this.handleClick(event, bodyCopy)}
          />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };
}

export default ArticleView;
