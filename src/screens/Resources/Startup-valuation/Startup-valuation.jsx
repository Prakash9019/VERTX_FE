// import { useState } from "react";

// export default function ValuationCalculator() {
//   const [investment, setInvestment] = useState("");
//   const [equity, setEquity] = useState("");
//   const [preMoney, setPreMoney] = useState(null);
//   const [postMoney, setPostMoney] = useState(null);

//   const calculateValuation = () => {
//     const invest = parseFloat(investment);
//     const eq = parseFloat(equity) / 100;
//     if (isNaN(invest) || isNaN(eq) || eq === 0) return;
    
//     const postVal = invest / eq;
//     const preVal = postVal - invest;
//     setPostMoney(postVal.toFixed(2));
//     setPreMoney(preVal.toFixed(2));
//   };

//   return (
//     <div className="bg-black text-white min-h-screen p-6">
//       <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg">
//         <h2 className="text-xl font-semibold mb-4">Startup Valuation</h2>
//         <p className="text-sm mb-4">
//           Startup valuation determines a startup’s worth, helping founders, investors, and employees understand company value before and after fundraising.
//         </p>
        
        // <div className="space-y-4">
        //   <div>
        //     <label className="block text-sm font-medium">Investment amount (USD)</label>
        //     <input type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg" placeholder="Enter amount" />
        //   </div>
        //   <div>
        //     <label className="block text-sm font-medium">Equity (%)</label>
        //     <input type="number" value={equity} onChange={(e) => setEquity(e.target.value)} className="w-full p-2 mt-1 bg-gray-800 border border-gray-700 rounded-lg" placeholder="Enter equity %" />
        //   </div>
        //   <button onClick={calculateValuation} className="w-full bg-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Calculate</button>
          
        //   <div className="p-4 bg-gray-800 rounded-lg">
        //     <p>Pre-money valuation: <span className="font-semibold">{preMoney ? `$${preMoney}M` : "-"}</span></p>
        //     <p>Post-money valuation: <span className="font-semibold">{postMoney ? `$${postMoney}M` : "-"}</span></p>
        //   </div>
        // </div>
        
        // <div className="mt-6 p-4 bg-gray-800 rounded-lg text-sm">
        //   <h3 className="font-semibold mb-2">FORMULA</h3>
        //   <p>Post-money valuation = Investment / Equity(%)</p>
        //   <p>Pre-money valuation = Post-money valuation - Investment</p>
        // </div>
        
//         <div className="mt-6 text-sm">
//           <h3 className="font-semibold mb-2">FAQs</h3>
//           <p><strong>Q1:</strong> How do investors determine a startup’s valuation?</p>
//           <p className="text-gray-400 mb-2">Investors use market comparisons, revenue forecasts, and risk assessments.</p>
//           <p><strong>Q2:</strong> What’s the difference between pre-money & post-money valuation?</p>
//           <p className="text-gray-400 mb-2">Pre-money = Before investment, Post-money = After investment.</p>
//           <p><strong>Q3:</strong> How do SAFE & Convertible Notes affect valuation?</p>
//           <p className="text-gray-400">They convert into equity later, impacting ownership percentages.</p>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client"

import React, { useState, useEffect } from "react"
import logo from "../../../logo.png"


export default function ValuationCalculator() {


    const [investment, setInvestment] = useState("");
  const [equity, setEquity] = useState("");
  const [preMoney, setPreMoney] = useState(null);
  const [postMoney, setPostMoney] = useState(null);

  const calculateValuation = () => {
    const invest = parseFloat(investment);
    const eq = parseFloat(equity) / 100;
    if (isNaN(invest) || isNaN(eq) || eq === 0) return;
    
    const postVal = invest / eq;
    const preVal = postVal - invest;
    setPostMoney(postVal.toFixed(2));
    setPreMoney(preVal.toFixed(2));
  };

  const [founders, setFounders] = useState([
    { id: "1", name: "Praneeth", percentage: 50, checks: 0 },
    { id: "2", name: "Prakash", percentage: 50, checks: 0 },
  ])
  const [newFounderName, setNewFounderName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  

  const faqs = [
    {
      question: "How does fundraising impact founder equity?",
      answer: "When a startup raises funds, new shares are issued, diluting the founder's percentage ownership. However, the total company value increases, so their remaining stake may be worth more."
    },
    {
      question: "What happens when employees are given stock options?",
      answer: "Stock options reserve equity for employees. When exercised, it dilutes existing shareholders but helps in retaining top talent."
    },
    {
      question: "How do SAFE & Convertible Notes affect the Cap Table?",
      answer: "These convert into equity later, often at a discount or using a valuation cap. Founders should track their impact to avoid unexpected dilution."
    }
  ]


  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [expenses, setExpenses] = useState("");
  const [taxes, setTaxes] = useState("");

  const grossProfit = revenue - cogs;
  const netProfit = grossProfit - expenses - taxes;

  return (
    <div className="min-h-screen bg-black text-white p-3">
    <button className="flex items-center bg-black gap-2 text-gray-400 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back
      </button>
  <div className="pl-12">
    <div className="mb-8">
    
      <h1 className="text-4xl font-bold mb-8"> Startup Valuation</h1>
        {/* <p className="text-sm mb-4">
          Startup valuation determines a startup’s worth, helping founders, investors, and employees understand company value before and after fundraising.
        </p> */}
        
        <div className="space-y-6 text-gray-300 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">What is Startup Valuation?</h2>
            <ul className="space-y-2 text-lg">
              <li>Startup valuation is the process of determining how much a startup is worth. It helps:</li>
             
              <li className="ml-4">Founders understand their company's value before fundraising.</li>
              <li className="ml-4">Investors decide how much equity they will receive for their investment.</li>
              <li className="ml-4">Employees know the value of their stock options.</li>
              <li>Valuation changes over time based on funding, traction, revenue, and market conditions.</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Just remember</h2>
            <ul className="space-y-2 text-lg">
              <li>Pre-Money Valuation - The value of a company before raising new investment.</li>
              <li>Post-Money Valuation - The value of a company after adding new investment.</li>
              <li>Equity - Ownership in a startup, usually represented in shares.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Definitions Table */}

      <div className="min-h-screen flex items-center justify-center border-white bg-black p-4">
      <div className="border-2 bg-[#101010] border-white text-white p-6 rounded-2xl w-full max-w-md shadow-xl">        
        <label className="block font-semibold">Total Revenue</label>
        <input
          type="number"
          value={revenue}
          onChange={(e) => setRevenue(Number(e.target.value))}
          className="w-full p-2 my-2 bg-black border border-gray-700 rounded-md"
          placeholder="Enter value"
        />

        <label className="block font-semibold">Cost of Goods Sold (COGS)</label>
        <input
          type="number"
          value={cogs}
          onChange={(e) => setCogs(Number(e.target.value))}
          className="w-full p-2 my-2 bg-black border border-gray-700 rounded-md"
          placeholder="Enter value"
        />

        <label className="block font-semibold">Other Expenses (if any)</label>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(Number(e.target.value))}
          className="w-full p-2 my-2 bg-black border border-gray-700 rounded-md"
          placeholder="Enter value"
        />

        <label className="block font-semibold">Taxes (if any)</label>
        <input
          type="number"
          value={taxes}
          onChange={(e) => setTaxes(Number(e.target.value))}
          className="w-full p-2 my-2 bg-black border border-gray-700 rounded-md"
          placeholder="Enter value"
        />

        <label className="block font-semibold">Gross Profit</label>
        <input
          type="text"
          value={grossProfit || ""}
          className="w-full p-2 my-2 bg-black border border-gray-700 rounded-md"
          readOnly
        />

        <label className="block font-semibold">Net Profit</label>
        <input
          type="text"
          value={netProfit || ""}
          className="w-full p-2 my-2 bg-black border border-gray-700 rounded-md"
          readOnly
        />
      <div className="flex flex-col justify-center items-center ">
  <p className="text-center text-sm mt-4">Powered by </p>
  <img src={logo} className="h-6 w-14" alt="logo" />
</div>
      </div>
    </div>

      {/* FAQs Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="border border-gray-800 rounded-lg px-6 py-4">
              <summary className="text-lg font-semibold cursor-pointer">{faq.question}</summary>
              <p className="mt-2 text-gray-300">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">
        Powered by VERTX
      </div>
    </div>
    </div>
  )
}

