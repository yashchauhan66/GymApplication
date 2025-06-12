import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Plans.css';

const Plans = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (planName, price) => {
    // You can store the selected plan in localStorage or state management
    localStorage.setItem('selectedPlan', JSON.stringify({ name: planName, price: price }));
    navigate('/payment');
  };

  const plans = [
    {
      name: "Basic",
      price: "₹999",
      period: "per month",
      features: [
        "Access to gym floor",
        "Basic equipment usage",
        "Locker room access",
        "Group classes (limited)",
        "Fitness assessment"
      ],
      recommended: false,
      color: "#2c2c2c"
    },
    {
      name: "Premium",
      price: "₹1,999",
      period: "per month",
      features: [
        "All Basic features",
        "Unlimited group classes",
        "Personal trainer (2 sessions/month)",
        "Nutrition consultation",
        "Access to all facilities",
        "Priority booking"
      ],
      recommended: true,
      color: "#4a4a4a"
    },
    {
      name: "Elite",
      price: "₹2,999",
      period: "per month",
      features: [
        "All Premium features",
        "Unlimited personal training",
        "Monthly massage session",
        "Private locker",
        "Priority support",
        "Guest passes (2/month)",
        "Recovery room access"
      ],
      recommended: false,
      color: "#2c2c2c"
    }
  ];

  return (
    <div className="plans-container">
      <div className="plans-header">
        <h1>Choose Your Perfect Plan</h1>
        <p>Select the membership that best fits your fitness goals</p>
      </div>

      <div className="plans-grid">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`plan-card ${plan.recommended ? 'recommended' : ''}`}
            style={{ backgroundColor: plan.color }}
          >
            {plan.recommended && <div className="recommended-badge">Most Popular</div>}
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <div className="plan-price">
                <span className="price">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
            </div>
            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="check-icon">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handlePlanSelect(plan.name, plan.price)} 
              className="plan-button"
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      <div className="plans-footer">
        <p>All plans include a 7-day free trial</p>
        <p>Need a custom plan? <Link to="/contact">Contact us</Link></p>
      </div>
    </div>
  );
};

export default Plans;
