import GithubUser from './github-user'

export interface GithubComment {
  id: number
  url: string
  html_url: string
  body: string
  user: GithubUser
  created_at: string
  updated_at: string
}

export default GithubComment
