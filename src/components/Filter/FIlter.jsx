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

const Filter = ({
  showFilter,
  setShowFilter,
  selectedFilters,
  setSelectedFilters,
  isLoading = false
}) => {
  const [expanded, setExpanded] = useState({});

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

  const getSelectedCount = (section) => {
    return (selectedFilters[section] || []).length;
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  const hasActiveFilters = Object.values(selectedFilters).some(filters => filters.length > 0);

  return (
    <div className="filter-container">
      {showFilter && (
        <div className="filter-sidebar">
          <div className="filter-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button 
                className="clear-filters-btn"
                onClick={clearAllFilters}
              >
                Clear All
              </button>
            )}
          </div>

          <div className="filter-content">
            {isLoading ? (
              <div className="filter-loading">
                <div className="loading-spinner">
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                  <div className="spinner-ring"></div>
                </div>
                <p className="loading-text">Loading filters...</p>
                
                {/* Loading skeleton for filter sections */}
                <div className="filter-skeleton">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="skeleton-section">
                      <div className="skeleton-header">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-icon"></div>
                      </div>
                      <div className="skeleton-options">
                        {Array.from({ length: 3 }).map((_, optionIndex) => (
                          <div key={optionIndex} className="skeleton-option"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Customizable Checkbox */}
                <div className="filter-section">
                  <label className="customizable-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="label-text">CUSTOMIZABLE</span>
                  </label>
                </div>

                {/* Filter Categories */}
                {Object.entries(filters).map(([section, options]) => (
                  <div className="filter-section" key={section}>
                    <div
                      className="section-header"
                      onClick={() => toggleExpand(section)}
                    >
                      <div className="section-title">
                        <span className="section-name">{section.toUpperCase()}</span>
                        {getSelectedCount(section) > 0 && (
                          <span className="selected-count">
                            ({getSelectedCount(section)})
                          </span>
                        )}
                      </div>
                      <svg
                        className={`expand-icon ${expanded[section] ? 'expanded' : ''}`}
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                      >
                        <path
                          d="M0.721251 0.999778L5.06792 5.34645C5.58125 5.85978 6.42125 5.85978 6.93458 5.34645L11.2813 0.999778"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    
                    {expanded[section] && (
                      <div className="section-options">
                        {options.map((option) => (
                          <label key={option} className="option-item">
                            <input
                              type="checkbox"
                              checked={(selectedFilters[section] || []).includes(option)}
                              onChange={() => toggleCheckbox(section, option)}
                            />
                            <span className="checkmark"></span>
                            <span className="option-text">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
