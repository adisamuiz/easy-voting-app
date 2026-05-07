import { createBrowserRouter } from 'react-router-dom';
import Home from './assets/pages/Home.jsx';
import VoterLogin from './assets/pages/VoterLogin.jsx';
import VotingPage from './assets/pages/VotingPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/voter-login/:electionId',
    Component: VoterLogin,
  },
  {
    path: '/voting',
    Component: VotingPage,
  }

]);