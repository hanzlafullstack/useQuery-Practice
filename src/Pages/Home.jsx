import React from 'react'
import HeaderLayout from '../layout/HeaderLayout'
import FooterLayout from '../layout/FooterLayout'
import HomeContent from './HomeContent'
import { Outlet } from 'react-router-dom'


// css import
import './PagesStyling/pageStyling.css'

const Home = () => {
  return (
    <div className="home-page">
      <HeaderLayout />
      <div className="home-child">
        <Outlet />
      </div>
      {/* Here The changable Content Occurs  */}
      <FooterLayout />
    </div>
  );
}

export default Home