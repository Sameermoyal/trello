import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import SidebarProvider from './component/ContextApi/SidebarProvider.jsx'
import UserEmailProvider from './component/ContextApi/UserEmailProvider.jsx'
import TemplateProvider from './component/ContextApi/TemplateProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <SidebarProvider>
  <UserEmailProvider>
  <TemplateProvider>
    <BrowserRouter> <App /></BrowserRouter>
    </TemplateProvider>
  </UserEmailProvider>
  </SidebarProvider>
  </StrictMode>,
)
