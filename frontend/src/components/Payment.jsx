import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './Payment.css';

// Initialize Stripe with the publishable key for payment processing
const stripePromise = loadStripe('pk_test_51RYr6GD3CmOIgK060ruLp277nbCFNWxewCBlYAkPIGLRZbtOFN9FKGDNjcagnynjWPoHyZEdg8WLGDRRZA866k0500xrAagngJ');

const Payment = () => {
  // Initialize navigation hook for redirecting after payment
  const navigate = useNavigate();

  // Function to clean amount string and extract number
  const cleanAmount = (amountStr) => {
    // Remove ₹ symbol and commas, then convert to number
    return parseFloat(amountStr.replace(/[₹,]/g, '')) || 0;
  };

  // State management for payment form data
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    plan: 'Premium',
    amount: '1999'
  });

  // State for handling loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load selected plan from localStorage when component mounts
  useEffect(() => {
    const selectedPlan = localStorage.getItem('selectedPlan');
    if (selectedPlan) {
      try {
        const { name, price } = JSON.parse(selectedPlan);
        setPaymentData(prev => ({
          ...prev,
          plan: name,
          amount: price.toString() // Ensure amount is stored as string
        }));
      } catch (err) {
        console.error('Error parsing selected plan:', err);
        setError('Invalid plan data');
      }
    }
  }, []);

  // Calculate total amount with tax
  const calculateTotal = () => {
    const amount = cleanAmount(paymentData.amount);
    const tax = amount * 0.18;
    return (amount + tax).toFixed(2);
  };

  // Calculate tax amount
  const calculateTax = () => {
    const amount = cleanAmount(paymentData.amount);
    return (amount * 0.18).toFixed(2);
  };

  // Handle input changes in the payment form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle payment form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Starting payment process...'); // Debug log
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create dummy order confirmation data
      const orderData = {
        orderId: 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        plan: paymentData.plan,
        amount: paymentData.amount,
        date: new Date().toLocaleDateString(),
        status: 'Success'
      };

      console.log('Generated order data:', orderData); // Debug log

      // Store order data in localStorage
      localStorage.setItem('orderConfirmation', JSON.stringify(orderData));
      console.log('Order data stored in localStorage'); // Debug log
      
      // Redirect to success page
      console.log('Redirecting to success page...'); // Debug log
      navigate('/success');
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred during payment');
    } finally {
      setLoading(false);
    }
  };

  // Format amount for display
  const formatAmount = (amount) => {
    return `₹${Number(amount).toLocaleString('en-IN')}`;
  };

  // Render the payment form and summary
  return (
    <div className="payment-container">
      <div className="payment-wrapper">
        {/* Left section: Order Summary */}
        <div className="payment-left">
          <div className="payment-header">
            <h1>Complete Your Payment</h1>
            <p>Join our fitness community today</p>
          </div>
          
          <div className="payment-summary">
            <div className="summary-header">
              <h3>Order Summary</h3>
              <span className="secure-badge">
                <span className="lock-icon">🔒</span>
                Secure Payment
              </span>
            </div>
            
            {/* Plan details section */}
            <div className="plan-details">
              <div className="plan-info">
                <h4>{paymentData.plan} Plan</h4>
                <p className="plan-period">Monthly Subscription</p>
              </div>
              <div className="plan-price">
                <span className="price">{formatAmount(paymentData.amount)}</span>
                <span className="period">/month</span>
              </div>
            </div>

            {/* Payment total section with tax calculation */}
            <div className="payment-total">
              <div className="total-row">
                <span>Subtotal</span>
                <span>{formatAmount(paymentData.amount)}</span>
              </div>
              <div className="total-row">
                <span>Tax (18% GST)</span>
                <span>₹{calculateTax()}</span>
              </div>
              <div className="total-row final">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right section: Payment Form */}
        <div className="payment-right">
          <div className="card-form">
            <h3>Payment Details</h3>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              {/* Card number input */}
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <div className="card-input">
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                  <span className="card-icon">💳</span>
                </div>
              </div>

              {/* Cardholder name input */}
              <div className="form-group">
                <label htmlFor="cardName">Cardholder Name</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Expiry date and CVV inputs */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              {/* Submit button with loading state */}
              <button 
                type="submit" 
                className="payment-button"
                disabled={loading}
              >
                <span className="button-text">
                  {loading ? 'Processing...' : `Pay ₹${calculateTotal()}`}
                </span>
                {!loading && <span className="button-icon">→</span>}
              </button>
            </form>

            {/* Payment footer with security information */}
            <div className="payment-footer">
              <div className="payment-methods">
                <span>We accept:</span>
                <div className="card-icons">
                  <span>💳</span>
                  <span>💳</span>
                  <span>💳</span>
                </div>
              </div>
              <p className="security-note">Your payment is secured with SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 