import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './new/RightSidebar';
import Header2 from './Header2';

const Layout: React.FC = () => {

  const token = localStorage.getItem("token");
  return (
    <div className="flex flex-col min-h-screen">
      {!token ? <Header2/> : <Header/>}
      
      <main className="flex-grow">
        <Outlet />
      </main>
      <Sidebar/>
      <Footer />
    </div>
  );
};

export default Layout;