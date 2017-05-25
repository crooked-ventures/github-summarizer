/// <reference path="../types/react-promise.d.ts" />

import * as moment from 'moment'
import * as React from 'react'
import Async, { Props as AsyncProps } from 'react-promise'
import { Badge, Card, CardBlock, CardHeader } from 'reactstrap'
import Comment from './Comment'
import Comments from './Comments'
import Labels from './Labels'
import Loading from './Loading'
import { getIssue } from '../github-api'
import GithubIssue from '../types/github-issue'

const AsyncGithubIssue = Async as { new (props: AsyncProps<GithubIssue>): Async<GithubIssue> }

export interface Props {
  owner: string
  repo: string
  issueNumber: number | string
  issue?: GithubIssue
}

const Issue: React.StatelessComponent<Props> = ({ owner, repo, issueNumber, issue }) => {
  if (typeof issueNumber === 'string') {
    issueNumber = parseInt(issueNumber, 10)
  }

  let issuePromise: Promise<GithubIssue>

  if (issue) {
    issuePromise = Promise.resolve(issue)
  } else {
    issuePromise = getIssue(owner!, repo!, issueNumber!)
  }

  return (
    <AsyncGithubIssue
      promise={issuePromise}
      pendingRender={<Loading />}
      then={(issue: GithubIssue) => (
        <Card className='my-5'>
          <CardHeader>
            <h3>
              <a href={issue.html_url} target='_blank'>
                {issue.title} <small className='text-muted'>#{issue.number}</small>
              </a>
            </h3>
            <ul className='list-inline mb-0'>
              <li className='list-inline-item' style={{ fontSize: '1.5em' }}>
                <Badge color={issue.state === 'open' ? 'success' : 'danger'}>
                  {issue.state}
                </Badge>
              </li>
              <li className='list-inline-item'>
                <Labels labels={issue.labels} />
              </li>
              <li className='list-inline-item'>
                {issue.user.login} opened this issue {moment(issue.created_at).fromNow()} ({moment(issue.created_at).format('YYYY-MM-DD')})
              </li>
              <li className='list-inline-item'>•</li>
              <li className='list-inline-item'>
                {issue.comments} comments
                </li>
            </ul>
          </CardHeader>
          <CardBlock className='py-0'>
            <Comment
              user={issue.user}
              datetime={issue.updated_at}
              body={issue.body}
            />
            <Comments
              owner={owner}
              repo={repo}
              issueNumber={issue.number}
            />
          </CardBlock>
        </Card>
      )}
      catch={err => <text>Error while loading issues: {err}</text>}
    />
  )
}

export default Issue
