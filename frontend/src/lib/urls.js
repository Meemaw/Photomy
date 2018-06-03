// @flow
import querystring from 'querystring';

export const injectParameters = (urlTemplate: string, data: {}, hasBody: boolean): string => {
  let url = urlTemplate;

  data = { ...data };

  for (let tag of url.match(/:\w+/g) || []) {
    const urlTag = tag.slice(1);

    // PORT :8000/...
    if (!isNaN(urlTag)) {
      delete data[urlTag];
      continue;
    }
    let value = data[urlTag];
    if (value === undefined) {
      value = urlTag;
    }
    url = url.replace(tag, encodeURIComponent(value));
    delete data[urlTag];
  }

  if (!hasBody) {
    let qs = querystring.stringify(data);
    if (qs) {
      url += (url.indexOf('?') >= 0 ? '&' : '?') + qs;
    }
  }
  return url;
};
