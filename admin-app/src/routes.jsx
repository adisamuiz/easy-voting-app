import { createBrowserRouter } from 'react-router-dom';
import AdminLogin from './assets/pages/AdminLogin.jsx'
import DashBoard from './assets/pages/Dashboard.jsx'
import Voters from './assets/pages/Voters.jsx'
import Candidates from './assets/pages/Candidates.jsx'
import Results from './assets/pages/Results.jsx'
import Elections from './assets/pages/Elections.jsx'
import Settings from './assets/pages/Settings.jsx'
export const router = createBrowserRouter([
  {
    path: '/',
    Component: AdminLogin,
  },
  {
    path: '/dashboard',
    Component: DashBoard,
  },
  {
    path: '/voters',
    Component: Voters,
  }, 
  {
    path: '/candidates',
    Component: Candidates,
  },
  {
    path: '/results',
    Component: Results,
  },
  {
    path: '/elections',
    Component: Elections,
  },
  {
    path: '/settings',
    Component: Settings,
  }
]);
