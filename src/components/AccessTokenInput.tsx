import { Action } from 'flux-standard-action'
import * as React from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { compose, lifecycle, pure, setDisplayName, withReducer } from 'recompose'
import { setAccessToken, setUsername, getAccessToken, getUsername } from '../storage'

const INITIAL_ACCESS_TOKEN = ''
const INITIAL_USERNAME = ''
const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN'
const SET_USERNAME = 'SET_USERNAME'

export interface Props { }

export interface State {
  accessToken: string
  username: string
}

interface ImplProps extends Props {
  state: State
  dispatch (action: Action<any>): void
}

const enhance = compose<ImplProps, Props>(
  setDisplayName('AccessTokenInput'),
  pure,
  withReducer('state', 'dispatch', (state: State, action: Action<any>): State => {
    switch (action.type) {
      case SET_ACCESS_TOKEN: return { ...state, accessToken: action.payload }
      case SET_USERNAME: return { ...state, username: action.payload }
      default: return state
    }
  }, {
    accessToken: INITIAL_ACCESS_TOKEN,
    username: INITIAL_USERNAME
  }),
  lifecycle({
    componentWillMount () {
      let self = this as React.Component<ImplProps, void>

      getAccessToken().then(accessToken => self.props.dispatch({
        type: SET_ACCESS_TOKEN,
        payload: accessToken
      })).catch(err => console.error('Error retrieving access token:', err))

      getUsername().then(username => self.props.dispatch({
        type: SET_USERNAME,
        payload: username
      })).catch(err => console.error('Error retrieving username:', err))
    }
  })
)

const AccessTokenInput = enhance(({ dispatch, state }) => (
  <Form
    className='row mt-3'
    inline={true}
    onSubmit={event => {
      event.preventDefault()
      console.info('Setting username and access token:', state)

      setAccessToken(state.accessToken).then(accessToken => dispatch({ type: SET_ACCESS_TOKEN, payload: accessToken }))
      setUsername(state.username).then(username => dispatch({ type: SET_USERNAME, payload: username }))
    }}
  >
    <FormGroup className='col-sm-5'>
      <Label className='col-sm-3' for='usernameInput'>Username</Label>
      <Input
        className='col-sm-9'
        type='text'
        name='usernameInput'
        id='usernameInput'
        value={state.username || ''}
        onChange={event => dispatch({ type: SET_USERNAME, payload: event.target.value })}
      />
    </FormGroup>

    <FormGroup className='col-sm-5'>
      <Label className='col-sm-3' for='accessTokenInput'>Auth Token</Label>
      <Input
        className='col-sm-9'
        type='text'
        name='accessTokenInput'
        id='accessTokenInput'
        value={state.accessToken || ''}
        onChange={event => dispatch({ type: SET_ACCESS_TOKEN, payload: event.target.value })}
      />
    </FormGroup>

    <FormGroup className='col-sm-2'>
      <Button block={true} color='primary' type='submit'>Set Values</Button>
    </FormGroup>
  </Form>
))

export default AccessTokenInput
