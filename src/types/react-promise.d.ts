declare module 'react-promise' {
  import * as React from 'react'

  export interface Props<T> {
    promise?: Promise<T>
    before?: (handlePromise: () => void) => React.ReactElement<any>
    then?: (value: T) => React.ReactElement<any>
    catch?: (err: any) => React.ReactElement<any>
    pendingRender?: React.ReactNode
  }

  export interface State {
    started: boolean
    resolved: boolean
    finished: boolean
    rejected: boolean
  }

  class Async<T> extends React.Component<Props<T>, State> { }

  export default Async
}