export const resolveContentLink = (link) => {
    if (link.type === 'article') {
      return `/post/${link.urlSlug}`;
    }
    if (link.type === 'navigation_item') {
      return `${link.urlSlug}`;
    }
    return undefined;
  };