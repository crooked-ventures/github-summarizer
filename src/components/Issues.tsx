/// <reference path="../types/react-promise.d.ts" />

import * as React from 'react'
import Async, { Props as AsyncProps } from 'react-promise'
import Issue from './Issue'
import Loading from './Loading'
import { getIssuesForRepo } from '../github-api'
import GithubIssue from '../types/github-issue'

const AsyncGithubIssues = Async as { new (props: AsyncProps<GithubIssue[]>): Async<GithubIssue[]> }

export interface Props {
  owner: string
  repo: string
}

const Issues: React.StatelessComponent<Props> = ({ owner, repo }) => (
  <AsyncGithubIssues
    promise={getIssuesForRepo(owner, repo)}
    pendingRender={<Loading />}
    then={issues => (
      <div>{issues.map((issue, i) => <Issue key={i} owner={owner} repo={repo} issueNumber={issue.number} issue={issue} />)}</div>
    )}
    catch={err => <text>Error while loading issues: {err}</text>}
  />
)

export default Issues
