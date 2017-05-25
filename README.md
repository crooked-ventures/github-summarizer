## github-summarizer

`github-summarizer` loads up all open issues from a given Github repository, showing them and all of their comments in a single view. You can put in a Github username and personal access token (from Settings -> Personal access tokens) to view your private repositories. (It will work without a username and access token, but only for public repositories.)

The app puts retrieved issues and comments in a temporary cache (not preserved across page loads), and saves the last loaded repo and your username and access token in long-term cache in browser local storage. No data is ever sent to a server outside of Github.

To see it in action, visit [the demo page](https://piano-tuner-bird-34226.netlify.com/).
