import App from './App.jsx'
import ParamPage from './routes/Param.jsx'
import PatientPage from './routes/Patient.jsx'
import DocumentPage from './routes/Document.jsx'
import DocumentView from './routes/DocumentView.jsx'

import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'document', element: <DocumentPage /> },
      { path: 'document/:document_id', element: <DocumentView /> },
      { path: 'patient', element: <PatientPage /> },
      { path: 'param', element: <ParamPage /> }
    ]
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
