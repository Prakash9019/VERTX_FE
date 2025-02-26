"use client"

import React, { useState, useEffect } from "react"
// import logo from "./logo.png"
import { Header, Sidebar } from "../../layout/bars"

export default function ValuationCalculator() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
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

  useEffect(() => {
    if (investment && equity) {
      calculateValuation();
    }
  }, [investment, equity]);

  const [founders, setFounders] = useState([
    { id: "1", name: "Praneeth", percentage: 50, checks: 0 },
    { id: "2", name: "Prakash", percentage: 50, checks: 0 },
  ])
  const [newFounderName, setNewFounderName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const faqs = [
    {
      question: "How do investors determine a startup's valuation?",
      answer: "Investors use different valuation methods, such as comparing similar startups, forecasting revenue, or assessing risks."
    },
    {
      question: "What is the difference between pre-money and post-money valuation?",
      answer: "Pre-Money Valuation=Post-Money Valuation−Investment Amount."
    },
    {
      question: "How do SAFE & Convertible Notes affect valuation?",
      answer: "SAFE & Convertible Notes convert into equity at a later stage, often with a discount or valuation cap, impacting ownership percentages."
    }
  ]

  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [expenses, setExpenses] = useState("");
  const [taxes, setTaxes] = useState("");

  const grossProfit = revenue - cogs;
  const netProfit = grossProfit - expenses - taxes;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-[2px] flex justify-center items-center z-250">
    <div className="w-[70%] bg-black rounded-2xl border border-[#75757569] p-6 pb-10 h-[95%] overflow-hidden relative">
    
    <main className="overflow-y-scroll h-full scrollbar-hide">
          <div className="max-w-5xl mx-auto">
            <button className="flex items-center bg-black gap-2 text-gray-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Back
            </button>
            <div>
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-8">Startup Valuation</h1>
                
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
                  


                  {/* <div className="mb-12"> */}
        <h2 className="text-2xl font-bold mb-6">Just remember</h2>
        <div className="border-2 border-gray-500 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-black-200">
                <th className="p-5 text-left text-lg border-r-2 border-gray-500">Term</th>
                <th className="p-5 text-left text-lg">Case</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 ">
              <tr className="border-t-2  border-b-2 border-gray-500">
                <td className="p-5 border-r-2 border-gray-500">Pre-Money Valuation</td>
                <td className="p-5">The value of a company before raising new investment.</td>
              </tr>
              <tr className="border-t-2 border-gray-500">
                <td className="p-5 border-r-2 border-gray-500">Post-Money Valuation</td>
                <td className="p-5"> The value of a company after adding new investment.</td>
              </tr>
              <tr className="border-t-2 border-gray-500">
                <td className="p-5 border-r-2 border-gray-500">Equity</td>
                <td className="p-5">Ownership in a startup, usually represented in shares.</td>
              </tr>
            </tbody>
          </table>
        </div>
      {/* </div> */}
                  
                </div>
              </div>

              {/* Valuation Calculator Section - Updated with side-by-side layout */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Valuation Calculator</h2>
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                  {/* Calculator on the left */}
                  <div className="bg-[#101010] border-2 border-white rounded-2xl p-6 shadow-xl w-full md:w-1/2">
                    <div className="mb-6">
                      <label className="block font-semibold mb-2">Investment amount</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={investment}
                          onChange={(e) => setInvestment(e.target.value)}
                          placeholder="Enter the amount you've raised"
                          className="w-full p-2 bg-black border border-gray-700 rounded-md text-white"
                        />
                        <span className="absolute right-3 top-2 text-gray-400">USD</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block font-semibold mb-2">Equity (%)</label>
                      <input
                        type="number"
                        value={equity}
                        onChange={(e) => setEquity(e.target.value)}
                        placeholder="Enter the equity(%) you've diluted"
                        className="w-full p-2 bg-black border border-gray-700 rounded-md text-white"
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block font-semibold mb-2">Pre money valuation</label>
                      <input
                        type="text"
                        value={preMoney ? `$${preMoney}` : ""}
                        className="w-full p-2 bg-black border border-gray-700 rounded-md text-white"
                        readOnly
                      />
                    </div>

                    <div className="mb-6">
                      <label className="block font-semibold mb-2">Post money valuation</label>
                      <input
                        type="text"
                        value={postMoney ? `$${postMoney}` : ""}
                        className="w-full p-2 bg-black border border-gray-700 rounded-md text-white"
                        readOnly
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center mt-8">
                      <p className="text-center text-sm text-gray-400">Powered by</p>
                      

    <svg width="80" height="30" viewBox="0 0 47 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.72 0.799999H8.656V8.176L5.008 12H3.584L0.944 8.096V0.799999H2.88V7.728L4.416 10.016L6.72 7.6V0.799999ZM11.8498 0.799999H18.0898V2.608H12.5858L12.2978 2.928V5.44H15.9938V7.248H12.2978V9.488L12.7618 10.192H18.0898V12H11.8018L10.3618 9.856V2.32L11.8498 0.799999ZM20.1155 0.799999H25.9875L27.8595 3.536V5.408L26.3875 6.928L27.8595 9.088V12H25.9235V9.424L24.4675 7.296H22.8995L22.0515 6.768V12H20.1155V0.799999ZM22.0515 2.608V5.488H25.2995L25.9235 4.848V3.92L25.0115 2.608H22.0515ZM29.4053 0.799999H37.7573V2.608H33.5013L34.5573 3.552V12H32.6213V4L32.1573 2.608H29.4053V0.799999ZM44.791 0.799999H46.727V4.208L45.207 5.76L46.727 7.984V12H44.791V8.352L43.975 7.216H43.239L41.559 8.976V12H39.623V8.368L41.143 6.816L39.623 4.592V0.799999H41.559V4.224L42.343 5.408H43.111L44.791 3.648V0.799999Z" fill="white"/>
    </svg>

                    </div>
                  </div>

                  {/* Formula block on the right */}
                  {/* <div className="w-full md:w-1/2 flex flex-col space-y-4">
                    <div className="bg-[#151515] rounded-xl p-6 h-full">
                      <h3 className="text-xl font-bold mb-4">FORMULA</h3>
                      <div className="bg-[#202020] p-4 rounded mb-4">
                        <p className="text-gray-300 mb-2">Post money valuation = Investment raised / Equity(%)</p>
                        <p className="text-gray-300">Pre money valuation = Post money valuation - Investment raised</p>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-4 mt-6">Key Concepts</h3>
                      <div className="space-y-4">
                        <div className="bg-[#202020] p-4 rounded">
                          <h4 className="font-bold mb-2">Pre-Money Valuation</h4>
                          <p className="text-gray-300">The company's estimated value before receiving new investments. This determines how much equity investors receive for their capital.</p>
                        </div>
                        
                        <div className="bg-[#202020] p-4 rounded">
                          <h4 className="font-bold mb-2">Post-Money Valuation</h4>
                          <p className="text-gray-300">The company's value after new investments have been added to the company's balance sheet.</p>
                        </div>
                        
                        <div className="bg-[#202020] p-4 rounded">
                          <h4 className="font-bold mb-2">Example</h4>
                          <p className="text-gray-300">If you raise $500,000 for 20% equity, your post-money valuation is $2.5M and pre-money valuation is $2M.</p>
                        </div>
                      </div>
                    </div>
                  </div> */}
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

            


             
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
