import React from 'react';

const Newsletter = () => {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-2">Get free web design insights...</h2>
      <p className="text-gray-600 mb-4">
        In your inbox, every other week. And unsubscribe in a click, if you want.
      </p>
      <div className="max-w-md mx-auto flex gap-2">
        <input
          type="email"
          placeholder="Your email"
          className="flex-1 p-2 border rounded-lg"
        />
        <button className="px-6 py-2 bg-pink-500 text-white rounded-lg">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Newsletter;