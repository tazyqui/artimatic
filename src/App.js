import './App.css';
import React from 'react';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import Sketch from './pages/Sketch';
import Home from './pages/Home';
import SideBar from './animation/SideBar';

const Layout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/sketch',
        element: <Sketch />,
      }
    ]
      }
])

function App() {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
