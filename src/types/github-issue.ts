import GithubLabel from './github-label'
import GithubMilestone from './github-milestone'
import GithubRepository from './github-repository'
import GithubUser from './github-user'

export interface GithubIssue {
  'id': number
  'url': string
  'repository_url': string
  'labels_url': string
  'comments_url': string
  'events_url': string
  'html_url': string
  'number': number
  'state': 'open' | 'closed'
  'title': string
  'body': string
  'user': GithubUser
  'labels': GithubLabel[]
  'assignee': GithubUser
  'milestone': GithubMilestone
  'locked': boolean
  'comments': number
  'pull_request': {
    'url': string
    'html_url': string
    'diff_url': string
    'patch_url': string
  }
  'closed_at': null
  'created_at': string
  'updated_at': string
  'repository': GithubRepository
}

export default GithubIssue
