import * as marked from 'marked'
import * as moment from 'moment'
import * as React from 'react'
import { Media } from 'reactstrap'
import GithubUser from '../types/github-user'

export interface Props {
  user: GithubUser
  datetime: string
  body: string
}

const Comment: React.StatelessComponent<Props> = ({ user, datetime, body }) => (
  <Media className='my-4'>
    <Media className='mr-3' left={true} href={user.html_url}>
      <img className='rounded' style={{ maxWidth: '4rem', maxHeight: '4rem' }} src={user.avatar_url} alt={user.login} />
    </Media>
    <Media body={true}>
      <Media heading={true}>
        {user.login} commented {moment(datetime).fromNow()} ({moment(datetime).format('YYYY-MM-DD')})
      </Media>

      <div dangerouslySetInnerHTML={{ __html: marked(body)}} />
    </Media>
  </Media>
)

export default Comment
