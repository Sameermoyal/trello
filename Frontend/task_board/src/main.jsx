import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SidebarProvider from './component/ContextApi/SidebarProvider.jsx'
import UserEmailProvider from './component/ContextApi/UserEmailProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <SidebarProvider>
  <UserEmailProvider>
  <BrowserRouter> <App /></BrowserRouter>
  </UserEmailProvider>
  </SidebarProvider>
  </StrictMode>,
)
