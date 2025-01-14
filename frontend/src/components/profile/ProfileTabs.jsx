import React, { useState, useRef, useEffect } from 'react';

const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabsRef = useRef([]);

  useEffect(() => {
    if (tabsRef.current[activeTab]) {
      const currentTab = tabsRef.current[activeTab];
      setTabUnderlineLeft(currentTab.offsetLeft);
      setTabUnderlineWidth(currentTab.offsetWidth);
    }
  }, [activeTab]);

  const handleKeyDown = (e, index) => {
    const tabCount = tabs.length;
    let newIndex = activeTab;

    switch (e.key) {
      case 'ArrowLeft':
        newIndex = activeTab === 0 ? tabCount - 1 : activeTab - 1;
        break;
      case 'ArrowRight':
        newIndex = activeTab === tabCount - 1 ? 0 : activeTab + 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabCount - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    setActiveTab(newIndex);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative border-b border-gray-200">
        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Tabs"
          className="flex space-x-8 overflow-x-auto scrollbar-none"
        >
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              ref={(el) => (tabsRef.current[idx] = el)}
              role="tab"
              aria-selected={activeTab === idx}
              aria-controls={`panel-${idx}`}
              tabIndex={activeTab === idx ? 0 : -1}
              className={`
                py-4 px-1 text-sm font-medium outline-none relative
                transition-colors duration-200
                ${activeTab === idx
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
              }
              `}
              onClick={() => setActiveTab(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {tab.label}
            </button>
          ))}

          {/* Animated Underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-blue-600 transition-all duration-300"
            style={{
              left: tabUnderlineLeft,
              width: tabUnderlineWidth
            }}
          />
        </div>
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            role="tabpanel"
            id={`panel-${idx}`}
            aria-labelledby={`tab-${idx}`}
            hidden={activeTab !== idx}
            className={`
              p-4 focus:outline-none
              ${activeTab === idx
              ? 'animate-fadeIn'
              : 'hidden'
            }
            `}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;