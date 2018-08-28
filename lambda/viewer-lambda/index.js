"use strict";

const querystring = require("querystring");
const STATUS_FORBIDDEN = "403";
const IP_COOKIE = "Photomy-ip";
const USER_ID_COOKIE = "Photomy-userId";
const PHOTOMY_APP_IDENTIFIER = "PHOTOMY_APP_IDENTIFIER";
const PHOTOMY_APP_SECRET = "APP_SECRET";
const REQUEST_REGEX = /(.*)\/(.*)\.(.*)/;
const IMAGE_REGEX = /^\/media\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})_([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}).*\.JPEG$/;
const AUTHORIZE_REGEX = /^\/authorize\?userId=([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/;

function parseCookies(headers) {
  const parsedCookie = {};
  if (headers.cookie) {
    headers.cookie[0].value.split(";").forEach(cookie => {
      if (cookie) {
        const parts = cookie.split("=");
        parsedCookie[parts[0].trim()] = parts[1].trim();
      }
    });
  }
  return parsedCookie;
}

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const { clientIp, uri, headers, cookie } = request;

  if (
    headers[PHOTOMY_APP_IDENTIFIER] &&
    headers[PHOTOMY_APP_IDENTIFIER][0].value === PHOTOMY_APP_SECRET
  ) {
    callback(null, request);
    return;
  }

  const authorizeMatch = `${uri}?${request.querystring}`.match(AUTHORIZE_REGEX);
  if (authorizeMatch) {
    const userId = authorizeMatch[1];
    callback(null, authorizeResponse(clientIp, userId));
  } else {
    const parsedCookies = parseCookies(headers);
    if (!parsedCookies[IP_COOKIE] || !parsedCookies[USER_ID_COOKIE]) {
      callback(null, forbiddenResponse("Not authorized!!"));
    }

    if (!parsedCookies[IP_COOKIE] === clientIp) {
      callback(null, forbiddenResponse("Hackerman!!"));
    }

    const imageMatch = request.uri.match(IMAGE_REGEX);
    if (imageMatch && imageMatch[2] === parsedCookies[USER_ID_COOKIE]) {
      const params = querystring.parse(request.querystring);
      if (params.d) {
        const dimensionMatch = params.d.split("x");
        const width = dimensionMatch[0];
        const height = dimensionMatch[1];

        const requestMatch = request.uri.match(REQUEST_REGEX);
        const prefix = requestMatch[1];
        const imageName = requestMatch[2];
        const extension = requestMatch[3];

        const quality = params.q ? parseInt(params.q, 10) : 100;
        request.uri = `${prefix}/${width}x${height}/q${quality}/${imageName}.${extension}`;
      }
      callback(null, request);
    } else {
      callback(null, forbiddenResponse("Hackerman userId!"));
    }
  }
};

function forbiddenResponse(body) {
  return { status: STATUS_FORBIDDEN, body };
}

function authorizeResponse(clientIp, userId) {
  return {
    status: "200",
    statusDescription: "OK",
    body: "{}",
    headers: {
      "set-cookie": [
        {
          key: "Set-Cookie",
          value: `${IP_COOKIE}=${clientIp}; path=/`
        },
        {
          key: "Set-Cookie",
          value: `${USER_ID_COOKIE}=${userId}; path=/`
        }
      ]
    }
  };
}
