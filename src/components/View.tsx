import * as React from 'react'
import Issue from './Issue'
import Issues from './Issues'

export interface Props {
  owner: string
  repo: string
  issueNumber?: string
}

const View: React.StatelessComponent<Props> = ({ owner, repo, issueNumber }) => (
  <div>
    {issueNumber
    ? <Issue owner={owner} repo={repo} issueNumber={issueNumber || 0} />
    : <Issues owner={owner} repo={repo} />
    }
  </div>
)

export default View
