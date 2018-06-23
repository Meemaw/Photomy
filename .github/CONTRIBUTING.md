# CONTRIBUTING

- [Getting Started](#getting-started)
  - [Fork, Clone & Install](#fork-clone--install)
  - [Commands](#commands)
  - [Continuous integration](#continuous-integration)

## Getting Started

To run react app make sure you have at least [Node.js v6][2] or docker installed:

```sh
node -v
v6.2.1

docker -v
Docker version 18.03.1-ce, build 9ee9f40
```

To run django server side make sure you have Python 3 installed or docker installed.

```sh
python3 --version

Python 3.6.4
```

### Fork, Clone & Install

Start by [forking Photomy][1] to your GitHub account. Then clone your fork and install dependencies:

```sh
pip install -r ./config/requirements.txt
cd frontend && yarn
```

> Note, `yarn` is used because `npm` has unfortunately become unreliable. Get it [here][3].

### Usage
> To be able to run this application locally you have to replace enrionment variables in `.env` file located in in [`/src/.env`][.env].

```javascript
AWS_ACCESS_KEY_ID="AWS_ACCESS_KEY_ID"
AWS_SECRET_ACCESS_KEY="AWS_SECRET_ACCESS_KEY"
DJANGO_SECRET_KEY="DJANGO_SECRET_KEY"
AWS_CLOUDFRONT_DOMAIN="AWS_CLOUDFRONT_DOMAIN"
TEST_AWS_CLOUDFRONT_DOMAIN="TEST_AWS_CLOUDFRONT_DOMAIN"
AWS_LAMBDA_SECRET_APP_KEY="AWS_LAMBDA_SECRET_APP_KEY"
AWS_LAMBDA_SECRET_APP_VALUE="AWS_LAMBDA_SECRET_APP_VALUE"
EMAIL_HOST_PASSWORD="EMAIL_HOST_PASSWORD"
EMAIL_HOST_USER="EMAIL_HOST_USER"
AWS_STORAGE_BUCKET_NAME="AWS_STORAGE_BUCKET_NAME"
TEST_AWS_STORAGE_BUCKET_NAME="TEST_AWS_STORAGE_BUCKET_NAME"
```


### Commands

#### Backend

> Those commands should be used in src/ folder.
> Note that docker uses postgres databse on port 5432. You might want to change that.

###### Local

```sh
python manage.py test --settings=photomy.settings.test --noinput          // tests django code
python manage.py runserver                                                // runs local django server
```

###### Docker

```sh
docker-compose build                                                      // build local docker images
docker-compose up                                                         // starts docker containers
```

#### Frontend

> Those commands should be used in frontend/ folder.

###### Local

```sh
yarn start                                // start the app
yarn build                                // build the app
yarn test                                 // test
yarn test-coverage                        // test with coverage
yarn lint                                 // runs eslint and prettier report
yarn lint-eslint                          // runs eslint report
yarn lint-prettier                        // runs prettier report
yarn prettier                             // runs prettier to rewrite all unformatted filed
gulp setDev                               // sets env variables for local development
```

###### Docker

```sh
docker build . -t react:app                                                            // build the react docker image
docker run -it -p 3000:3000 react:app                                                  // runs react app on port 3000
docker container run -it -p 3000:3000 -p 35729:35729 -v $(pwd):/app react:app          // runs react app with hot realoding
docker container run -it -v $(pwd):/app react:app test                                 // runs tests
```

### Continuous integration

Continuous integration is configured via [Travis][4] where you can check if tests and build is passing.
Code coverage is reported to [codecov][5].

[1]: https://github.com/Meemaw/Photomy#fork-destination-box
[2]: https://nodejs.org/
[3]: https://yarnpkg.com/en/docs/getting-started
[4]: https://travis-ci.org/Meemaw/Photomy
[5]: https://codecov.io/gh/Meemaw/Photomy
[.env]: https://github.com/Meemaw/Photomy/blob/master/src/.env
[cdn]: https://en.wikipedia.org/wiki/Content_delivery_network
