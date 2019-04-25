import { ContentItem } from 'kentico-cloud-delivery';

export class HeroModel extends ContentItem {
  constructor() {
    super({
      propertyResolver: fieldName => {
        if (fieldName === 'image') {
          return 'teaserImage';
        }
        if (fieldName === 'marketing_message') {
          return 'message';
        }
      }
    });
  }
}
