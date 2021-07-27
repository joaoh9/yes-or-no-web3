import React from 'react'
import ReactDOM from 'react-dom'
import { MoralisProvider } from 'react-moralis'
import './index.css'
import App from './App'
import settings from './config/settings'

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider appId={settings.moralistAppId} serverUrl={settings.moralisServerUrl}>
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
