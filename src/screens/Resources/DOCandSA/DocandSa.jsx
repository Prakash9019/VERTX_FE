import React, { useState, useEffect } from "react"
import logo from "../../../logo.png"

const InputField = ({ label, placeholder, suffix, small, value, onChange, name, readOnly }) => (
  <div className="mb-4">
    <label className="block text-sm mb-2">{label}</label>
    <div className="relative">
      <input
        type="text"
        placeholder={readOnly ? "" : "Enter value"}
        className="w-full p-2 bg-black rounded border text-[#757575] placeholder-gray-600" 
        style={{ borderColor: '#757575' }}
        value={value}
        onChange={onChange}
        name={name}
        readOnly={readOnly}
      />
      {suffix && (
        <span className="absolute right-3 top-2 text-gray-400 text-sm">{suffix}</span>
      )}
    </div>
    {small && <p className="text-xs text-gray-500 mt-1">{small}</p>}
  </div>
);

const CurrencyToggleInput = ({ label, placeholder, value, onChange, name }) => {
  const [currency, setCurrency] = useState("USD");
  const [showDropdown, setShowDropdown] = useState(false);
  
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          className="w-full p-2 bg-black rounded border text-[#757575] placeholder-gray-600" 
          style={{ borderColor: '#757575', color: '#757575' }}
          value={value}
          onChange={onChange}
          name={name}
        />
        <div className="absolute right-0 top-0 h-full">
          <button 
            className="h-full px-3 bg-transparent text-gray-400 text-sm flex items-center justify-center"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {currency}
          </button>
          {showDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
              <button 
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                onClick={() => {setCurrency("USD"); setShowDropdown(false);}}
              >
                USD
              </button>
              <button 
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                onClick={() => {setCurrency("INR"); setShowDropdown(false);}}
              >
                INR
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ValuationCalculator = () => {
  const [tab, setTab] = useState("convertible");

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <CurrencyToggleInput label="Convertible note Investment" placeholder="Enter the amount" />
          <InputField label="Interest rate (%)"  />
          <InputField label="Maturity (in years)" />
          <InputField label="Discount (%)" />
          <InputField label="Valuation Cap" />
          <InputField label="Pre money valuation" />

          <div className="mb-4">
            <label className="block text-sm mb-2">Future investment round</label>
            <div className="inline-block">
              <select className="bg-black rounded-full border border-gray-700 text-white appearance-none px-4 py-2">
                <option>YES</option>
                <option>NO</option>
              </select>
            </div>
          </div>

          <InputField label="Future round (Investment)" />
          <InputField label="No of shares existing before new round" />
        </div>

        <div>
          <InputField label="Cost per share (new investor)" />
          <InputField label="Cost per share (convertible note investor)" />
          <InputField label="Post money valuation" />
          <InputField label="Total receivable shares (new investor)" />
          <InputField label="Total receivable shares (CN investor)" />
          <InputField 
            label="Total receivable shares (CN investor as per valcap)" 
            small="*This method is considered if val-cap is lower than pre-money" 
          />
          <InputField label="Equity (New investor)" />
          <InputField label="Equity (CN investor)" />
          <InputField label="Final equity (Founders)" />
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-gray-500 text-sm">Powered by <span className="font-bold">VERTX</span></p>
      </div>
    </div>
  );
};

const SafeInvestmentForm = () => {
  const [formData, setFormData] = useState({
    investment: "",
    valuationCap: "",
    discount: "",
    preMoneyValuation: "",
    futureRound: "",
    sharesBefore: "",
    postMoneyValuation: "",
    costPerShareNew: "",
    costPerShareSafe: "",
    totalSharesNew: "",
    totalSharesSafe: "",
    equitySafe: "",
    finalEquity: "",
  });
  const [currency, setCurrency] = useState("USD");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFutureRoundDropdown, setShowFutureRoundDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("YES");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
      
      // Calculate derived values if all required fields are filled
      if (
        newData.investment && 
        newData.valuationCap && 
        newData.discount && 
        newData.preMoneyValuation && 
        newData.futureRound && 
        newData.sharesBefore
      ) {
        // 1. Cost per share (new investor)
        const costPerShareNew = parseFloat(newData.preMoneyValuation) / parseFloat(newData.sharesBefore);
        newData.costPerShareNew = costPerShareNew.toFixed(4);
        
        // 2. Cost per share (SAFE investor) with discount
        const discountRate = 1 - (parseFloat(newData.discount) / 100);
        const costPerShareSafe = costPerShareNew * discountRate;
        newData.costPerShareSafe = costPerShareSafe.toFixed(4);
        
        // 3. Post money valuation
        const postMoneyValuation = parseFloat(newData.futureRound) + parseFloat(newData.preMoneyValuation);
        newData.postMoneyValuation = postMoneyValuation.toFixed(2);
        
        // 4. Total receivable shares (new investor)
        const totalSharesNew = parseFloat(newData.futureRound) / costPerShareNew;
        newData.totalSharesNew = totalSharesNew.toFixed(2);
        
        // 5. Total receivable shares (SAFE investor)
        const valCapRatio = parseFloat(newData.preMoneyValuation) / parseFloat(newData.valuationCap);
        const totalSharesSafe = parseFloat(newData.investment) / (costPerShareNew / valCapRatio);
        newData.totalSharesSafe = totalSharesSafe.toFixed(2);
        
        // 6. Founder shares (not shown in UI but needed for calculations)
        const founderShares = parseFloat(newData.sharesBefore) - totalSharesNew - totalSharesSafe;
        
        // 7. Total shares cap
        const totalSharesCap = founderShares + totalSharesNew + totalSharesSafe;
        
        // 8. Equity (SAFE investor)
        const equitySafe = (totalSharesSafe / totalSharesCap) * 100;
        newData.equitySafe = equitySafe.toFixed(2);
        
        // 9. Final Equity (Founders)
        const finalEquity = (founderShares / totalSharesCap) * 100;
        newData.finalEquity = finalEquity.toFixed(2);
      }
      
      return newData;
    });
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setShowFutureRoundDropdown(false);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm mb-2">SAFE Investment</label>
            <div className="relative">
              <input
                type="text"
                name="investment"
                value={formData.investment}
                onChange={handleChange}
                className="w-full p-2 bg-black rounded border text-[#757575] placeholder-gray-600" 
                style={{ borderColor: '#757575', color:'#757575cost'}}
                placeholder="Enter the amount"
              />
              <div className="absolute right-0 top-0 h-full">
                <button 
                  className="w-10 h-6 mr-2 mt-2 bg-transparent text-gray-400 text-sm flex items-center justify-center border border-white rounded"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {currency}
                </button> 

                {showDropdown && (
                  <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                    <button 
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                      onClick={() => {setCurrency("USD"); setShowDropdown(false);}}
                    >
                      USD
                    </button>
                    <button 
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                      onClick={() => {setCurrency("INR"); setShowDropdown(false);}}
                    >
                      INR
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Valuation Cap</label>
            <input
              type="text"
              name="valuationCap"
              value={formData.valuationCap}
              onChange={handleChange}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
                              style={{ borderColor: '#757575', color:'#757575'}}
                placeholder="Enter value"
            />


          </div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Discount (%)</label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
                              style={{ borderColor: '#757575', color:'#757575'}}
                placeholder="Enter value"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Pre money valuation</label>
            <input
              type="text"
              name="preMoneyValuation"
              value={formData.preMoneyValuation}
              onChange={handleChange}
              className="w-full p-2 bg-black rounded border text-white placeholder-gray-600" 
                              style={{ borderColor: '#757575', color:'#757575'}}
                placeholder="Enter value"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Future round (Investment)</label>
            <input
              type="text"
              name="futureRound"
              value={formData.futureRound}
              onChange={handleChange}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
                              style={{ borderColor: '#757575', color:'#757575'}}
                placeholder="Enter value"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">No of shares existing before new round</label>
            <input
              type="text"
              name="sharesBefore"
              value={formData.sharesBefore}
              onChange={handleChange}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
                              style={{ borderColor: '#757575', color:'#757575'}}
                placeholder="Enter value"
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-sm mb-2">Post money valuation</label>
            <input
              type="text"
              name="postMoneyValuation"
              value={formData.postMoneyValuation}
              onChange={handleChange}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
              style={{ borderColor: '#757575' }}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Cost per share (new investor)</label>
            <input
              type="text"
              name="costPerShareNew"
              value={formData.costPerShareNew}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
              style={{ borderColor: '#757575' }}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Cost per share (SAFE investor)</label>
            <input
              type="text"
              name="costPerShareSafe"
              value={formData.costPerShareSafe}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
              style={{ borderColor: '#757575' }}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Total receivable shares (new investor)</label>
            <input
              type="text"
              name="totalSharesNew"
              value={formData.totalSharesNew}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
              style={{ borderColor: '#757575' }}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Total receivable shares (SAFE investor)</label>
            <input
              type="text"
              name="totalSharesSafe"
              value={formData.totalSharesSafe}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
              style={{ borderColor: '#757575' }}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Equity (SAFE investor)</label>
            <input
              type="text"
              name="equitySafe"
              value={formData.equitySafe}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
              style={{ borderColor: '#757575' }}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2">Final equity (Founders)</label>
            <input
              type="text"
              name="finalEquity"
              value={formData.finalEquity}
              className="w-full p-2 bg-black border text-white rounded placeholder-gray-600"
              style={{ borderColor: '#757575' }}
              readOnly
            />
          </div>
        </div>
      </div>

    </div>
  );
};

function ConvertibleNoteForm({ setFutureRound }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [selectedOption, setSelectedOption] = useState("NO"); // Changed default to "NO"
  
  const [formData, setFormData] = useState({
    investment: "",
    interestRate: "",
    maturity: "",
    discount: "",
    valuationCap: "",
    preMoneyValuation: "",
    futureRound: "",
    sharesBefore: "",
    costPerShareNew: "",
    costPerShareCN: "",
    postMoneyValuation: "",
    totalSharesNew: "",
    totalSharesCN: "",
    totalSharesCNValcap: "",
    equityNew: "",
    equityCN: "",
    finalEquity: "",
  });

  useEffect(() => {
    // Set initial value to "NO" when component mounts
    setFutureRound("NO");
  }, [setFutureRound]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
      
      // Only calculate if all necessary fields are filled and future round is YES
      if (
        selectedOption === "YES" &&
        newData.investment && 
        newData.interestRate && 
        newData.maturity && 
        newData.discount && 
        newData.valuationCap && 
        newData.preMoneyValuation && 
        newData.futureRound && 
        newData.sharesBefore
      ) {
        // 1. Cost per share (new investor)
        const costPerShareNew = parseFloat(newData.sharesBefore) / parseFloat(newData.preMoneyValuation);
        newData.costPerShareNew = costPerShareNew.toFixed(4);
        
        // 2. Cost per share (CN investor) with discount
        const discountRate = parseFloat(newData.discount) / 100;
        const costPerShareCN = costPerShareNew - (costPerShareNew * discountRate);
        newData.costPerShareCN = costPerShareCN.toFixed(4);
        
        // 3. Post money valuation
        const postMoneyValuation = parseFloat(newData.futureRound) + parseFloat(newData.preMoneyValuation);
        newData.postMoneyValuation = postMoneyValuation.toFixed(2);
        
        // 4. Total receivable shares (new investor)
        const totalSharesNew = parseFloat(newData.futureRound) / costPerShareNew;
        newData.totalSharesNew = totalSharesNew.toFixed(2);
        
        // 5. Total receivable shares (CN investor)
        const totalInvestmentWithInterest = parseFloat(newData.investment) + 
          (parseFloat(newData.investment) * parseFloat(newData.interestRate)/100 * parseFloat(newData.maturity));
        const totalSharesCN = totalInvestmentWithInterest / costPerShareCN;
        newData.totalSharesCN = totalSharesCN.toFixed(2);
        
        // 6. Total receivable shares (CN investor as per valcap)
        const valCapRatio = parseFloat(newData.preMoneyValuation) / parseFloat(newData.valuationCap);
        const totalSharesCNValcap = parseFloat(newData.investment) / (costPerShareCN / valCapRatio);
        newData.totalSharesCNValcap = totalSharesCNValcap.toFixed(2);
        
        // 7. Founder shares
        const founderShares = parseFloat(newData.sharesBefore) - totalSharesNew - 
          (totalSharesCN > totalSharesCNValcap ? totalSharesCNValcap : totalSharesCN);
        
        // 8. Total shares cap
        const totalSharesCap = parseFloat(newData.sharesBefore);
        
        // 9. Equity (New investor)
        const equityNew = (totalSharesNew / totalSharesCap) * 100;
        newData.equityNew = equityNew.toFixed(2);
        
        // 10. Equity (CN investor)
        const sharesUsed = totalSharesCN > totalSharesCNValcap ? totalSharesCNValcap : totalSharesCN;
        const equityCN = (sharesUsed / totalSharesCap) * 100;
        newData.equityCN = equityCN.toFixed(2);
        
        // 11. Final Equity (Founders)
        const finalEquity = (founderShares / totalSharesCap) * 100;
        newData.finalEquity = finalEquity.toFixed(2);
      }
      
      return newData;
    });
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFutureRound(option);
    setShowDropdown(false);
  };

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    setShowCurrencyDropdown(false);
  };

  return (
    <div className={selectedOption === "NO" ? "max-w-md mx-auto" : "grid grid-cols-2 gap-6"}>
      <div>
        <div className="mb-4">
          <label className="block text-sm mb-2">Convertible note Investment</label>
          <div className="relative">
            <input
              type="text"
              name="investment"
              value={formData.investment}
              onChange={handleInputChange}
              placeholder="Enter the amount"
              className="w-full p-2 bg-black rounded border text-white pr-16 placeholder-gray-600"
              style={{ borderColor: '#757575' }}
            />
            <div className="absolute right-0 top-0 h-full">
              <button 
                className="w-10 h-6 mr-2 mt-2 bg-transparent text-gray-400 text-sm flex items-center justify-center border border-white rounded"
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              >
                {currency}
              </button>

              {showCurrencyDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                  <button 
                    className="w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                    onClick={() => handleCurrencyChange("USD")}
                  >
                    USD
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                    onClick={() => handleCurrencyChange("INR")}
                  >
                    INR
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <InputField 
          label="Interest rate (%) " 
          name="interestRate"
          value={formData.interestRate}
          onChange={handleInputChange}
          placeholder="Enter value"
        />
        <InputField 
          label="Maturity (in years)" 
          name="maturity"
          value={formData.maturity}
          onChange={handleInputChange}
          placeholder="Enter value"
        />
        <InputField 
          label="Discount (%)" 
          name="discount"
          value={formData.discount}
          onChange={handleInputChange}
          placeholder="Enter value"
        />
        <InputField 
          label="Valuation Cap" 
          name="valuationCap"
          value={formData.valuationCap}
          onChange={handleInputChange}
          placeholder="Enter value"
        />
        <InputField 
          label="Pre money valuation" 
          name="preMoneyValuation"
          value={formData.preMoneyValuation}
          onChange={handleInputChange}
          placeholder="Enter value"
        />

        <div className="mb-4 pt-3 mt-6">
          <label className="block text-sm mb-2">Future investment round</label>
          <div className="relative">
            <button 
              className="bg-black rounded-full border border-gray-700 text-white px-4 py-2 flex items-center justify-between w-20"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{selectedOption}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute mt-1 w-20 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                <button 
                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                  onClick={() => handleOptionChange("YES")}
                >
                  YES
                </button>
                <button 
                  className="w-full px-4 py-2 text-left text-white hover:bg-gray-800"
                  onClick={() => handleOptionChange("NO")}
                >
                  NO
                </button>
              </div>
            )}
          </div>
        </div>

        {selectedOption === "NO" && (
          <div className="mt-4 p-4 bg-black border border-white rounded text-white">
            Investment will be considered as a loan, if you're not raising future round or before maturity period
          </div>
        )}

        {selectedOption === "YES" && (
          <>
            <InputField 
              label="Future round (Investment)" 
              name="futureRound"
              value={formData.futureRound}
              onChange={handleInputChange}
              placeholder="Enter value"
            />
            <InputField 
              label="No of shares existing before new round" 
              name="sharesBefore"
              value={formData.sharesBefore}
              onChange={handleInputChange}
              placeholder="Enter value"
            />
          </>
        )}
      </div>

      {selectedOption === "YES" && (
        <div>
          <InputField 
            label="Cost per share (new investor)" 
            value={formData.costPerShareNew}
            readOnly
          />
          <InputField 
            label="Cost per share (convertible note investor)" 
            value={formData.costPerShareCN}
            readOnly
          />
          <InputField 
            label="Post money valuation" 
            value={formData.postMoneyValuation}
            readOnly
          />
          <InputField 
            label="Total receivable shares (new investor)" 
            value={formData.totalSharesNew}
            readOnly
          />
          <InputField 
            label="Total receivable shares (CN investor)" 
            value={formData.totalSharesCN}
            readOnly
          />
          <InputField 
            label="Total receivable shares (CN investor as per valcap)" 
            small="*This method is considered if val-cap is lower than pre-money" 
            value={formData.totalSharesCNValcap}
            readOnly
          />
          <InputField 
            label="Equity (New investor)" 
            value={formData.equityNew}
            readOnly
          />
          <InputField 
            label="Equity (CN investor)" 
            value={formData.equityCN}
            readOnly
          />
          <InputField 
            label="Final equity (Founders)" 
            value={formData.finalEquity}
            readOnly
          />
        </div>
      )}
    </div>
  );
}

export default function DocandSa({ onClose }) {
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
  ]);
  const [newFounderName, setNewFounderName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [investmentType, setInvestmentType] = useState("convertible");
  const [futureRound, setFutureRound] = useState("NO");


  const faqs = [
    {
      question: "Why do startups prefer SAFE over Convertible Notes?",
      answer: "SAFE agreements are simpler because they do NOT accrue interest or have a maturity date. Startups don't risk defaulting on debt, making SAFE agreements less risky."
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
      question: "Are Convertible Notes & SAFE Agreements good for investors?",
      answer: "Yes! Investors get an early entry at a discounted price or lower valuation cap, making their investment more valuable when the company grows."
    },
    {
      question: "Can startups raise both SAFE and Convertible Notes?",
      answer: "Yes, but it's uncommon. Most startups pick one because combining them complicates cap table management."
    }
  ];

  const [tab, setTab] = useState("convertible");

  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [expenses, setExpenses] = useState("");
  const [taxes, setTaxes] = useState("");

  const grossProfit = revenue - cogs;
  const netProfit = grossProfit - expenses - taxes;

  return (
    <div className="min-h-screen bg-black text-white p-3">
      {/*  */}
      
      <div className="pl-6">
        
        <div className="mb-8">
          
          
          <h1 className="text-4xl font-bold mb-8">Convertible Notes and SAFE</h1>
          <p className="text-xl mb-4">
            A Convertible Note is a type of loan that turns into company shares in a future funding round. Instead of repaying the investor in cash, the startup gives them shares at a lower price or a set valuation. SAFE (Simple Agreement for Future Equity)
          </p>

          <div className="space-y-6 text-xl mb-12">
            <div>
              <h5 className="text-xl font mb-4">A SAFE Agreement is an investment contract that allows investors to buy shares in the future. Unlike a Convertible Note, it is not a loan and does not have an interest rate or repayment requirement.</h5>
              <ul className="space-y-2 text-lg">
                <li>A Convertible Note is a loan that later converts into shares</li>
                <li>A SAFE Agreement is an investment promise that converts into shares later without repayment risk</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Just remember</h2>
          <div className="border-2 border-white rounded-lg overflow-hidden">


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
                  <td className="p-5"> A limit on the company's valuation for early investors.</td>
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

        {/* Calculator Section */}
        <div className="p-4 mb-12">
        <div className="bg-[#121212] text-white p-8 rounded-lg shadow-lg max-w-6xl mx-auto border-2 border-white">

            {/* Header Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-transparent border-2 border-gray-600 rounded-full p-2 flex space-x-2">
                <button
                  className={`px-6 py-2 rounded-full ${
                    investmentType === "convertible" ? "bg-white text-black font-medium" : "bg-transparent"
                  }`}
                  onClick={() => setInvestmentType("convertible")}
                >
                  CONVERTIBLE NOTE
                </button>
                <button
                  className={`px-6 py-2 rounded-full ${
                    investmentType === "safe" ? "bg-white text-black font-medium" : "bg-transparent"
                  }`}
                  onClick={() => setInvestmentType("safe")}
                >
                  SAFE
                </button>
              </div>
            </div>


            {/* Forms */}
            {investmentType === "convertible" ? (
              <ConvertibleNoteForm setFutureRound={setFutureRound} />
            ) : (
              <SafeInvestmentForm />
            )}
            
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">Powered by <span className="font-bold">VERTX</span></p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
          <details key={idx} className="border border-[#757575] rounded-lg px-6 py-4">

                <summary className="text-lg font-semibold cursor-pointer">{faq.question}</summary>
                <p className="mt-2 text-gray-300">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
 












