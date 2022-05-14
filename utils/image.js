import client from './client';
import imageUrlBuilder from '@sanity/image-url';

function urlForThumbnail(source) {
  return imageUrlBuilder(client).image(source).width(200).height(200).url();
}

function urlFor(source) {
  return imageUrlBuilder(client).image(source).width(580).url();
}

export { urlFor, urlForThumbnail };
