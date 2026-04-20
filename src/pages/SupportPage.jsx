import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack, MdMonetizationOn } from 'react-icons/md';
import '../styles/support.css';

const SupportPage = () => {
  const [supportAmount, setSupportAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);

  const predefinedAmounts = [10, 50, 100, 500, 1000];

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
    setSupportAmount(amount.toString());
  };

  const handleCustomAmount = (e) => {
    setSupportAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleSupport = () => {
    if (!supportAmount || supportAmount === '0') {
      alert('Please enter a valid support amount');
      return;
    }
    // TODO: Integrate with M-Pesa payment gateway
    alert(`Support amount: KES ${supportAmount} (Payment integration coming soon)`);
  };

  return (
    <div className="support-container">
      <div className="support-card">
        <Link to="/" className="back-button">
          <MdArrowBack /> Back to Home
        </Link>

        <div className="support-header">
          <div className="support-icon">
            <MdMonetizationOn />
          </div>
          <h1>Support Prayer Warriors</h1>
          <p>Your contribution helps us continue this important prayer movement</p>
        </div>

        <div className="support-content">
          <section className="amount-section">
            <h2>Select Support Amount (KES)</h2>
            <div className="amount-buttons">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  className={`amount-btn ${selectedAmount === amount ? 'active' : ''}`}
                  onClick={() => handleSelectAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="custom-amount">
              <label htmlFor="custom">Or enter custom amount:</label>
              <input
                id="custom"
                type="number"
                min="1"
                value={supportAmount}
                onChange={handleCustomAmount}
                placeholder="Enter amount in KES"
                className="custom-input"
              />
            </div>
          </section>

          <section className="benefits-section">
            <h2>Your Contribution Includes:</h2>
            <ul className="benefits-list">
              <li>Receipt of payment via M-Pesa</li>
              <li>Entry into our prayer warriors community</li>
              <li>Access to track your contributions</li>
              <li>Email updates on prayer events</li>
              <li>Certificate of appreciation</li>
            </ul>
          </section>

          <section className="payment-info">
            <h3>Payment Method</h3>
            <div className="mpesa-info">
              <p><strong>M-Pesa Till Number:</strong> 247247</p>
              <p><strong>Business Name:</strong> Prayer Warriors Portal</p>
              <p className="instructions">
                You can also pay directly via M-Pesa using the till number <strong>247247</strong>
              </p>
            </div>
          </section>

          <button 
            className="support-button" 
            onClick={handleSupport}
            disabled={!supportAmount || supportAmount === '0'}
          >
            Proceed to Payment - KES {supportAmount || '0'}
          </button>

          <div className="support-note">
            <p>💡 Thank you for your generous support. May God bless your giving abundantly!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
