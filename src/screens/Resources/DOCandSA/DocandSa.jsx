import React, { useState, useEffect } from "react"
import logo from "../../../logo.png"
const InputField = ({ label, placeholder, suffix }) => (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-2 bg-gray-800 rounded-md border border-gray-700"
        />
        {suffix && (
          <span className="absolute right-3 top-2 text-gray-400 text-sm">{suffix}</span>
        )}
      </div>
    </div>
  );

export default function DocandSa() {


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

  const [tab, setTab] = useState("convertible");

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
    
      <h1 className="text-4xl font-bold mb-8">Equity and Cap Table Management</h1>
        <p className="text-sm mb-4">
          Startup valuation determines a startup’s worth, helping founders, investors, and employees understand company value before and after fundraising.
        </p>
        
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

      <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="flex bg-gray-800 rounded-full p-1 mb-6">
        <button
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            tab === "convertible" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
          onClick={() => setTab("convertible")}
        >
          CONVERTIBLE NOTE
        </button>
        <button
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            tab === "safe" ? "bg-white text-black" : "bg-gray-800 text-white"
          }`}
          onClick={() => setTab("safe")}
        >
          SAFE
        </button>
      </div>

      <div className="w-full max-w-4xl bg-gray-900 p-6 rounded-lg shadow-lg grid grid-cols-2 gap-4">
        <InputField label="Convertible note Investment" placeholder="Enter the amount" suffix="USD" />
        <InputField label="Cost per share (new investor)" placeholder="Enter value" />
        <InputField label="Interest rate (%)" placeholder="Enter value" />
        <InputField label="Cost per share (convertible note investor)" placeholder="Enter value" />
        <InputField label="Maturity (in years)" placeholder="Enter value" />
        <InputField label="Post money valuation" placeholder="Enter value" />
        <InputField label="Discount (%)" placeholder="Enter value" />
        <InputField label="Total receivable shares (new investor)" placeholder="Enter value" />
        <InputField label="Valuation Cap" placeholder="Enter value" />
        <InputField label="Total receivable shares (CN investor)" placeholder="Enter value" />
        <InputField label="Pre money valuation" placeholder="Enter value" />
        <InputField label="Total receivable shares (CN investor as per valcap)" placeholder="Enter value" />
        
        <div>
          <label className="block text-sm mb-2">Future investment round</label>
          <select className="w-full p-2 bg-gray-800 rounded-md border border-gray-700">
            <option>YES</option>
            <option>NO</option>
          </select>
        </div>
        
       
        <InputField label="Equity (New investor)" placeholder="Enter value" />
         <InputField label="Future round (Investment)" placeholder="Enter value" />
       
        <InputField label="Equity (CN investor)" placeholder="Enter value" />
        <InputField label="No of shares existing before new round" placeholder="Enter value" />
        <InputField label="Final equity (Founders)" placeholder="Enter value" />
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

