import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import useAuth from '../../../hooks/useAuth';

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const [sidebarActive, setSidebarActive] = useState(true);

  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Cambia el valor según el tamaño deseado
      if (window.innerWidth <= 1024) {
        setSidebarActive(false);
      } else {
        setSidebarActive(true);
      }
    };

    handleResize(); // Llama a la función al principio para establecer el estado inicial
    window.addEventListener('resize', handleResize); // Agrega el event listener

    return () => {
      window.removeEventListener('resize', handleResize); // Remueve el event listener en el cleanup
    };
  }, []);

  const handleLinkClick = () => {
    // Oculta el sidebar cuando se hace clic en un enlace dentro del sidebar
    if (isMobile) {
      setSidebarActive(false);
    }
  };

  return (
    <>
      <div id="wrapper">
        <div id="main">
          <div className="inner">
            <Header />
            {auth._id ? <Outlet /> : <Navigate to="/publicaciones" />}
          </div>
        </div>

        <div id="sidebar" className={sidebarActive ? 'active' : 'inactive'}>
          <div className="inner">
            <Sidebar onLinkClick={handleLinkClick} />
            <Footer />
          </div>
          <Link to="#" className="toggle" onClick={toggleSidebar}>
            Toggle
          </Link>
        </div>
      </div>
    </>
  );
};
