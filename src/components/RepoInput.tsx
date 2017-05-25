import { Action } from 'flux-standard-action'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Button, Form, FormGroup, Input, InputGroup, InputGroupButton, Label } from 'reactstrap'
import { compose, lifecycle, pure, setDisplayName, withReducer } from 'recompose'
import { DEFAULT_INITIAL_REPO } from '../index'
import { setLastRepo, getLastRepo } from '../storage'

const SET_VALUE = 'SET_ACCESS_TOKEN'

export interface Props { }

export interface State {
  value: string
}

interface ImplProps extends Props, RouteComponentProps<any> {
  state: State
  dispatch (action: Action<any>): void
}

const enhance = compose<ImplProps, Props>(
  setDisplayName('AuthTokenInput'),
  pure,
  withReducer('state', 'dispatch', (state: State, action: Action<any>): State => {
    switch (action.type) {
      case SET_VALUE:
        if (action.payload[0] === '/') {
          return { ...state, value: action.payload.slice(1) }
        }

        return { ...state, value: action.payload }
      default: return state
    }
  }, {value: DEFAULT_INITIAL_REPO}),
  lifecycle({
    componentWillMount () {
      let self = this as React.Component<ImplProps, void>

      getLastRepo().then(lastRepo => self.props.dispatch({
        type: SET_VALUE,
        payload: lastRepo
      })).catch(err => console.error('Error retrieving last repo:', err))
    }
  }),
  withRouter
)

const RepoInput = enhance(({ dispatch, state, history }) => (
  <Form
    className='row'
    inline={true}
    onSubmit={event => {
      event.preventDefault()
      console.info('Setting repo:', state)

      setLastRepo(state.value)
      history.push('/' + state.value)
    }}
  >
    <FormGroup className='col-sm-12'>
      <Label className='col-sm-2' for='repoInput'>Repo</Label>
      <InputGroup className='col-sm-10'>
        <Input
          type='text'
          name='repoInput'
          id='repoInput'
          value={state.value}
          onChange={event => dispatch({type: SET_VALUE, payload: event.target.value})}
        />
        <InputGroupButton>
          <Button color='primary' type='submit'>Go</Button>
        </InputGroupButton>
      </InputGroup>
    </FormGroup>
  </Form>
))

export default RepoInput
