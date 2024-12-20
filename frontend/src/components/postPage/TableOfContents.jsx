import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TableOfContents = () => {
  const [activeSection, setActiveSection] = useState('');
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    setSections(headings.map(heading => ({
      id: heading.id,
      text: heading.textContent,
      level: heading.tagName === 'H2' ? 0 : 1
    })));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    headings.forEach(heading => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed right-8 top-1/3 w-64 bg-white p-4 rounded-lg shadow-lg"
      initial={{ x: 100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-bold mb-4">Table of Contents</h3>
      <nav>
        {sections.map((section) => (
          <motion.a
            key={section.id}
            href={`#${section.id}`}
            className={`block py-1 text-sm ${
              activeSection === section.id ? 'text-pink-500' : 'text-gray-600'
            } hover:text-pink-500 transition-colors`}
            style={{ marginLeft: `${section.level * 1}rem` }}
            whileHover={{ x: 5 }}
          >
            {section.text}
          </motion.a>
        ))}
      </nav>
    </motion.div>
  );
};

export default TableOfContents;