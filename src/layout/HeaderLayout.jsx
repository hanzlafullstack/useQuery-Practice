import React from 'react'
import { NavLink } from 'react-router-dom'
import './LayoutStyling/LayoutStyling.css'
const HeaderLayout = () => {
  return (
    <header className='header'>
      <h1 className='header-heading'>hanzlafullstack</h1>
      <div className="header-links-box">
        <NavLink to="/" className="header-navlinks">Home</NavLink>
        <NavLink to="/about" className="header-navlinks">Posts</NavLink>
      </div>
    </header>
  )
}

export default HeaderLayout