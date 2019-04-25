// import React, { Component } from 'react';
// import config from '../Client'
// import  Hero  from '../Components/Hero';
// import withDeliveryClient from '../withDeliveryClient';

// class HeroStore extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hero: undefined
//     };
    
//   }

//   componentDidMount() {
//     console.log("esto es this.props.clien",this.props.client)
//     this.subscription = this.props.client
//       .item(this.props.codeName)
//       .getObservable()
//       .subscribe(response => {
//         this.setState({
//           hero: response.item
//         });
        
//       });
//   }


//   render() {
//     if (!this.state.hero) {
//       return <Hero />;
//     }
//     const { title, summary, bodyCopy } = this.state.hero;
//     const teaserAlt = this.state.hero.teaserImage.assets[0].description;
//     const teaserUrl = this.state.hero.teaserImage.assets[0].url;

//     return (
//       <Hero
//         title={title.value}
//         summary={summary.value}
//         bodyCopy={bodyCopy.value}
//         teaserImageAlt={teaserAlt}
//         teaserImageSrc={teaserUrl}
//       />
//     );
//   }
// }

// export default withDeliveryClient(config)(HeroStore);
import { Client } from '../Client.js';
import { SortOrder } from 'kentico-cloud-delivery';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  initLanguageCodeObject,
  defaultLanguage
} from '../Utilities/LenguageCodes';
import { spinnerService } from '@chevtek/react-spinners';

let unsubscribe = new Subject();
const resetStore = () => ({
  heroList: initLanguageCodeObject(),
  heroDetails: initLanguageCodeObject()
});

let { heroList, heroDetails } = resetStore();

let changeListeners = [];

let notifyChange = () => {
  changeListeners.forEach(listener => {
    listener();
  });
};

class Hero {
  // Actions

  provideArticle(articleId, language) {
    let query = Client.items()
      .type('home_page_hero_unit')
      .equalsFilter('system.id', articleId)
      .elementsParameter([
        'title',
        'teaser_image',
        'post_date',
        'body_copy',
        'tweet_link',
        'theme',
        'display_options',
        'metadata__meta_title',
        'metadata__meta_description',
        'metadata__og_title',
        'metadata__og_description',
        'metadata__og_image',
        'metadata__twitter_title',
        'metadata__twitter_site',
        'metadata__twitter_creator',
        'metadata__twitter_description',
        'metadata__twitter_image'
      ]);
      

    if (language) {
      query.languageParameter(language);
    }

    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }

    query
      .getObservable()
      .pipe(takeUntil(unsubscribe))
      .subscribe(response => {
        if (!response.isEmpty) {
          if (language) {
            heroDetails[language][articleId] = response.items[0];
          } else {
            heroDetails[defaultLanguage][articleId] = response.items[0];
          }
          notifyChange();
        }
      });
      
  }
  

  provideArticles(language) {
    let query = Client.items()
      .type('home_page_hero_unit')
      .orderParameter('elements.post_date', SortOrder.desc);

    if (language) {
      query.languageParameter(language);
    }

    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }

    query
      .getObservable()
      .pipe(takeUntil(unsubscribe))
      .subscribe(response => {
        if (language) {
          heroList[language] = response.items;
        } else {
          heroList[defaultLanguage] = response.items;
        }
        notifyChange();
      });
  }

  // Methods
  getHero(articleId, language) {
    if (language) {
      return heroDetails[language][articleId];
    } else {
      return heroDetails[defaultLanguage][articleId];
    }
  }

  getArticles(count, language) {
    if (language) {
      return heroList[language].slice(0, count);
    } else {
      return heroList[defaultLanguage].slice(0, count);
    }
  }

  // Listeners
  addChangeListener(listener) {
    changeListeners.push(listener);
  }

  removeChangeListener(listener) {
    changeListeners = changeListeners.filter(element => {
      return element !== listener;
    });
  }

  unsubscribe() {
    unsubscribe.next();
    unsubscribe.complete();
    unsubscribe = new Subject();
  }
}

let HeroStore = new Hero();

export { HeroStore, resetStore };