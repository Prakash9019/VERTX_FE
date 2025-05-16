
"use client"

import React, { useState, useEffect } from "react"
import { Pie, PieChart, Cell } from "recharts"
import "./styles.css"

export default function EquityCalculator({ onClose }) {
  const [founders, setFounders] = useState([
    { id: "1", name: "Co-founder 1", percentage: 50, checks: 0 },
    { id: "2", name: "Co-founder 2", percentage: 50, checks: 0 },
  ])
  const [newFounderName, setNewFounderName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const questions = [
    "Who is the CEO?",
    "Who is pitching investors?",
    "Who is in charge of business development?",
    "Who is in charge of sales?",
    "Who is in charge of product development?",
    "Is this founder working fulltime on the startup before raising funds?",
    "How essential is this founder for the startup to execute?",
    "Does this founder have prior startup founder experience?",
    "Does this founder have relationships with potential customers for the startup?",
    "Does this founder have relationships with potential investors for the startup?",
    "Does this founder have the startup's financial models and projections?",
    "Who had the original idea?",
  ]

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
    },
  ]

  // Function to handle checkbox changes and update equity percentages
  const handleCheckChange = (founderId, questionIndex, checked) => {
    // Get all checkboxes for this question
    const checkedFoundersForQuestion = founders.map(founder => {
      if (founder.id === founderId) {
        return { ...founder, checkedForQuestion: checked };
      }
      return { ...founder, checkedForQuestion: founder.checkedForQuestion || false };
    });
    
    // Count checked founders for this question
    const checkedCount = checkedFoundersForQuestion.filter(f => f.checkedForQuestion).length;
    
    // Calculate percentages per question
    const percentagePerFounder = checkedCount > 0 ? 100 / checkedCount : 0;
    
    // Update founder checks and total checks
    setFounders(prevFounders => {
      // First update the checks for the toggled founder
      const updatedFounders = prevFounders.map(founder => {
        if (founder.id === founderId) {
          return {
            ...founder,
            checks: checked ? founder.checks + 1 : Math.max(0, founder.checks - 1)
          };
        }
        return founder;
      });
      
      // Calculate total checks
      const totalChecks = updatedFounders.reduce((sum, f) => sum + f.checks, 0);
      
      // Update percentages based on checks
      return updatedFounders.map(founder => {
        return {
          ...founder,
          percentage: totalChecks > 0 
            ? Math.round((founder.checks / totalChecks) * 100) 
            : Math.round(100 / updatedFounders.length)
        };
      });
    });
  }

  const addFounder = () => {
    if (newFounderName.trim()) {
      const newFounders = [...founders, {
        id: (founders.length + 1).toString(),
        name: newFounderName.trim(),
        percentage: 0,
        checks: 0
      }];
      
      // Recalculate percentages for equal distribution when no checks exist
      const totalChecks = newFounders.reduce((sum, f) => sum + f.checks, 0);
      if (totalChecks === 0) {
        const equalPercentage = Math.round(100 / newFounders.length);
        newFounders.forEach(f => f.percentage = equalPercentage);
      } else {
        // Recalculate based on existing checks
        newFounders.forEach(f => {
          f.percentage = Math.round((f.checks / totalChecks) * 100) || Math.round(100 / newFounders.length);
        });
      }
      
      setFounders(newFounders);
      setNewFounderName("");
    }
  }

  const removeFounder = (id) => {
    if (founders.length <= 2) {
      alert("You must have at least two founders.");
      return;
    }
    
    const newFounders = founders.filter(f => f.id !== id);
    
    // Recalculate percentages
    const totalChecks = newFounders.reduce((sum, f) => sum + f.checks, 0);
    if (totalChecks === 0) {
      const equalPercentage = Math.round(100 / newFounders.length);
      newFounders.forEach(f => f.percentage = equalPercentage);
    } else {
      newFounders.forEach(f => {
        f.percentage = Math.round((f.checks / totalChecks) * 100) || Math.round(100 / newFounders.length);
      });
    }
    
    setFounders(newFounders);
  }

  const updateFounderName = (id, newName) => {
    setFounders(founders.map(f => 
      f.id === id ? { ...f, name: newName } : f
    ));
  }

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsDialogOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    }
  }, []);

  const predefinedColors = [
    "#000000", "#1A1A1A", "#3B0000", "#5C0002", "#8B0000", "#7D1D1D",
    "#660000", "#4A0404", "#2C2C2C", "#4B0D0D", "#FF0000"
  ];
  
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(predefinedColors[i % predefinedColors.length]); // Cycle through predefined colors
    }
    return colors;
  };
  
  // Generate colors based on current founders count
  const COLORS = generateColors(founders.length);
  

  return (
    <div className="container-main">
      <div className="flex-container">
        <div className="content-wrapper">
          {/* Back button added */}

           
          <div>
            <div className="section-header">
              <h1 className="page-title" style={{ fontSize: "1.875rem" }}>Equity and Cap Table Management</h1>
              
              <div className="intro-section">
                <div>
                  <h2 className="section-title" style={{ fontSize: "1.25rem" }}>What is equity & cap table management?</h2>
                  <ul className="info-list" style={{ fontSize: "0.95rem" }}>
                    <li>Equity refers to ownership in a startup, typically divided among founders, investors, and employees.</li>
                    <li>A Cap Table (Capitalization Table) is a document that tracks:</li>
                    <li className="list-indented">Who owns what % of the company.</li>
                    <li className="list-indented">How ownership changes with fundraising.</li>
                    <li className="list-indented">Dilution effects after new investments.</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="section-title" style={{ fontSize: "1.25rem" }}>Why it is important</h2>
                  <ul className="info-list" style={{ fontSize: "0.95rem" }}>
                    <li>Founders need to track dilution when raising funds.</li>
                    <li>Investors use it to calculate their ownership & exit value.</li>
                    <li>Employees with stock options see their potential earnings.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Definitions Table */}
            <div className="definitions-section">
              <h2 className="section-title" style={{ fontSize: "1.25rem" }}>Just remember</h2>
              <div className="definitions-table-container">
                <table className="definitions-table">
                  <thead>
                    <tr>
                      <th className="th-term" style={{ fontSize: "0.95rem" }}>Term</th>
                      <th className="th-case" style={{ fontSize: "0.95rem" }}>Case</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-row-bordered">
                      <td className="td-term" style={{ fontSize: "0.95rem" }}>Founder Equity</td>
                      <td className="td-case" style={{ fontSize: "0.95rem" }}>The ownership stake of the startup's original founders.</td>
                    </tr>
                    <tr className="table-row-bordered">
                      <td className="td-term" style={{ fontSize: "0.95rem" }}>Dilution</td>
                      <td className="td-case" style={{ fontSize: "0.95rem" }}>The decrease in existing shareholders' ownership when new shares are issued.</td>
                    </tr>
                    <tr className="table-row-bordered">
                      <td className="td-term" style={{ fontSize: "0.95rem" }}>Stock Options (ESOPs)</td>
                      <td className="td-case" style={{ fontSize: "0.95rem" }}>Shares reserved for employees as part of compensation.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculator Section */}
            <div className="calculator-section">
              <h2 className="section-title" style={{ fontSize: "1.25rem" }}>Founder equity calculator</h2>
              <div className="calculator-container">
                <div className="calculator-flex">
                  <div className="calculator-questions">
                    <div className="questions-table-container">
                      <table className="questions-table">
                        <thead>
                          <tr>
                            <th className="th-question" style={{ fontSize: "0.875rem" }}></th>
                            {founders.map(founder => (
                              <th key={founder.id} className="th-founder" style={{ fontSize: "0.875rem" }}>{founder.name}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {questions.map((question, idx) => (
                            <tr key={idx} className="question-row">
                              <td className="td-question" style={{ fontSize: "0.875rem" }}>{question}</td>
                              {founders.map(founder => (
                                <td key={founder.id} className="td-checkbox">
                                  <div className="checkbox-container">
                                    <input
                                      type="checkbox"
                                      className="founder-checkbox"
                                      onChange={(e) => handleCheckChange(founder.id, idx, e.target.checked)}
                                    />
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="pie-chart-container">
                    <div className="pie-chart-wrapper">
                      <div className="pie-chart">
                        <PieChart width={240} height={240}>
                          <Pie
                            data={founders.map(f => ({ name: f.name, value: f.percentage }))}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            innerRadius={40}
                            startAngle={90}
                            endAngle={-270}
                            animationDuration={750}
                            animationBegin={0}
                          >
                            {founders.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </div>
                    </div>

                    <div className="founder-equity-display">
                      {founders.map((founder, idx) => (
                        <div key={founder.id} className="founder-equity-item">
                          <div className="founder-equity-header">
                            <span className="founder-name" style={{ fontSize: "0.95rem" }}>{founder.name}</span>
                            <span className="founder-percentage" style={{ fontSize: "0.95rem" }}>{founder.percentage}%</span>
                          </div>
                          <div className="equity-bar-bg">
                            <div
                              className="equity-bar-fill"
                              style={{ 
                                width: `${founder.percentage}%`,
                                backgroundColor: COLORS[idx % COLORS.length],
                                transition: "width 0.5s ease-in-out, background-color 0.5s ease-in-out"
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={() => setIsDialogOpen(true)}
                        className="manage-founders-btn"
                      >
                      <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 10.5C2.225 10.5 1.98958 10.4021 1.79375 10.2062C1.59792 10.0104 1.5 9.77499 1.5 9.49999V2.49999C1.5 2.22499 1.59792 1.98957 1.79375 1.79374C1.98958 1.5979 2.225 1.49999 2.5 1.49999H6.9625L5.9625 2.49999H2.5V9.49999H9.5V6.02499L10.5 5.02499V9.49999C10.5 9.77499 10.4021 10.0104 10.2063 10.2062C10.0104 10.4021 9.775 10.5 9.5 10.5H2.5ZM4.5 7.49999V5.37499L9.0875 0.787488C9.1875 0.687488 9.3 0.612488 9.425 0.562488C9.55 0.512488 9.675 0.487488 9.8 0.487488C9.93333 0.487488 10.0604 0.512488 10.1813 0.562488C10.3021 0.612488 10.4125 0.687488 10.5125 0.787488L11.2125 1.49999C11.3042 1.59999 11.375 1.7104 11.425 1.83124C11.475 1.95207 11.5 2.07499 11.5 2.19999C11.5 2.32499 11.4771 2.4479 11.4313 2.56874C11.3854 2.68957 11.3125 2.79999 11.2125 2.89999L6.625 7.49999H4.5ZM5.5 6.49999H6.2L9.1 3.59999L8.75 3.24999L8.3875 2.89999L5.5 5.78749V6.49999Z" fill="white"/>
</svg>
                        Manage Co-founders
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="faqs-section">
              <h2 className="section-title" style={{ fontSize: "1.25rem" }}>FAQs</h2>
              <div className="faqs-container">
                {faqs.map((faq, idx) => (
                  <details key={idx} className="faq-item">
                    <summary className="faq-question" style={{ fontSize: "0.95rem" }}>{faq.question}</summary>
                    <p className="faq-answer" style={{ fontSize: "0.875rem" }}>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="footer">
              <div className="footer-content">
                <p style={{ fontSize: "0.75rem" }}>Powered by</p>
                <svg width="47" height="12" viewBox="0 0 47 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.72 0.799999H8.656V8.176L5.008 12H3.584L0.944 8.096V0.799999H2.88V7.728L4.416 10.016L6.72 7.6V0.799999ZM11.8498 0.799999H18.0898V2.608H12.5858L12.2978 2.928V5.44H15.9938V7.248H12.2978V9.488L12.7618 10.192H18.0898V12H11.8018L10.3618 9.856V2.32L11.8498 0.799999ZM20.1155 0.799999H25.9875L27.8595 3.536V5.408L26.3875 6.928L27.8595 9.088V12H25.9235V9.424L24.4675 7.296H22.8995L22.0515 6.768V12H20.1155V0.799999ZM22.0515 2.608V5.488H25.2995L25.9235 4.848V3.92L25.0115 2.608H22.0515ZM29.4053 0.799999H37.7573V2.608H33.5013L34.5573 3.552V12H32.6213V4L32.1573 2.608H29.4053V0.799999ZM44.791 0.799999H46.727V4.208L45.207 5.76L46.727 7.984V12H44.791V8.352L43.975 7.216H43.239L41.559 8.976V12H39.623V8.368L41.143 6.816L39.623 4.592V0.799999H41.559V4.224L42.343 5.408H43.111L44.791 3.648V0.799999Z" fill="white"/>
</svg>
              </div>
            </div>
          </div>

          {/* Custom Dialog */}
          {isDialogOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
<div className="bg-[#101010] p-6 rounded-lg border border-[1px] border-white w-96">

                <h2 className="modal-title">Manage Co-founders</h2>
                <div className="modal-content">
                  <div className="new-founder-form">
                    <input
                      type="text"
                      placeholder="New co-founder name"
                      value={newFounderName}
                      onChange={(e) => setNewFounderName(e.target.value)}
                      className="bg-black text-white placeholder-[#757575] border border-[#757575]  p-2  mr-10 rounded-md"
                    />
                    <button
                      onClick={addFounder}
                      className="bg-[#1E1E1E] pr-4 pl-4 rounded-md"
                    >
                      Add
                    </button>
                  </div>
                  {founders.map(founder => (
                    <div key={founder.id} className="founder-item">
                      <input
                        type="text"
                        value={founder.name}
                        onChange={(e) => updateFounderName(founder.id, e.target.value)}
                        className="bg-black text-white placeholder-[#757575] border border-[#757575]  p-2 rounded-md"
                      />
                      <button
                        onClick={() => removeFounder(founder.id)}
                        className="remove-founder-btn"
                        disabled={founders.length <= 2}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="close-modal-btn"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
