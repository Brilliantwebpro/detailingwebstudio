import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { initInteractions } from '../utils/interactions';
import logo from '../assets/images/Detailing Web Logo new.png';

const linkClass = ({ isActive }) => (isActive ? 'active-nav' : '');

export default function Layout({ children }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initInteractions();
    return cleanup;
  }, [location.pathname]);

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <NavLink className="logo" to="/">
            <img src={logo} alt="Detailing Web Studio" className="logo-img" />
            <span className="logo-text">Detailing <span>Web Studio</span></span>
          </NavLink>
          <button className="nav-toggle" data-nav-toggle aria-label="Toggle menu">Menu</button>
          <nav className="main-nav" data-nav>
            <NavLink className={linkClass} to="/">Home</NavLink>
            <NavLink className={linkClass} to="/services">Services</NavLink>
            <NavLink className={linkClass} to="/demos">Demo Sites</NavLink>
            <NavLink className={linkClass} to="/about">About</NavLink>
            <NavLink className={linkClass} to="/contact">Request Demo</NavLink>
          </nav>
        </div>
      </header>

      {children}

      <NavLink className="btn btn-primary sticky-demo sticky-demo-left" to="/contact">Request Demo</NavLink>
      <div className="popup" data-exit-popup>
        <div className="popup-content">
          <h3>Before You Go: Free Demo Concept</h3>
          <p>Request a tailored homepage concept for your detailing niche and see how we would structure your premium lead flow.</p>
          <NavLink className="btn btn-primary" to="/contact">Claim Demo Concept</NavLink>
          <button className="btn btn-secondary" data-close-popup type="button">Close</button>
        </div>
      </div>
      <footer className="footer">
        <div className="container">Copyright 2026 Detailing Web Studio. Built for serious detailing brands.</div>
      </footer>
    </>
  );
}
