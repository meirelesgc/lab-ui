import App from './App.jsx'

import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Document from './routes/Document.jsx'
import Patient from './routes/Patient.jsx'
import Parameter from './routes/Parameter.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      path: '/document',
      element: <Document />
    }, {
      path: '/patient',
      element: <Patient />
    }, {
      path: '/parameter',
      element: <Parameter />
    }]
  }
])

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
