import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdTrackChanges, MdSearch } from 'react-icons/md';
import '../styles/track.css';

const TrackPage = () => {
  const [searchEmail, setSearchEmail] = useState('');
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchEmail.trim()) {
      setError('Please enter an email address');
      return;
    }

    setLoading(true);
    setError('');
    setContributions(null);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch(`http://localhost:8000/api/v1/contributions/?email=${searchEmail}`);
      
      if (response.ok) {
        const data = await response.json();
        setContributions(data);
      } else if (response.status === 404) {
        setError('No contributions found for this email address');
      } else {
        setError('Failed to fetch contributions. Please try again.');
      }
    } catch (err) {
      setError('Error connecting to server. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-container">
      <div className="track-card">
        <Link to="/" className="back-button">
          <MdArrowBack /> Back to Home
        </Link>

        <div className="track-header">
          <div className="track-icon">
            <MdTrackChanges />
          </div>
          <h1>Track Your Contributions</h1>
          <p>View all your support and prayer warrior registration history</p>
        </div>

        <div className="track-content">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-group">
              <label htmlFor="email">Enter your email address:</label>
              <div className="search-input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="search-input"
                />
                <button type="submit" className="search-button" disabled={loading}>
                  <MdSearch /> {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {contributions && (
            <div className="contributions-section">
              <h2>Your Contributions</h2>
              
              <div className="summary-cards">
                <div className="summary-card">
                  <h3>Total Contributions</h3>
                  <p className="amount">KES {contributions.total_amount || '0'}</p>
                </div>
                <div className="summary-card">
                  <h3>Number of Transactions</h3>
                  <p className="count">{contributions.transaction_count || '0'}</p>
                </div>
                <div className="summary-card">
                  <h3>Registration Status</h3>
                  <p className="status">{contributions.is_registered ? 'Registered' : 'Not Registered'}</p>
                </div>
              </div>

              {contributions.transactions && contributions.transactions.length > 0 ? (
                <div className="transactions-list">
                  <h3>Transaction History</h3>
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount (KES)</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contributions.transactions.map((transaction, index) => (
                        <tr key={index}>
                          <td>{new Date(transaction.date).toLocaleDateString()}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.type}</td>
                          <td className={`status-${transaction.status.toLowerCase()}`}>
                            {transaction.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-transactions">
                  <p>No transactions found for this email.</p>
                </div>
              )}
            </div>
          )}

          {!contributions && !error && (
            <div className="info-message">
              <p>📧 Enter your email address above to view your contributions and registration history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackPage;
