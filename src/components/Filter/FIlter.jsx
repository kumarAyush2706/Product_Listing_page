import React, { useState } from "react";
import "./FIlter.css";

const filters = {
  "Ideal For": ["Men", "Women", "Baby & Kids"],
  Occasion: ["Casual", "Formal", "Party"],
  Work: ["Office", "Freelance", "Remote"],
  Fabric: ["Cotton", "Silk", "Linen"],
  Segment: ["Premium", "Budget"],
  "Suitable For": ["Summer", "Winter"],
  "Raw Materials": ["Organic", "Synthetic"],
  Pattern: ["Plain", "Striped", "Checked"],
};

const Filter = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  console.log(selectedFilters)
  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCheckbox = (section, value) => {
    setSelectedFilters((prev) => {
      const current = prev[section] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [section]: updated };
    });
  };

  return (
    <div className="product-page">
      <button
        className="toggle-button"
        onClick={() => setShowFilter(!showFilter)}
      >
        {showFilter ? "Hide Filters" : "Show Filters"}
      </button>

      {showFilter && (
        <div className="sidebar">
          <label> 
            <input type="checkbox" /> CUSTOMIZABLE
          </label>

          {Object.entries(filters).map(([section, options]) => (
            <div className="filter-section" key={section}>
              <div
                className="section-header"
                onClick={() => toggleExpand(section)}
              >
                <div>
                  <strong>{section.toUpperCase()} </strong>
                  {/* <small>All</small> */}
                </div>
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.721251 0.999778L5.06792 5.34645C5.58125 5.85978 6.42125 5.85978 6.93458 5.34645L11.2813 0.999778"
                    stroke="#292D32"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              {expanded[section] && (
                <div className="section-options">
                  {options.map((option) => (
                    <label key={option}>
                      <input
                        type="checkbox"
                        checked={(selectedFilters[section] || []).includes(
                          option
                        )}
                        onChange={() => toggleCheckbox(section, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
