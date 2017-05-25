# github-summarizer

`github-summarizer` loads up all open issues from a given Github repository, showing them and all of their comments in a single view. You can put in a Github username and personal access token (from Settings -> Personal access tokens) to view your private repositories. (It will work without a username and access token, but only for public repositories.)

The app puts retrieved issues and comments in a temporary cache (not preserved across page loads), and saves the last loaded repo and your username and access token in long-term cache in browser local storage. No data is ever sent to a server outside of Github.

To see it in action, visit [the demo page](https://piano-tuner-bird-34226.netlify.com/).

## Running locally

* Have Yarn installed ([the Yarn install page](https://yarnpkg.com/en/docs/install) or `npm install -g yarn`)
* `yarn run start`
* Open a browser to `http://localhost:3000`

## Building locally

* Have Yarn installed ([the Yarn install page](https://yarnpkg.com/en/docs/install) or `npm install -g yarn`)
* `yarn run build`

## Running tests (though there are no tests yet)

* Have Yarn installed ([the Yarn install page](https://yarnpkg.com/en/docs/install) or `npm install -g yarn`)
* `yarn run test`
