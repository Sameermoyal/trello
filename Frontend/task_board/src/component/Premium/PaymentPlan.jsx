import React, { useState } from 'react';
import './PaymentPlan.css'; // Optional: Import CSS for styling

const PaymentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const paymentPlans = [
    { id: 1, name: 'Basic Plan', price: '$10/month', features: ['Feature 1', 'Feature 2'] },
    { id: 2, name: 'Standard Plan', price: '$20/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { id: 3, name: 'Premium Plan', price: '$30/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handlePayment = () => {
    if (selectedPlan) {
      alert(`You have selected ${paymentPlans.find(plan => plan.id === selectedPlan).name}`);
    } else {
      alert('Please select a payment plan.');
    }
  };

  return (
    <div className="payment-plan-container">
      <h2>Choose Your Payment Plan</h2>
      <div className="plans">
        {paymentPlans.map((plan) => (
          <div
            key={plan.id}
            className={`plan ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            <h3>{plan.name}</h3>
            <p>{plan.price}</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={handlePayment} className="pay-button">Proceed to Pay</button>
    </div>
  );
};

export default PaymentPlan;
