"use client";

import { useState } from "react";
import { Check } from "lucide-react";
// import { FaCheck } from "react-icons/fa";

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
  const [selectedPlan, setSelectedPlan] = useState({name:"Growth",price: { monthly: 20, annually: 25 },savings:60 });
  const [hoverPlan, setHoverPlan] = useState('Growth');

  const handlePlanClick = (plan) => {
    setHoverPlan(plan.name);
    setSelectedPlan(plan);
    console.log(plan);
  };
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
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
      <div className=" max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Upgrade Plan</h1>
          <p className="text-xl text-gray-300">
            Enjoy an enhanced experience, exclusive creator tools, top-tier
            verification and security.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-4 mb-12 ">
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

        {/* Pricing Cards */}
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
                  ${!isAnnual ? plan.price.annually  : plan.price.monthly}
                </span>
                <span className="text-gray-400">/month</span>
              </div>

              {!isAnnual ?  <p className="mb-6 text-sm"> Billed monthly </p> :
              <div className="mb-6 text-sm">
                ${plan.savings} saved annually
                <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                  SAVE {plan.name === "Creator" ? "10%" : "20%"}
                </span>
              </div>}

              {/* <ul className="space-y-3">
                {" "}
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    {" "}
                    <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />{" "}
                    <span>{feature}</span>{" "}
                  </li>
                ))}{" "}
              </ul> */}

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

        {/* Comparison Table */}
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

               <div className="flex justify-center items-center flex-col "> 
               <h3 className="text-2xl font-bold mb-4">{selectedPlan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">
                  ${!isAnnual ? selectedPlan.price.annually  : selectedPlan.price.monthly*12}
                </span>
                <span className="text-gray-400"> {!isAnnual ? "/month" :"/year"}</span>
              </div>
              <div className="mb-6 text-sm">
                {!isAnnual ?  <p> Billed monthly </p> : <p>Billed annually</p>}
               
              </div>
                 </div>

                <div>
             <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors">
             Subscribe and pay
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











// "use client"

// import { useState } from "react"

// export default function PricingTable() {
//   const [isAnnual, setIsAnnual] = useState(true)

//   const tiers = [
//     {
//       name: "Creator",
//       price: isAnnual ? 9 : 10,
//       savings: 12,
//       features: ["Outreach", "Edit, comment and share", "Bookmark vc's", "Write articles"],
//     },
//     {
//       name: "Growth",
//       price: isAnnual ? 20 : 25,
//       savings: 60,
//       features: [
//         "Everything in Creator, and",
//         "Outreach with increased limits",
//         "Encrypted direct messages",
//         "Access to investor maps",
//       ],
//     },
//     {
//       name: "Enterprise",
//       price: isAnnual ? 28 : 35,
//       savings: 84,
//       features: ["Everything in Growth, and", "Fully ad-free", "Vertx Flow", "Venture/Profile featuring"],
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-black text-white p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Billing Toggle */}
//         <div className="flex justify-center mb-12">
//           <div className="bg-zinc-900 rounded-full p-1 inline-flex">
//             <button
//               onClick={() => setIsAnnual(true)}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
//                 isAnnual ? "bg-white text-black" : "text-white"
//               }`}
//             >
//               Annual
//               {isAnnual && (
//                 <span className="ml-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">BEST VALUE</span>
//               )}
//             </button>
//             <button
//               onClick={() => setIsAnnual(false)}
//               className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
//                 !isAnnual ? "bg-white text-black" : "text-white"
//               }`}
//             >
//               Monthly
//             </button>
//           </div>
//         </div>

//         {/* Pricing Cards */}
//         <div className="grid md:grid-cols-3 gap-8">
//           {tiers.map((tier) => (
//             <div key={tier.name} className="bg-zinc-900 rounded-3xl p-8">
//               <h2 className="text-2xl font-bold mb-4">{tier.name}</h2>
//               <div className="mb-6">
//                 <div className="flex items-baseline">
//                   <span className="text-4xl font-bold">$</span>
//                   <span className="text-6xl font-bold">{tier.price}</span>
//                   <span className="text-xl ml-1">/month</span>
//                 </div>
//                 <div className="flex items-center mt-2 space-x-2">
//                   <span className="text-gray-400">${tier.savings} saved annually</span>
//                   <span className="bg-zinc-800 text-xs px-2 py-1 rounded-full">
//                     SAVE {tier.name === "Creator" ? "10%" : "20%"}
//                   </span>
//                 </div>
//               </div>
//               <ul className="space-y-4">
//                 {tier.features.map((feature) => (
//                   <li key={feature} className="flex items-start">
//                     <svg
//                       className="h-5 w-5 text-white mt-0.5 mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Subscribe Button */}
//         <div className="mt-12 text-center">
//           <button className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors">
//             Subscribe and pay
//           </button>
//           <p className="mt-4 text-sm text-gray-400 max-w-2xl mx-auto">
//             By subscribing, you agree to our Purchaser Terms of Service. Subscriptions auto-renew until canceled. Cancel
//             anytime, at least 24 hours prior to renewal to avoid additional charges. Manage your subscription through
//             the platform you subscribed on.
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

