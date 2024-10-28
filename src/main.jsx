import App from './App.jsx'
import ParamPage from './routes/Param.jsx'
import PatientPage from './routes/Patient.jsx'
import DocumentPage from './routes/Document.jsx'

import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import DocTable from './components/documents/Table.jsx'
import InspectDocument from './components/documents/InspectDocument.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{
      path: 'document',
      element: <DocumentPage />,
      children: [{
        path: '',
        element: <DocTable />
      }, {
        path: ':id',
        element: <InspectDocument />
      }]
    }, {
      path: 'patient',
      element: <PatientPage />
    }, {
      path: 'param',
      element: <ParamPage />
    }]
  }]
)

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
