# Resize Lambda@Edge

Written following excellent [blog post][resizing-blog-post] from AWS team.

## Running locally

Lambda can be tested locally using [aws-sam-cli][aws-sam-cli].

```sh
sam local invoke ResizeLambda -e event_file.json
```

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

```sh
aws lambda update-function-code --function-name ResizeLambda --zip-file fileb://lambda.zip  --profile YourProfileWithPermissions
```

[update-lambda]: https://docs.aws.amazon.com/cli/latest/reference/lambda/update-function-code.html
[resizing-blog-post]: https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/
[aws-sam-cli]: https://github.com/awslabs/aws-sam-cli
