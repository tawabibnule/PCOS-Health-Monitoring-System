import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; {new Date().getFullYear()} OvaCare. All rights reserved.</p>
        <p className="footer-note">This is an MVP. All data is securely mocked.</p>
      </div>
    </footer>
  );
};

export default Footer;
