import * as localforage from 'localforage'
import { DEFAULT_INITIAL_REPO } from './index'

localforage.config({
  name: 'github-summarizer'
})

export const getAccessToken = async (): Promise<string> => {
  return localforage.getItem<string>('accessToken')
    .then(accessToken => {
      if (!accessToken) {
        throw new Error(`accessToken not a value: ${accessToken}`)
      }

      console.info('Token successfully retrieved:', accessToken)
      return accessToken
    })
    .catch(err => {
      console.debug('Access token not found in storage:', err)
      return ''
    })
}

export const setAccessToken = async (token: string): Promise<string> => {
  return localforage.setItem<string>('accessToken', token)
    .then(token => {
      console.info('Token successfully set:', token)
      return token
    })
    .catch(err => {
      console.debug('Access token not set in storage:', err)
      return ''
    })
}

export const getUsername = async (): Promise<string> => {
  return localforage.getItem<string>('username')
    .then(username => {
      if (!username) {
        throw new Error(`username not a value: ${username}`)
      }

      console.info('Username successfully retrieved:', username)
      return username
    })
    .catch(err => {
      console.debug('Username not found in storage:', err)
      return ''
    })
}

export const setUsername = async (username: string): Promise<string> => {
  return localforage.setItem<string>('username', username)
    .then(username => {
      console.info('Username successfully set:', username)
      return username
    })
    .catch(err => {
      console.debug('Username not set in storage:', err)
      return ''
    })
}

export const getLastRepo = async (): Promise<string> => {
  return localforage.getItem<string>('lastRepo')
    .then(lastRepo => {
      if (!lastRepo) {
        throw new Error(`lastRepo not a value: ${lastRepo}`)
      }

      console.info('Last repo successfully retrieved:', lastRepo)
      return lastRepo
    })
    .catch(err => {
      console.debug('Last repo not found in storage:', err)
      return DEFAULT_INITIAL_REPO
    })
}

export const setLastRepo = async (lastRepo: string): Promise<string> => {
  return localforage.setItem<string>('lastRepo', lastRepo)
    .then(lastRepo => {
      console.log('Last repo successfully set:', lastRepo)
      return lastRepo
    })
    .catch(err => {
      console.debug('Last repo not set in storage:', err)
      return ''
    })
}
