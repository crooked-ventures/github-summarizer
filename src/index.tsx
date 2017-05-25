import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'whatwg-fetch'
import 'bootstrap/dist/css/bootstrap.css'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

export const DEFAULT_INITIAL_REPO = 'Microsoft/TypeScript-React-Starter'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
