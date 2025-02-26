import React, { useState, useEffect } from "react"
import logo from "../../../logo.png"
const InputField = ({ label, placeholder, suffix }) => (
    <div>
      <label className="block text-sm mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full p-2 bg-[#101010] rounded-md border border-gray-700"
        />
        {suffix && (
          <span className="absolute right-3 top-2 text-gray-400 text-sm">{suffix}</span>
        )}
      </div>
    </div>
  );

  const ValuationCalculator = () => {
    const [tab, setTab] = useState("convertible");
  
    return (
      <div >  
        <div className="w-full max-w-4xl bg-[#101010] p-6 rounded-lg shadow-lg grid grid-cols-2 gap-4">
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
            <select className="w-full p-2 bg-[#101010] rounded-md border border-gray-700">
              <option>YES</option>
              <option>NO</option>
            </select>
          </div>
          
          <InputField label="Future round (Investment)" placeholder="Enter value" />
          <InputField label="Equity (New investor)" placeholder="Enter value" />
          <InputField label="No of shares existing before new round" placeholder="Enter value" />
          <InputField label="Equity (CN investor)" placeholder="Enter value" />
          <InputField label="Final equity (Founders)" placeholder="Enter value" />
        </div>
        
        <p className="text-gray-500 text-sm mt-4">Powered by <span className="font-bold">VERTX</span></p>
      </div>
    );
  };



const SafeInvestmentForm = () => {
  const [formData, setFormData] = useState({    investment: "",    valuationCap: "",    preMoneyValuation: "",    futureRound: "",    sharesBefore: "",
    postMoneyValuation: "",    costPerShare: "",    totalShares: "",    equityInvestor: "",    finalEquity: "",  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full">
      

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>SAFE Investment</label>
          <input type="text" name="investment" value={formData.investment} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" placeholder="Enter the amount" />
        </div>
        <div>
          <label>Post money valuation</label>
          <input type="text" name="postMoneyValuation" value={formData.postMoneyValuation} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>

        <div>
          <label>Valuation Cap</label>
          <input type="text" name="valuationCap" value={formData.valuationCap} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>
        <div>
          <label>Cost per share (SAFE investor)</label>
          <input type="text" name="costPerShare" value={formData.costPerShare} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>

        <div>
          <label>Pre money valuation</label>
          <input type="text" name="preMoneyValuation" value={formData.preMoneyValuation} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>
        <div>
          <label>Total receivable shares (SAFE investor)</label>
          <input type="text" name="totalShares" value={formData.totalShares} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>

        <div>
          <label>Future round (Investment)</label>
          <input type="text" name="futureRound" value={formData.futureRound} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>
        <div>
          <label>Equity (SAFE investor)</label>
          <input type="text" name="equityInvestor" value={formData.equityInvestor} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>

        <div>
          <label>No of shares existing before new round</label>
          <input type="text" name="sharesBefore" value={formData.sharesBefore} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>
        <div>
          <label>Final equity (Founders)</label>
          <input type="text" name="finalEquity" value={formData.finalEquity} onChange={handleChange} className="w-full p-2 bg-black border-2 border-gray-500 text-white rounded" />
        </div>
      </div>

      <p className="text-center mt-4 text-gray-400">Powered by <strong>VERTX</strong></p>
    </div>
  );
};




  function ConvertibleNoteForm({setFutureRound}) {
    return (
      <div>
        <h2 className="text-lg bg-[#101010] font-semibold mb-4">Convertible Note Investment</h2>
        <InputField label="Convertible note Investment" />
        <InputField label="Interest rate (%)" />
        <InputField label="Maturity (in years)" />
        <InputField label="Discount (%)" />
        <InputField label="Valuation Cap" />
        <InputField label="Company Valuation before investment" />
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Future investment round</label>
          <select
            className="w-full bg-[#101010] p-2 rounded-lg mt-1"
            onChange={(e) => setFutureRound(e.target.value)}
          >
            <option value="YES">YES</option>
            <option value="NO">NO</option>
          </select>
        </div>
  
        <p className="text-sm text-white bg-black p-2 rounded-lg">
          Investment will be considered as a loan if you’re not raising a future
          round or before the maturity period.
        </p>
      </div>
    );
  }


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
  const [investmentType, setInvestmentType] = useState("convertible"); // 'convertible' or 'safe'
  const [futureRound, setFutureRound] = useState("YES"); // 'YES' or 'NO'
  

  const faqs = [
    {
      question: "Why do startups prefer SAFE over Convertible Notes?",
      answer: "SAFE agreements are simpler because they do NOT accrue interest or have a maturity date. Startups don’t risk defaulting on debt, making SAFE agreements less risky."
    },
    {
      question: "When do Convertible Notes & SAFE Agreements convert into equity?",
      answer: "They convert during a qualified funding round when the company raises a priced round (Series A or later)."
    },
    {
      question: "What happens if a startup never raises a priced round?",
      answer: "Convertible Notes: The startup must repay the investor if the maturity date passes.SAFE Agreements: The investor waits indefinitely since there is no repayment obligation."
    },
      {
      question: " Are Convertible Notes & SAFE Agreements good for investors?",
      answer: "Yes! Investors get an early entry at a discounted price or lower valuation cap, making their investment more valuable when the company grows."
    },
     {
      question: "Can startups raise both SAFE and Convertible Notes?",
      answer: "Yes, but it’s uncommon. Most startups pick one because combining them complicates cap table management."
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
  <div className="pl-12">
    <div className="mb-8">
    
      <h1 className="text-4xl font-bold mb-8">Convertible Notes and SAFE</h1>
        <p className="text-xl mb-4">
        A Convertible Note is a type of loan that turns into company shares in a future funding round. Instead of repaying the investor in cash, the startup gives them shares at a lower price or a set valuation.SAFE (Simple Agreement for Future Equity)  </p>
        
        <div className="space-y-6 text-gray-300 mb-12">
          <div>
            <h5 className="text-xl font-bold mb-4">A SAFE Agreement is an investment contract that allows investors to buy shares in the future. Unlike a Convertible Note, it is not a loan and does not have an interest rate or repayment requirement.</h5>
            <ul className="space-y-2 text-lg">
              <li>A Convertible Note is a loan that later converts into shares</li>
              <li>A SAFE Agreement is an investment promise that converts into shares later without repayment risk</li>
              
            </ul>
          </div>
          
        
        </div>
      </div>


      <div className="mb-12">
  <h2 className="text-2xl font-bold mb-6">Just remember</h2>
  <div className="border-2 border-gray-500 rounded-lg overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="bg-black-200">
          <th className="p-5 text-left text-lg border-r-2 border-gray-500">Term</th>
          <th className="p-5 text-left text-lg">Definition</th>
        </tr>
      </thead>
      <tbody className="text-gray-300">
        <tr className="border-t-2 border-b-2 border-gray-500">
          <td className="p-5 border-r-2 border-gray-500">Discount Rate</td>
          <td className="p-5"> A lower share price for early investors when the company raises a new funding round. (Separate tabular format)</td>
        </tr>
        <tr className="border-t-2 border-gray-500">
          <td className="p-5 border-r-2 border-gray-500">Valuation Cap</td>
          <td className="p-5"> A limit on the company’s valuation for early investors.</td>
        </tr>
        <tr className="border-t-2 border-gray-500">
          <td className="p-5 border-r-2 border-gray-500">Interest Rate (only for Convertible Notes)</td>
          <td className="p-5"> Convertible Notes collect interest (often 5-8% per year) before they turn into shares.</td>
        </tr>
        <tr className="border-t-2 border-gray-500">
          <td className="p-5 border-r-2 border-gray-500">Maturity Date (only for Convertible Notes)</td>
          <td className="p-5"> The date when the note must be repaid or converted into shares.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>



      {/* Definitions Table */}
      {/* min-h-screen flex items-center justify-center  */}
      <div className=" p-4">
      <div className="bg-[#101010] text-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        {/* Header Toggle */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              investmentType === "convertible" ? "bg-white text-black" : "bg-black"
            }`}
            onClick={() => setInvestmentType("convertible")}
          >
            CONVERTIBLE NOTE
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              investmentType === "safe" ? "bg-white text-black" : "bg-black"
            }`}
            onClick={() => setInvestmentType("safe")}
          >
            SAFE
          </button>
        </div>

        {/* Forms */}
        {investmentType === "convertible" ? (
          futureRound === "NO" ? (
            <ValuationCalculator />
          ) : (
            <ConvertibleNoteForm setFutureRound={setFutureRound} />
          )
        ) : (
          <SafeInvestmentForm />
        )}
      </div>
    </div>

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
  )
}

