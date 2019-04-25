const KenticoCloud = require('kentico-cloud-delivery');

// Create strongly typed models according to https://developer.kenticocloud.com/docs/strongly-typed-models
export class NavigationItem extends KenticoCloud.ContentItem {
    constructor() {
        super();
    }
}

const deliveryClient = new KenticoCloud.DeliveryClient({
    projectId: '2de25277-7ba8-0068-2a7a-58ef97ce76fe',
    typeResolvers: [
        new KenticoCloud.TypeResolver('navigation_item', () => new NavigationItem)
    ]
});

deliveryClient.item('root_navigation_item')
    .depthParameter(5)
    .getObservable()
    .subscribe(response => console.log('estos son los items del menu',response.item));