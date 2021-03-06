import React, { Component } from "react";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { DeliveryClient } from "kentico-cloud-delivery";
import { defaultProjectId } from "../Utilities/configProjectId";

const Client = new DeliveryClient({ projectId: defaultProjectId });

let unsubscribeSubject = new Subject();

class ManuItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: []
    };
  }

  fetchMenuItems() {
    Client.items()
      .type("navigation_item")
      .elementsParameter(["url_slug", "title"])
      .getObservable()
      // unsubscribe when unsubscribeSubject fires
      .pipe(takeUntil(unsubscribeSubject))
      .subscribe(response => {
        this.setState({
          menuItems: response.items
        });
      });
  }
  unsubscribe() {
    unsubscribeSubject.next();
    unsubscribeSubject.complete();
  }

  componentDidMount() {
    this.fetchMenuItems();
  }

  render() {
      return (
        <header className="header" role="banner">
          <div className="menu">
            <div className="container">
              <nav>
                <ul>
                  {this.state.menuItems.map(ManuItem => {
                    return (
                      <li key={ManuItem.url_slug.value}>
                        <a href="/">{ManuItem.elements.title.value}</a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <div className="header-row">
            <div className="container">
              <div className="col-xs-8 col-md-8 col-lg-4 logo">
                <h1 className="logo">Dancing Goat</h1>
              </div>
            </div>
          </div>
        </header>
      );
  }
}

export default ManuItems;
