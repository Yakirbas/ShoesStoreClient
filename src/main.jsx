import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Mycontextf } from './contexts/itemsContext'
import { UserContextf } from './contexts/userContext'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from "react-cookie";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CookiesProvider>
  <UserContextf>
  <Mycontextf>
    <App />
  </Mycontextf>
  </UserContextf>
  </CookiesProvider>
  </BrowserRouter>,
)
