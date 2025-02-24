
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
    name: "Growth",
    price: { monthly: 20, annually: 25 },
    savings: 60
  });
  const [hoverPlan, setHoverPlan] = useState('Growth');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Add Cashfree SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePlanClick = (plan) => {
    setHoverPlan(plan.name);
    setSelectedPlan(plan);
  };
  function getOrderId() {
    const timestamp = Date.now().toString(); // Get current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0'); // Generate a random number with 3 digits
    return `ORD${timestamp}${randomNum}`;
}
  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const amount = !isAnnual 
        ? selectedPlan.price.annually 
        : selectedPlan.price.monthly * 12;

      // Use the appropriate URL based on environment
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'http://localhost:5000' 
        : 'http://localhost:5000';
       const order_id = await getOrderId();
       console.log(order_id,amount,currency,)
      const response = await fetch(`${baseUrl}/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          order_id: order_id,
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
          ? 'http://localhost:5000/payment/payment-status'
          : 'http://localhost:5000/payment',
      });
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const plans = [
    {
      name: "Creator",
      price: { monthly: 9, annually: 10 },
      savings: 12,
      features: [
        "Outreach",
        "Edit, comment and share",
        "Bookmark VC's",
        "Write articles",
      ],
    },
    {
      name: "Growth",
      price: { monthly: 20, annually: 25 },
      savings: 60,
      features: [
        "Everything in Creator, and",
        "Outreach with increased limits",
        "Encrypted direct messages",
        "Access to investor maps",
        "Verified mark",
        "Creator rewards",
        "Detailed analytics",
      ],
    },
    {
      name: "Enterprise",
      price: { monthly: 28, annually: 35 },
      savings: 84,
      features: [
        "Everything in Growth, and",
        "Fully ad-free",
        "Vertx Flow",
        "Venture/Profile featuring",
      ],
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

  return (
    <div className="relative min-h-screen bg-black text-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Upgrade Plan</h1>
          <p className="text-xl text-gray-300">
            Enjoy an enhanced experience, exclusive creator tools, top-tier
            verification and security.
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-2 rounded-full ${
              isAnnual ? "bg-white/10 border border-white" : ""
            }`}
          >
            Annual
            {isAnnual && (
              <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                BEST VALUE
              </span>
            )}
          </button>
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-2 rounded-full ${
              !isAnnual ? "bg-white/10 border border-white" : ""
            }`}
          >
            Monthly
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-lg p-6 transition-colors ${
                hoverPlan === plan.name ? "border-4 border-white" : "border-gray-800"
              }`}
              onClick={() => handlePlanClick(plan)}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              
              <div className="mb-4">
                <span className="text-4xl font-bold">
                  ${!isAnnual ? plan.price.annually : plan.price.monthly}
                </span>
                <span className="text-gray-400">/month</span>
              </div>

              {!isAnnual ? (
                <p className="mb-6 text-sm">Billed monthly</p>
              ) : (
                <div className="mb-6 text-sm">
                  ${plan.savings} saved annually
                  <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                    SAVE {plan.name === "Creator" ? "10%" : "20%"}
                  </span>
                </div>
              )}

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

      <div className="flex flex-row justify-center items-center fixed bottom-0 w-full text-center bg-black p-2">
        <div className="flex justify-center items-center flex-col">
          <h3 className="text-2xl font-bold mb-4">{selectedPlan.name}</h3>
          <div className="mb-4">
            <span className="text-4xl font-bold">
              ${!isAnnual ? selectedPlan.price.annually : selectedPlan.price.monthly * 12}
            </span>
            <span className="text-gray-400">{!isAnnual ? "/month" : "/year"}</span>
          </div>
          <div className="mb-6 text-sm">
            {!isAnnual ? <p>Billed monthly</p> : <p>Billed annually</p>}
          </div>
        </div>

        <div>
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className={`bg-white text-black px-8 py-4 rounded-full text-lg font-medium transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
            }`}
          >
            {isLoading ? 'Processing...' : 'Subscribe and pay'}
          </button>
          <p className="mt-4 text-sm text-gray-400 max-w-xl mx-auto">
            By subscribing, you agree to our Purchaser Terms of Service. Subscriptions auto-renew until canceled. Cancel
            anytime, at least 24 hours prior to renewal to avoid additional charges. Manage your subscription through
            the platform you subscribed on.
          </p>
        </div>
      </div>
    </div>
  );
}