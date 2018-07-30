# CONTRIBUTING

## Building

> resize-lambda uses sharp which has to be built on the same architecture/platform as used at run time.

```sh
docker build . -t resize-lambda
docker run --rm -ti -v ${PWD}:/project resize-lambda /bin/bash -c "cd project && npm install"
```

## Zip

```sh
zip -r9 lambda.zip node_modules index.js
```

## Uploading

You can upload zip thorugh AWS Lambda user interface or with [aws-cli][update-lambda].

[update-lambda]: https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html
