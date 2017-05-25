import * as React from 'react'
import GithubLabel from '../types/github-label'

export interface Props {
  label: GithubLabel
}

const Label: React.StatelessComponent<Props> = ({ label }) => (
  <span className='badge' style={{backgroundColor: `#${label.color}`}}>
    {label.name}
  </span>
)

export default Label
