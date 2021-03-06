import {Client} from '../Client2'
import { takeUntil } from "rxjs/operators";
import { Subject} from "rxjs";
import { spinnerService } from "@chevtek/react-spinners";


let unsubscribe = new Subject();
let changeListeners = [];
const resetStore = () => ({
  metaData: {}
});
let { metaData } = resetStore();

let notifyChange = () => {
  changeListeners.forEach(listener => {
    listener();
  });
};

let fetchMetaData =()=> {
  let query = Client.items()
    .type('home')
    .elementsParameter([
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


  query
    .getObservable()
    .pipe(takeUntil(unsubscribe))
    .subscribe(response => {
        metaData = response.items[0];
      notifyChange();
    });
};
class Home {
  // Actions
  
  provideMetaData(urlSlug) {
    if (spinnerService.isShowing('apiSpinner') === false) {
      spinnerService.show('apiSpinner');
    }
    fetchMetaData(urlSlug);
  }

  // Methods

  getMetaData() {
    spinnerService.hide('apiSpinner');
    return metaData;
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

let HomeStore = new Home();

export { HomeStore, resetStore };
