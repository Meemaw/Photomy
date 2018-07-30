<!-- Name -->

<h1 align="center">
  <a href="https://www.photomy.si/">Photomy</a>
</h1>

<!-- Badges -->

<p align="center">

  <a href="https://travis-ci.org/Meemaw/Photomy">
    <img
       src="https://api.travis-ci.org/Meemaw/Photomy.svg?branch=master" />
  </a>

   <a href="https://codecov.io/gh/Meemaw/Photomy">
    <img src="https://codecov.io/gh/Meemaw/Photomy/branch/master/graph/badge.svg" />
  </a>

  <a href="http://makeapullrequest.com">
    <img
         src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" />
  </a>

  <a href="https://github.com/Meemaw/Photomy/blob/master/LICENSE">
    <img src="https://camo.githubusercontent.com/890acbdcb87868b382af9a4b1fac507b9659d9bf/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667" />
  </a>
      <a href="https://codeclimate.com/github/Meemaw/Photomy/maintainability"><img src="https://api.codeclimate.com/v1/badges/3c3debfc2b314dd16d9b/maintainability" /></a>

  <a href="https://github.com/Meemaw/Photomy#contributors">
    <img src="https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square" />
  </a>

</span>

### [About][about]

Photomy is scalable, secure and private photo gallery that recognizes people in your images and groups them together.

### [Technologies][technologies]

- [React][react] for frontend interface
- [Django][django] for backend REST API
- [Celery][celery] as distributed task queue
- [Redis][redis] as message broker
- [Amazon CloudFront][cloudfront] as content delivery network
- [Amazon S3][s3] for storage
- [Lambda@Edge][lambda@edge] for CDN authentication and [image resizing][image-resizing]
- [dlib][dlib] for face recognition

### [Contributing][contributing]

Our [CONTRIBUTING.md][contributing] is a step-by-step setup and development guide.

### [Contributors][contributors]

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/8524109?s=460&v=4" width="100px;"/><br /><sub><b>Meemaw</b></sub>](https://github.com/Meemaw)<br />[💻](https://github.com/Meemaw/Photomy/commits?author=Meemaw "Code") [📖](https://github.com/Meemaw/Photomy/commits?author=Meemaw "Documentation") [🚇](#infra-stereobooster "Infrastructure (Hosting, Build-Tools, etc)") [⚠️](https://github.com/Meemaw/Photomy/commits?author=Meemaw "Tests") |
[<img src="https://avatars1.githubusercontent.com/u/1046834?s=460&v=4" width="100px;"/><br /><sub><b>snuderl</b></sub>](https://github.com/snuderl)<br />[⚠️](https://github.com/Meemaw/Photomy/commits?author=snuderl "Tests") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

[contributing]: https://github.com/Meemaw/Photomy/blob/master/.github/CONTRIBUTING.md
[all-contributors]: https://github.com/kentcdodds/all-contributors
[emojis]: https://github.com/kentcdodds/all-contributors#emoji-key
[contributors]: https://github.com/Meemaw/Photomy#contributors
[about]: https://github.com/Meemaw/Photomy#about
[cdn]: https://en.wikipedia.org/wiki/Content_delivery_network
[technologies]: https://github.com/Meemaw/Photomy#technologies
[dlib]: http://dlib.net/
[cloudfront]: https://aws.amazon.com/cloudfront/
[s3]: https://aws.amazon.com/s3/
[lambda@edge]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-edge.html
[django]: https://www.djangoproject.com/
[react]: https://reactjs.org/
[celery]: http://www.celeryproject.org/
[redis]: https://redis.io/
[image-resizing]: https://aws.amazon.com/blogs/networking-and-content-delivery/resizing-images-with-amazon-cloudfront-lambdaedge-aws-cdn-blog/
