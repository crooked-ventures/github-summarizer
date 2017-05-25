import * as React from 'react'
import Label from './Label'
import GithubLabel from '../types/github-label'

export interface Props {
  labels: GithubLabel[]
}

const Labels: React.StatelessComponent<Props> = ({ labels }) => (
  <ul className='list-inline'>
    {labels.map((label, i) => (
      <li key={i} className='list-inline-item'>
        <Label label={label} />
      </li>
    ))}
  </ul>
)

export default Labels
