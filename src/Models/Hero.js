import { ContentItem } from 'kentico-cloud-delivery';

export class Hero extends ContentItem {
  constructor() {
    super({
      propertyResolver: fieldName => {
        if (fieldName === 'teaser_image') {
          return 'teaserImage';
        }

        if (fieldName === 'post_date') {
          return 'postDate';
        }

        if (fieldName === 'body_copy') {
          return 'bodyCopy';
        }

        if (fieldName === 'related_articles') {
          return 'relatedArticles';
        }

        if (fieldName === 'url_pattern') {
          return 'urlPattern';
        }
      }
    });
  }
}