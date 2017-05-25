/// <reference path="../types/react-promise.d.ts" />

import * as React from 'react'
import Async, { Props as AsyncProps } from 'react-promise'
import Comment from './Comment'
import Loading from './Loading'
import { getCommentsForIssue } from '../github-api'
import GithubComment from '../types/github-comment'

const AsyncGithubComments = Async as { new (props: AsyncProps<GithubComment[]>): Async<GithubComment[]> }

export interface Props {
  owner: string
  repo: string
  issueNumber: string | number
}

const Comments: React.StatelessComponent<Props> = ({ owner, repo, issueNumber }) => (
  <AsyncGithubComments
    promise={getCommentsForIssue(owner, repo, issueNumber)}
    pendingRender={<Loading />}
    then={comments => (
      <div>
        {comments.map((comment, i) => (
          <Comment
            key={i}
            user={comment.user}
            datetime={comment.created_at}
            body={comment.body}
          />
        ))}
      </div>
    )}
    catch={err => <text>Error while loading issues: {err}</text>}
  />
)

export default Comments
