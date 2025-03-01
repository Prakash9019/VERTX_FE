"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

const ComparisonTable = ({ title, features }) => (
  <div className="overflow-x-auto mb-12">
    <table className="w-full">
      <thead>
        <tr className="text-left border-b border-gray-800">
          <th className="py-4 px-4">{title}</th>
          <th className="py-4 px-4">Creator</th>
          <th className="py-4 px-4">Growth</th>
          <th className="py-4 px-4">Enterprise</th>
        </tr>
      </thead>
      <tbody>
        {features.map((feature) => (
          <tr key={feature.name} className="border-b border-gray-800">
            <td className="py-4 px-4">{feature.name}</td>
            <td className="py-4 px-4">{feature.creator}</td>
            <td className="py-4 px-4">{feature.growth}</td>
            <td className="py-4 px-4">{feature.enterprise}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState({
    name: "Outreach+",
    price: { monthly: { USD: 10, INR: 499 }, annually: { USD: 120, INR: 5988 } },
    savings: { USD: 24, INR: 3600 },
    savingsPercentage: 38
  });
  const [hoverPlan, setHoverPlan] = useState('Outreach+');
  const [isLoading, setIsLoading] = useState(false);
  const [userCountry, setUserCountry] = useState(null);

  useEffect(() => {
    // Add Cashfree SDK script
    const cashfreeScript = document.createElement('script');
    cashfreeScript.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    cashfreeScript.async = true;
    document.body.appendChild(cashfreeScript);

    // Add PayPal SDK script
    const paypalScript = document.createElement('script');
    paypalScript.src = 'https://www.paypal.com/sdk/js?client-id=AVsChetf6dWZTneXc7cN43imHmwdXXA6yjfURRJiJ_O1MJr4UrrTjfR2anr7ThLmDlXeg2yhnrg6szi5&currency=USD';
    paypalScript.async = true;
    document.body.appendChild(paypalScript);

    // Detect user country using IP geolocation API
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=82ddce4e045d43acb8e7ea0ad5ac23db')
      .then(response => response.json())
      .then(data => {
        setUserCountry(data.country_code2);
      })
      .catch(error => {
        console.error('Error detecting location:', error);
        // Default to non-India to ensure PayPal as fallback
        setUserCountry('IN'); // Set default to 'IN' to match the screenshots
      });

    return () => {
      document.body.removeChild(cashfreeScript);
      document.body.removeChild(paypalScript);
    };
  }, []);

  const handlePlanClick = (plan) => {
    setHoverPlan(plan.name);
    setSelectedPlan(plan);
  };

  const processPaypalPayment = async (amount) => {
    return new Promise((resolve, reject) => {
      if (!window.paypal) {
        reject(new Error('PayPal SDK not loaded'));
        return;
      }

      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: amount.toString()
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(function(details) {
            resolve(details);
          });
        },
        onError: (err) => {
          reject(err);
        }
      }).render('#paypal-button-container')
        .catch(err => {
          reject(err);
        });
    });
  };

  const processCashfreePayment = async (amount) => {
    try {
      // Use the appropriate URL based on environment
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://5503-2404-7c80-64-fcbb-ed62-8129-9f40-ec35.ngrok-free.app' 
        : 'http://localhost:4124';

      const response = await fetch(`${baseUrl}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          customerId: `CUST_${Date.now()}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      
      const cashfree = new window.Cashfree({
        mode: "production"
      });

      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        returnUrl: process.env.NODE_ENV === 'production'
          ? 'https://5503-2404-7c80-64-fcbb-ed62-8129-9f40-ec35.ngrok-free.app/payment-status'
          : 'https://5503-2404-7c80-64-fcbb-ed62-8129-9f40-ec35.ngrok-free.app',
      });
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // Calculate amount based on plan selection
      const currencyType = userCountry === 'IN' ? 'INR' : 'USD';
      const amount = isAnnual 
        ? selectedPlan.price.annually[currencyType]
        : selectedPlan.price.monthly[currencyType];
      
      if (userCountry !== 'IN') {
        // Create modal for PayPal buttons
        const modal = document.createElement('div');
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.flexDirection = 'column';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';
        
        const modalContent = document.createElement('div');
        modalContent.style.backgroundColor = '#fff';
        modalContent.style.borderRadius = '8px';
        modalContent.style.padding = '30px';
        modalContent.style.maxWidth = '500px';
        modalContent.style.width = '90%';
        
        const closeButton = document.createElement('button');
        closeButton.innerText = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '20px';
        closeButton.style.fontSize = '30px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.color = '#fff';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = () => {
          document.body.removeChild(modal);
          setIsLoading(false);
        };
        
        const title = document.createElement('h3');
        title.innerText = 'Complete Payment';
        title.style.marginBottom = '20px';
        title.style.color = '#000';
        title.style.textAlign = 'center';
        
        const paypalContainer = document.createElement('div');
        paypalContainer.id = 'paypal-button-container';
        
        modalContent.appendChild(title);
        modalContent.appendChild(paypalContainer);
        modal.appendChild(closeButton);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        try {
          const result = await processPaypalPayment(amount);
          // Handle successful payment
          alert(`Payment successful! Transaction ID: ${result.id}`);
          // Redirect to success page or update subscription status
          window.location.href = '/payment-success';
        } catch (error) {
          console.error('PayPal payment error:', error);
          alert('PayPal payment failed. Please try again.');
        } finally {
          if (document.body.contains(modal)) {
            document.body.removeChild(modal);
          }
        }
      } else {
        // Process Cashfree payment for users in India
        await processCashfreePayment(amount);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinCommunity = () => {
    alert("Joining the Enterprise community!");
    // Implement the join community logic here
  };

  const currencySymbol = userCountry === 'IN' ? '₹' : '$';

  const plans = [
    {
      name: "Explore",
      price: { 
        monthly: { USD: 0, INR: 0 }, 
        annually: { USD: 0, INR: 0 }
      },
      savings: { USD: 0, INR: 0 },
      savingsPercentage: 0,
      features: [
        "Outreach (limited credits)",
        "Access to recent roundup",
        "Bookmark VC's",
        "Write articles",
      ],
    },
    {
      name: "Outreach+",
      price: { 
        monthly: { USD: 10, INR: 499 }, 
        annually: { USD: 120, INR: 5988 }
      },
      monthlyDisplayPrice: 649,
      annualDisplayPrice: 499,
      savings: { USD: 24, INR: 3600 },
      savingsPercentage: 38,
      features: [
        "Outreach with increased limits",
        "Access co-founder match",
        "Access to investor maps",
        "Verified mark",
        "Creator rewards",
        "Detailed analytics",
      ],
      earlyBird: { price: 649, save: "19%" }
    },
    {
      name: "Enterprise",
      price: { 
        monthly: { USD: 0, INR: 0 }, 
        annually: { USD: 0, INR: 0 }
      },
      savings: { USD: 0, INR: 0 },
      savingsPercentage: 0,
      features: [
        "Investor-founder match",
        "Automated email outreach",
        "Create pipelines",
      ],
      comingSoon: true
    },
  ];

  const data = [
    {
      title: "Enhanced Experience",
      features: [
        { name: "Outreach with increased limits", creator: "Basic", growth: "✓", enterprise: "✓" },
        { name: "Vertx Flow", creator: "", growth: "", enterprise: "✓" },
        { name: "Ad Free", creator: "", growth: "", enterprise: "Fully Ad-Free" },
        { name: "Reach", creator: "Smaller", growth: "Larger", enterprise: "Largest" },
        { name: "Investor maps", creator: "", growth: "✓", enterprise: "✓" },
        { name: "Bookmark VC's", creator: "✓", growth: "✓", enterprise: "✓" },
        { name: "Analytics", creator: "", growth: "✓", enterprise: "✓" },
        { name: "Venture/Profile featuring", creator: "", growth: "", enterprise: "✓" },
      ],
    },
    {
      title: "Creator Studio",
      features: [
        { name: "Edit, comment and share", creator: "✓", growth: "✓", enterprise: "✓" },
        { name: "Undo post", creator: "✓", growth: "✓", enterprise: "✓" },
        { name: "Top on Vertx", creator: "✓", growth: "✓", enterprise: "✓" },
        { name: "Recent roundup", creator: "✓", growth: "✓", enterprise: "✓" },
        { name: "Rewards", creator: "", growth: "✓", enterprise: "✓" },
        { name: "Write articles", creator: "✓", growth: "✓", enterprise: "✓" },
      ],
    },
    {
      title: "Security",
      features: [
        { name: "Verified checkmark", creator: "", growth: "✓", enterprise: "✓" },
        { name: "ID verification", creator: "", growth: "✓", enterprise: "✓" },
        { name: "Encrypted direct messages", creator: "", growth: "✓", enterprise: "✓" },
      ],
    },
  ];

  // Dynamic bottom bar based on selected plan
  const renderBottomBar = () => {
    if (selectedPlan.name === "Enterprise") {
      return (
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">{selectedPlan.name}</h3>
            <button
              onClick={handleJoinCommunity}
              className="bg-white text-black px-35 py-4 text-lg rounded-full text-sm font-medium transition-colors hover:bg-gray-100"
            >
              Join Community
            </button>
          </div>
        </div>
      );
    } else if (selectedPlan.name === "Explore") {
      return (
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">{selectedPlan.name}</h3>
            <p className="text-4xl font-bold mb-4">Free</p>
          </div>
        </div>
      );
    } else {
      const displayPrice = isAnnual 
        ? selectedPlan.price.annually.INR
        : 649; // Early bird price for monthly as per Image 1
      
      const savingsText = isAnnual
        ? `You saved ${currencySymbol}${selectedPlan.savings.INR.toLocaleString()} on billing annually`
        : "You saved ₹150 as an early user";
      
      return (
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto px-4">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold mb-3 ml-10 text-left">{selectedPlan.name}</h3>
            <div className="mb-2">
              <span className="text-4xl -ml-26 font-bold">
                {currencySymbol}{isAnnual ? selectedPlan.price.annually.INR.toLocaleString() : 649}
              </span>
              <span className="text-gray-400">{isAnnual ? '/year' : '/month'}</span>
            </div>
            <div className="ml-10 text-lg font-medium">
              {savingsText}
            </div>
          </div>

          <div>
            <button
              onClick={handlePayment}
              disabled={isLoading || !userCountry}
              className={`bg-white text-black px-40 py-3.5 rounded-full text-lg font-medium transition-colors ${
                isLoading || !userCountry ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
            >
              {isLoading ? 'Processing...' : !userCountry ? 'Detecting location...' : 'Subscribe and pay'}
            </button>
            <p className="mt-4 text-xs text-white max-w-lg">
              By subscribing, you agree to our Purchaser Terms of Service. Subscriptions auto-renew until canceled. Cancel
              anytime, at least 24 hours prior to renewal to avoid additional charges. Manage your subscription through
              the platform you subscribed on.
            </p>
          </div>
        </div>
      );
    }
  };

  // Render plan card based on billing period
  const renderPlanCard = (plan) => {
    if (plan.comingSoon) {
      return (
        <div
          key={plan.name}
          className={`border rounded-lg p-6 transition-colors ${
            hoverPlan === plan.name ? "border-white border-2" : "border-gray-800"
          }`}
          onClick={() => handlePlanClick(plan)}
        >
          <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">Soon</span>
          </div>
          <div className="mt-2 flex justify-start">
            <button className="bg-[#171717] px-2 py-1 rounded-full text-xs border border-white">
              JOIN COMMUNITY
            </button>
          </div>
          <ul className="space-y-3 mt-3">
            <li key="header" className="font-bold">
              Everything in Outreach+, and
            </li>
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (plan.name === "Explore") {
      return (
        <div
          key={plan.name}
          className={`border rounded-lg p-6 transition-colors ${
            hoverPlan === plan.name ? "border-white border-2" : "border-gray-800"
          }`}
          onClick={() => handlePlanClick(plan)}
        >
          <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">{currencySymbol}0</span>
            <div className="mt-2">Free</div>
          </div>
          <ul className="space-y-3 mt-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    } else if (plan.name === "Outreach+") {
      if (isAnnual) {
        // Annual view (Image 2)
        return (
          <div
            key={plan.name}
            className={`border rounded-lg p-6 transition-colors ${
              hoverPlan === plan.name ? "border-white border-2" : "border-gray-800"
            }`}
            onClick={() => handlePlanClick(plan)}
          >
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold">
                {currencySymbol}499
              </span>
              <span className="text-gray-400">/month</span>
              <div className="mt-2 text-lg font-medium">
                {currencySymbol}3,600 saved annually
                <span className="ml-2 bg-[#171717] px-2 py-1 rounded-full text-xs border border-white">
                  SAVE 38%
                </span>
              </div>
            </div>
            <ul className="space-y-3 mt-3">
              <li key="header" className="font-bold">
                Everything in Explore, and
              </li>
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      } else {
        // Monthly view (Image 1)
        return (
          <div
            key={plan.name}
            className={`border rounded-lg p-6 transition-colors ${
              hoverPlan === plan.name ? "border-white border-2" : "border-gray-800"
            }`}
            onClick={() => handlePlanClick(plan)}
          >
            <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold">
                {currencySymbol}649
              </span>
              <span className="text-gray-400">/month</span>
              <div className="mt-2 text-lg font-medium">
                Early bird offer
                <span className="ml-2 bg-[#171717] px-2 py-1 rounded-full text-xs border border-white">
                  SAVE 19%
                </span>
              </div>
            </div>
            <ul className="space-y-3 mt-3">
              <li key="header" className="font-bold">
                Everything in Explore, and
              </li>
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white px-4 py-16 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Upgrade Plan</h1>
          <p className="text-xl text-gray-300">
            Enjoy an enhanced experience, exclusive creator tools, top-tier
            verification and security.
          </p>
          {userCountry && (
            <p className="text-sm text-gray-400 mt-2">
              Payment method: {userCountry === 'IN' ? 'Cashfree (INR)' : 'PayPal (USD)'}
            </p>
          )}
        </div>

        {/* Toggle styling to match the images */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex bg-[#2A2A2A] rounded-full w-72 border border-white">
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-full flex-1 flex items-center justify-center gap-2 ${
                isAnnual ? "bg-black text-white" : "text-gray-400"
              }`}
            >
              Annual
              {isAnnual && (
                <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded-full text-black whitespace-nowrap">
                  BEST VALUE
                </span>
              )}
            </button>
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-full flex-1 ${
                !isAnnual ? "bg-black text-white" : "text-gray-400"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => renderPlanCard(plan))}
        </div>

        <div className="min-h-screen bg-black text-white p-8">
          <h2 className="text-3xl font-bold mb-8">Compare plans and features</h2>
          {data.map((section) => (
            <ComparisonTable
              key={section.title}
              title={section.title}
              features={section.features}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 w-full text-center bg-black border-t border-gray-800 p-4">
        {renderBottomBar()}
      </div>
    </div>
  );
}