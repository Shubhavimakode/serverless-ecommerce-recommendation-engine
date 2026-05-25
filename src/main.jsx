import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from 'react-oidc-context'

const cognitoAuthConfig = {
  authority:
    'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_dNf4OHo54',

  client_id:
    'is0hu6bg5s0bde1rcr0k5j1lk',

  redirect_uri:
    window.location.origin,

  response_type: 'code',

  scope:
    'openid email phone'
}

ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
)