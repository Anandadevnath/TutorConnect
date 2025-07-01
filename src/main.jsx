import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Root from './layouts/Root.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Error from './components/Error/Error.jsx';
import ForgotPassword from './components/Forgotpassword/Forgotpassword.jsx';
import About from './components/About/About.jsx';
import Loader from './components/loader.jsx';
import findtutor from './components/findtutor.jsx';
import Findtutordetails from './components/findtutordetails.jsx';
import bookedtutors from './components/bookedtutors.jsx';
import addtutor from './components/addtutor';
import mytutorials from './components/mytutorials';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'forgot-password',
        Component: ForgotPassword,
      },
      {
        path: 'findtutor',
        Component: findtutor,
      },
      {
        path: 'tutordetails/:id',
        Component: Findtutordetails,
      },
      {
        path: 'bookedtutors',
        Component: bookedtutors,
      },
      {
        path: 'addtutor',
        Component: addtutor,
      },
      {
        path: 'mytutorials',
        Component: mytutorials,
      },
      {
        path: '*',
        Component: Error,
      },
    ]
  },
]);

function AppWithLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-right" />
    <AuthProvider>
      <AppWithLoader />
    </AuthProvider>
  </StrictMode>,
)