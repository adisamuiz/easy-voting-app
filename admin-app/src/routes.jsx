import { createBrowserRouter } from 'react-router-dom';
import AdminLogin from './assets/pages/AdminLogin.jsx'
import DashBoard from './assets/pages/Dashboard.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AdminLogin,
  },
  {
    path: '/dashboard',
    Component: DashBoard,
  }
]);
