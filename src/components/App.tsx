import * as React from 'react'
import { Redirect, Route, Switch, match, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import AccessTokenInput from './AccessTokenInput'
import RepoInput from './RepoInput'
import View from './View'
import './App.css'
import { DEFAULT_INITIAL_REPO } from '../index'

export interface Props { }

interface ImplProps extends Props { }

const enhance = compose<ImplProps, Props>(
  withRouter
)

const App = enhance(() => (
  <div className='App container my-3'>
    <RepoInput />
    <AccessTokenInput />
    <Switch>
      <Route
        path='/:owner/:repo/(issues/:issueNumber)?'
        render={({ match }: { match: match<{owner: string, repo: string, issueNumber?: string}> }) => (
          <View
            owner={match.params.owner}
            repo={match.params.repo}
            issueNumber={match.params.issueNumber}
          />
        )}
      />
      <Redirect to={`/${DEFAULT_INITIAL_REPO}`} />
    </Switch>
  </div>
))

export default App
