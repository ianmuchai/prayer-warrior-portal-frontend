import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="header-content">
          <h1>NATIONAL PRAYER WARRIORS</h1>
          <h2>INTERDENOMINATIONAL TEAM</h2>
          <p className="tagline">24 HOURS NATION HEALING PRAYER MEETING</p>
        </div>
      </div>

      <div className="home-content">
        <section className="hero-section">
          <h3>Welcome to Prayer Warriors Portal</h3>
          <p>
            Unite in intercession for our nation's healing, restoration, and spiritual renewal.
          </p>
          <Link to="/register" className="primary-button">
            Register & Support
          </Link>
        </section>

        <section className="info-section">
          <div className="info-card">
            <h4>📋 Register</h4>
            <p>Join our community of intercessors and become part of the prayer movement.</p>
          </div>
          <div className="info-card">
            <h4>❤️ Support</h4>
            <p>Support Prayer Warriors with a KES 10 contribution per registration.</p>
          </div>
          <div className="info-card">
            <h4>👁️ Track</h4>
            <p>View your contributions and see the impact of your support.</p>
          </div>
        </section>

        <section className="event-section">
          <h3>24-Hour Prayer Meeting</h3>
          <div className="event-details">
            <p><strong>Dates:</strong> 1st - 2nd May 2026</p>
            <p><strong>Venue:</strong> STEM Hotel Grounds, Nakuru</p>
            <p><strong>Duration:</strong> 24 Hours (8 AM - 8 AM)</p>
            <p><strong>For Support:</strong> MPESA - 247247</p>
            <p><strong>Contact:</strong> +254 723 159 627</p>
          </div>
        </section>
      </div>

      <footer className="home-footer">
        <p>© 2026 National Prayer Warriors. All rights reserved.</p>
        <p>Interdenominational Team | +254 723 159 627</p>
      </footer>
    </div>
  );
};

export default Home;
