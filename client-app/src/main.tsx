import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App'
import {RouterProvider} from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
import { router, routes } from './app/router/Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
