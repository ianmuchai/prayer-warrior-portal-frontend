import React, { useState } from 'react';
import axios from 'axios';
import '../styles/registration.css';

const API_URL = 'http://localhost:8000/api/v1';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    wants_to_support: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [registrationData, setRegistrationData] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${API_URL}/registrations/`,
        formData
      );

      setRegistrationData(response.data);
      setMessageType('success');
      setMessage('✓ Registration successful!');

      setFormData({
        name: '',
        email: '',
        phone_number: '',
        wants_to_support: false,
      });
    } catch (error) {
      setMessageType('error');
      setMessage(
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h1>PRAYER WARRIOR REGISTRATION</h1>
          <h2>Interdenominational Team</h2>
        </div>

        {!registrationData ? (
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email (optional)"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">Phone Number *</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
                placeholder="e.g. 254712345678"
                className="form-input"
              />
            </div>

            <div className="form-group support-group">
              <label>Would you like to support Prayer Warriors?</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="wants_to_support"
                  name="wants_to_support"
                  checked={formData.wants_to_support}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <label htmlFor="wants_to_support" className="checkbox-label">
                  Yes, deduct KES 10 from my account
                </label>
              </div>
              {formData.wants_to_support && (
                <div className="support-info">
                  ✓ KES 10 will be deducted to support Prayer Warriors ministry
                </div>
              )}
            </div>

            {message && (
              <div className={`message message-${messageType}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? 'Processing...' : 'Register Now'}
            </button>
          </form>
        ) : (
          <div className="success-view">
            <div className="success-message">
              <h2>✓ Registration Complete!</h2>
              <p className="welcome">Welcome, {registrationData.name}!</p>
            </div>

            <div className="registration-details">
              <h3>Your Registration Details</h3>
              <div className="detail-item">
                <span className="label">Name:</span>
                <span className="value">{registrationData.name}</span>
              </div>
              {registrationData.email && (
                <div className="detail-item">
                  <span className="label">Email:</span>
                  <span className="value">{registrationData.email}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="label">Phone:</span>
                <span className="value">{registrationData.phone_number}</span>
              </div>
              <div className="detail-item">
                <span className="label">Support Status:</span>
                <span className="value">
                  {registrationData.wants_to_support ? '✓ Active Supporter' : 'Registered'}
                </span>
              </div>
            </div>

            {registrationData.wants_to_support && registrationData.transactions?.length > 0 && (
              <div className="transaction-section">
                <h3>Your Support Contribution</h3>
                {registrationData.transactions.map((transaction) => (
                  <div key={transaction.id} className="transaction-card">
                    <div className="transaction-item">
                      <span className="label">Amount:</span>
                      <span className="value">KES {parseFloat(transaction.amount).toFixed(2)}</span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Status:</span>
                      <span className={`status ${transaction.status}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Reference:</span>
                      <span className="value">{transaction.reference_code}</span>
                    </div>
                    <div className="transaction-item">
                      <span className="label">Date:</span>
                      <span className="value">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setRegistrationData(null)}
              className="register-another-button"
            >
              Register Another Person
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
