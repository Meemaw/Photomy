"use strict";

const Sharp = require("sharp");
const AWS = require("aws-sdk");
const S3 = new AWS.S3({
  signatureVersion: "v4",
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey"
});

const BUCKET = "YOUR_BUCKET";
const DIMENSIONS_REGEX = /^\/(.*)\/((\d+)x(\d+))\/(.*)\.(.*)/;
const ALLOWED_DIMENSIONS = new Set();
const STATUS_NOT_FOUND = "404";
const STATUS_FORBIDDEN = "403";
const b64 = "base64";

function matchUri(uri) {
  const match = uri.match(DIMENSIONS_REGEX);
  if (!match) return null;
  const format = match[6];
  return {
    prefix: match[1],
    dimensions: match[2],
    width: parseInt(match[3], 10),
    height: parseInt(match[4], 10),
    filename: `${match[5]}.${format}`,
    contentType: `image/${format}`,
    format
  };
}

exports.handler = async (event, context, callback) => {
  const response = event.Records[0].cf.response;

  if (response.status === STATUS_NOT_FOUND) {
    const request = event.Records[0].cf.request;
    const match = matchUri(request.uri);

    if (match) {
      const {
        prefix,
        width,
        height,
        filename,
        contentType,
        format,
        dimensions
      } = match;

      if (ALLOWED_DIMENSIONS.size > 0 && !ALLOWED_DIMENSIONS.has(dimensions)) {
        callback(null, {
          statusCode: STATUS_FORBIDDEN,
          headers: {},
          body: ""
        });
        return;
      }

      const originalKey = `${prefix}/${filename}`;
      const resizedKey = `${prefix}/${dimensions}/${filename}`;

      const data = await S3.getObject({
        Bucket: BUCKET,
        Key: originalKey
      })
        .promise()
        .catch(err =>
          console.log("Exception while reading source image :%j", err)
        );

      const buffer = await Sharp(data.Body)
        .resize(width, height)
        .toFormat(format.toLowerCase())
        .toBuffer();

      S3.putObject({
        Body: buffer,
        Bucket: BUCKET,
        ContentType: contentType,
        CacheControl: "max-age=31536000",
        Key: resizedKey,
        StorageClass: "STANDARD"
      })
        .promise()
        .catch(() => {
          console.log("Exception while writing resized image to bucket");
        });

      response.status = 200;
      response.body = buffer.toString(b64);
      response.bodyEncoding = b64;
      response.headers["content-type"] = [
        { key: "Content-Type", value: contentType }
      ];
      callback(null, response);
      return;
    }
  }
  callback(null, response);
};
