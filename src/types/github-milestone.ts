import GithubUser from './github-user'

export interface GithubMilestone {
  'url': string
  'html_url': string
  'labels_url': string
  'id': number
  'number': number
  'state': 'open' | 'closed'
  'title': string
  'description': string
  'creator': GithubUser
  'open_issues': number
  'closed_issues': number
  'created_at': string
  'updated_at': string
  'closed_at': string
  'due_on': string
}

export default GithubMilestone
