CONTRIBUTING
============

- [Getting Started](#getting-started)
  - [Fork, Clone & Install](#fork-clone--install)
  - [Commands](#commands)
  - [Continuous integration](#continuous-integration)

## Getting Started

To run react app make sure you have at least [Node.js v6][2]:

```sh
node -v

v6.2.1
```

To run django server side make sure you have Python 3 installed.

```sh
python3 --version

Python 3.6.4
```

### Fork, Clone & Install

Start by [forking Photomy][1] to your GitHub account.  Then clone your fork and install dependencies:

```sh
pip install -r ./config/requirements.txt
cd frontend && yarn
```

>Note, `yarn` is used because `npm` has unfortunately become unreliable.  Get it [here][3].




### Commands


#### Backend

>Those commands should be used in src/ folder.
>Note that docker uses postgres databse on port 5432. You might want to change that.

```sh
python manage.py test --settings=photomy.settings.test --noinput          // tests django code
python manage.py runserver                                                // runs local django server
docker-compose build                                                      // build local docker images
docker-compose up                                                         // starts docker containers
```

#### Frontend

>Those commands should be used in frontend/ folder.

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

### Continuous integration

Continuous integration is configured via [Travis][4] where you can check if tests and build is passing.
Code coverage is reported to [codecov][5].


[1]: https://github.com/Meemaw/Photomy#fork-destination-box
[2]: https://nodejs.org/
[3]: https://yarnpkg.com/en/docs/getting-started
[4]: https://travis-ci.org/Meemaw/Photomy
[5]: https://codecov.io/gh/Meemaw/Photomy
