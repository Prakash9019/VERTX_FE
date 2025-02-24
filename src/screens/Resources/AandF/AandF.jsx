
import React, { useState, useEffect } from "react"
import logo from "../../../logo.png"


export default function AandF() {


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
            <h2 className="text-2xl font-bold mb-4">What is equity & cap table management?</h2>
            <ul className="space-y-2 text-lg">
              <li>Equity refers to ownership in a startup, typically divided among founders, investors, and employees.</li>
              <li>A Cap Table (Capitalization Table) is a document that tracks:</li>
              <li className="ml-4">Who owns what % of the company.</li>
              <li className="ml-4">How ownership changes with fundraising.</li>
              <li className="ml-4">Dilution effects after new investments.</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Why it is important</h2>
            <ul className="space-y-2 text-lg">
              <li>Founders need to track dilution when raising funds.</li>
              <li>Investors use it to calculate their ownership & exit value.</li>
              <li>Employees with stock options see their potential earnings.</li>
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

      {/* Custom Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 w-96">
            <h2 className="text-xl font-bold mb-4">Manage Co-founders</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New co-founder name"
                  value={newFounderName}
                  onChange={(e) => setNewFounderName(e.target.value)}
                  className="flex-grow p-2 bg-gray-800 border border-gray-700 rounded"
                />
                <button
                  onClick={addFounder}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add
                </button>
              </div>
              {founders.map(founder => (
                <div key={founder.id} className="flex justify-between items-center">
                  <input
                    type="text"
                    value={founder.name}
                    onChange={(e) => updateFounderName(founder.id, e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded p-2"
                  />
                  <button
                    onClick={() => removeFounder(founder.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded ml-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

