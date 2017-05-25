import GithubComment from './types/github-comment'
import GithubIssue from './types/github-issue'
import { getAccessToken, getUsername } from './storage'

const GITHUB_HEADERS_MATCH = /^.*?<(.*?)>; rel="next".*?/

interface CommentsStorage {
  [ownerAndRepo: string]: {
    [issueNumber: number]: GithubComment[]
  }
}

interface IssuesStorage {
  [ownerAndRepo: string]: GithubIssue[]
}

let commentsStorage: CommentsStorage = {}
let issuesStorage: IssuesStorage = {}

export const getIssuesForRepo = async (owner: string, repo: string): Promise<GithubIssue[]> => {
  console.info('Getting issues for repo:', owner, repo)

  if (!issuesStorage[`${owner}/${repo}`]) {
    console.info('Issues not found in temporary storage.')
    issuesStorage[`${owner}/${repo}`] = await getIssuesForUrl(`https://api.github.com/repos/${owner}/${repo}/issues?page=0`)
    console.info('Added issues to temporary storage:', issuesStorage[`${owner}/${repo}`])
  }

  return Promise.resolve(issuesStorage[`${owner}/${repo}`])
}

export const getIssue = async (owner: string, repo: string, issueNumber: string | number): Promise<GithubIssue> => {
  if (typeof issueNumber === 'string') {
    issueNumber = parseInt(issueNumber, 10)
  }

  const issues = await getIssuesForRepo(owner, repo)
  const thisIssue = issues.filter(issue => issue.number === issueNumber).shift()

  if (!thisIssue) {
    throw new Error('Issue number not found')
  }

  return thisIssue
}

export const getIssuesForUrl = async (url: string): Promise<GithubIssue[]> => {
  const [accessToken, username] = await Promise.all([getAccessToken(), getUsername()])
  const options = accessToken || username ? {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${accessToken}`)
    }
  } : {}
  const thisFetch = fetch(url, options)
  const res = await thisFetch
  let issuesSoFar = await (res.json() as Promise<GithubIssue[]>)

  const linkHeaders = GITHUB_HEADERS_MATCH.exec(res.headers.get('Link') || '')
  if (linkHeaders) {
    const nextLink = linkHeaders[1]
    if (nextLink) {
      console.info('nextLink found:', nextLink)
      const additionalIssues = await getIssuesForUrl(nextLink)
      issuesSoFar = issuesSoFar.concat(additionalIssues)
    }
  }

  // Filter out pull requests
  console.info('Filtering out pull reqests.')
  issuesSoFar = issuesSoFar.filter(issue => !issue.pull_request)

  console.info('Returning issues:', issuesSoFar)
  return issuesSoFar
}

export const getCommentsForIssue = async (owner: string, repo: string, issueNumber: string | number): Promise<GithubComment[]> => {
  if (typeof issueNumber === 'string') {
    issueNumber = parseInt(issueNumber, 10)
  }
  console.info('Getting comments for issue:', owner, repo, issueNumber)

  commentsStorage[`${owner}/${repo}`] = commentsStorage[`${owner}/${repo}`] || {}
  if (!commentsStorage[`${owner}/${repo}`][issueNumber]) {
    console.info('Comments not found in temporary storage.')
    commentsStorage[`${owner}/${repo}`][issueNumber] = await getCommentsForUrl(`https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}/comments`)
    console.info('Added comments to temporary storage:', commentsStorage[`${owner}/${repo}`][issueNumber])
  }

  return Promise.resolve(commentsStorage[`${owner}/${repo}`][issueNumber])
}

export const getCommentsForUrl = async (url: string): Promise<GithubComment[]> => {
  const [accessToken, username] = await Promise.all([getAccessToken(), getUsername()])
  const options = accessToken || username ? {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${accessToken}`)
    }
  } : {}
  const res = await fetch(url, options)

  return res.json() as Promise<GithubComment[]>
}
