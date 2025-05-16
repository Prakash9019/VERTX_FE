import React, { useState, useEffect } from "react"
import "../categories/style.css"

export default function FinancialModeling({ onClose }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [investment, setInvestment] = useState("");
  const [equity, setEquity] = useState("");
  const [preMoney, setPreMoney] = useState(null);
  const [postMoney, setPostMoney] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [showDropdown, setShowDropdown] = useState(false);

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

  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [expenses, setExpenses] = useState("");
  const [taxes, setTaxes] = useState("");

  const grossProfit = parseFloat(revenue || 0) - parseFloat(cogs || 0);
  const netProfit = grossProfit - parseFloat(expenses || 0) - parseFloat(taxes || 0);

  const faqs = [
    {
      question: "What are the three main financial statements?",
      answer: "1. Income Statement - Shows revenue, expenses, and net profit.\n2. Balance Sheet - Shows assets, liabilities, and equity.\n3. Cash Flow Statement – Tracks cash movements."
    },
    {
      question: "How is Net Profit Calculated?",
      answer: "Net Profit = Revenue - COGS - Operating Expenses - Taxes"
    },
    {
      question: "What is Burn Rate, and why is it important?",
      answer: "Burn rate is the amount of money a startup spends per month. It helps determine how long a startup can operate before running out of cash (runway).\nRunway = Available Cash/Monthly Burn Rate"
    }
  ]

  return (
    <div className="fixed inset-0  flex justify-center items-center z-250">
      <div className="w-[95%] md:w-[85%] lg:w-[70%] bg-black rounded-2xl border border-[#75757569] p-3 md:p-6 pb-6 md:pb-10 h-[90%] md:h-[95%] overflow-hidden relative">
        <div className="h-full overflow-y-auto scrollbar-hide">
          <div className="flex flex-col">
            {/* Back button inside the scrollable area */}
            <div className="flex justify-end p-2 md:p-6">
              <button 
                onClick={onClose}
                className="text-white  rounded-full transition-colors"
              >
                  <svg width="40" height="40" viewBox="0 0 32 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.25" y="0.25" width="31.5" height="25.5" rx="12.75" stroke="#757575" stroke-width="0.5"/>
<path d="M12.9834 8.04688L15.7861 12.251L18.5957 8.04688H19.5938L16.2988 12.9482L19.6963 18H18.6914L15.7861 13.6592L12.8809 18H11.8828L15.2803 12.9482L11.9854 8.04688H12.9834Z" fill="#757575"/>
</svg>
              </button>
            </div>

            {/* Main content with responsive padding */}
            <div className="px-3 md:pl-16 md:pr-6 w-full md:w-[90%] mx-auto">
              <div>
                <div className="mb-6 md:mb-8">
                  <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8">Accounting and Finance</h1>
                  
                  <div className="space-y-4 md:space-y-6 text-gray-300 mb-8 md:mb-12">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Financial Modeling</h2>
                      <p className="text-base md:text-lg">Financial modeling involves forecasting a company's financial performance using spreadsheets or software. It helps in:</p>
                      <ul className="space-y-1 md:space-y-2 text-base md:text-lg list-disc pl-5 md:pl-8 mt-1 md:mt-2">
                        <li>Startup Valuation & Fundraising</li>
                        <li>Revenue & Expense Forecasting</li>
                        <li>Profitability Analysis</li>
                        <li>Investment & Decision Making</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Accounting</h2>
                      <p className="text-base md:text-lg">Accounting is the process of recording, summarizing, and reporting financial transactions. It ensures:</p>
                      <ul className="space-y-1 md:space-y-2 text-base md:text-lg list-disc pl-5 md:pl-8 mt-1 md:mt-2">
                        <li>Financial Transparency for investors</li>
                        <li>Tax Compliance for legal operations</li>
                        <li>Budgeting & Expense Management</li>
                      </ul>
                    </div>

                    <div className="mb-6 md:mb-12">
                      <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-6">Just remember</h2>
                      <div className="border-2 border-white rounded-lg overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="bg-black-200">
                              <th className="p-2 md:p-5 text-left text-sm md:text-lg border-r-2 border-gray-500">Term</th>
                              <th className="p-2 md:p-5 text-left text-sm md:text-lg">Definition</th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-300">
                            <tr className="border-t-2 border-b-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">Revenue</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">The total income generated from sales.</td>
                            </tr>
                            <tr className="border-t-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">Gross Profit</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">Revenue minus Cost of Goods Sold (COGS).</td>
                            </tr>
                            <tr className="border-t-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">Net Profit (Net Income)</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">Profit after deducting all expenses.</td>
                            </tr>
                            <tr className="border-t-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">EBITDA</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">Earnings before Interest, Taxes, Depreciation, and Amortization.</td>
                            </tr>
                            <tr className="border-t-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">Balance Sheet</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">A financial statement showing assets, liabilities, and equity.</td>
                            </tr>
                            <tr className="border-t-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">Income Statement</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">A statement that reports revenue, expenses, and profits.</td>
                            </tr>
                            <tr className="border-t-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">Cash Flow Statement</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">A statement that tracks cash inflows and outflows.</td>
                            </tr>
                            <tr className="border-t-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">Burn Rate</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">The rate at which a company spends money before becoming profitable.</td>
                            </tr>
                            <tr className="border-t-2 border-gray-500">
                              <td className="p-2 md:p-5 border-r-2 border-gray-500 text-sm md:text-base">Break-Even Point</td>
                              <td className="p-2 md:p-5 text-sm md:text-base">The point where total revenue equals total costs.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Calculator Section */}
                <div className="mb-8 md:mb-12">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Revenue Calculator</h2>
                  <div className="flex flex-col space-y-4 md:space-y-6">
                    {/* Calculator - full width on mobile */}
                    <div className="bg-[#101010] border-2 border-white rounded-2xl p-4 md:p-6 shadow-xl w-full">
                      <div className="mb-4 md:mb-6">
                        <label className="block font-semibold mb-1 md:mb-2 text-sm md:text-base">Total Revenue</label>
                        <div className="relative">
                          <input
                            type="number"
                            value={revenue}
                            onChange={(e) => setRevenue(e.target.value)}
                            placeholder="Enter value"
                            className="w-full p-1 md:p-2 bg-black border border-gray-700 rounded-md text-white pr-12 md:pr-16 placeholder-[#757575] text-sm md:text-base"
                            style={{ borderColor: '#757575' }}
                          />
                          <div className="absolute right-0 top-0 h-full">
                            <button
                              className="w-8 mt-2 md:w-10 h-5 md:h-6 mr-1 md:mr-2 bg-transparent text-gray-400 text-xs md:text-sm flex items-center justify-center border border-white rounded"
                              onClick={() => setShowDropdown(!showDropdown)}
                            >
                              {currency}
                            </button>

                            {showDropdown && (
                              <div className="absolute right-0 top-full mt-1 bg-gray-900 border border-gray-700 rounded shadow-lg z-10">
                                <button
                                  className="w-full px-3 md:px-4 py-1 md:py-2 text-left text-white hover:bg-gray-800 text-xs md:text-sm"
                                  onClick={() => {setCurrency("USD"); setShowDropdown(false);}}
                                >
                                  USD
                                </button>
                                <button
                                  className="w-full px-3 md:px-4 py-1 md:py-2 text-left text-white hover:bg-gray-800 text-xs md:text-sm"
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
                        <label className="block font-semibold mb-2">Cost of Goods Sold (COGS)</label>
                        <input
                          type="number"
                          value={cogs}
                          onChange={(e) => setCogs(e.target.value)}
                          className="w-full p-1 md:p-2 bg-black border border-gray-700 rounded-md text-white pr-12 md:pr-16 placeholder-[#757575] text-sm md:text-base"
                          style={{ borderColor: '#757575' }}
                          placeholder="Enter value"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-semibold mb-2">Other Expenses (if any)</label>
                        <input
                          type="number"
                          value={expenses}
                          onChange={(e) => setExpenses(e.target.value)}
                          className="w-full p-1 md:p-2 bg-black border border-gray-700 rounded-md text-white pr-12 md:pr-16 placeholder-[#757575] text-sm md:text-base"
                          style={{ borderColor: '#757575' }}
                          placeholder="Enter value"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-semibold mb-2">Taxes (if any)</label>
                        <input
                          type="number"
                          value={taxes}
                          onChange={(e) => setTaxes(e.target.value)}
                          className="w-full p-1 md:p-2 bg-black border border-gray-700 rounded-md text-white pr-12 md:pr-16 placeholder-[#757575] text-sm md:text-base"
                          style={{ borderColor: '#757575' }}
                          placeholder="Enter value"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-semibold mb-2">Gross Profit</label>
                        <input
                          type="text"
                          value={grossProfit || ""}
                          className="w-full p-1 md:p-2 bg-black border border-gray-700 rounded-md text-white pr-12 md:pr-16 placeholder-[#757575] text-sm md:text-base"
                          style={{ borderColor: '#757575' }}
                          readOnly
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block font-semibold mb-2">Net Profit</label>
                        <input
                          type="text"
                          value={netProfit || ""}
                          className="w-full p-1 md:p-2 bg-black border border-gray-700 rounded-md text-white pr-12 md:pr-16 placeholder-[#757575] text-sm md:text-base"
                          style={{ borderColor: '#757575' }}
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col justify-center items-center mt-4 md:mt-8">
                        <p className="text-center text-xs md:text-sm text-gray-400">Powered by</p>
                        <svg width="60" height="24" viewBox="0 0 47 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 md:w-20">
                          <path d="M6.72 0.799999H8.656V8.176L5.008 12H3.584L0.944 8.096V0.799999H2.88V7.728L4.416 10.016L6.72 7.6V0.799999ZM11.8498 0.799999H18.0898V2.608H12.5858L12.2978 2.928V5.44H15.9938V7.248H12.2978V9.488L12.7618 10.192H18.0898V12H11.8018L10.3618 9.856V2.32L11.8498 0.799999ZM20.1155 0.799999H25.9875L27.8595 3.536V5.408L26.3875 6.928L27.8595 9.088V12H25.9235V9.424L24.4675 7.296H22.8995L22.0515 6.768V12H20.1155V0.799999ZM22.0515 2.608V5.488H25.2995L25.9235 4.848V3.92L25.0115 2.608H22.0515ZM29.4053 0.799999H37.7573V2.608H33.5013L34.5573 3.552V12H32.6213V4L32.1573 2.608H29.4053V0.799999ZM44.791 0.799999H46.727V4.208L45.207 5.76L46.727 7.984V12H44.791V8.352L43.975 7.216H43.239L41.559 8.976V12H39.623V8.368L41.143 6.816L39.623 4.592V0.799999H41.559V4.224L42.343 5.408H43.111L44.791 3.648V0.799999Z" fill="white"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQs Section */}
                <div className="mb-8 md:mb-12">
                  <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">FAQs</h2>
                  <div className="space-y-3 md:space-y-4">
                    {faqs.map((faq, idx) => (
                      <details key={idx} className="border rounded-lg px-3 md:px-6 py-2 md:py-4" style={{ borderColor: "#757575" }}>
                        <summary className="text-base md:text-lg font-semibold cursor-pointer">{faq.question}</summary>
                        <p className="mt-2 text-sm md:text-base text-gray-300">{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
