# Running tests locally

## Installation

```
$ cd frontend/e2etests
$ yarn install
```

## Running

```
$ cd frontend
$ BROWSER=none yarn start
```

Open another terminal:

```
$ cd frontend/e2etests
$ yarn test
```

Running against production website:

```
$ cd frontend/e2etests
$ yarn test:prod
```
