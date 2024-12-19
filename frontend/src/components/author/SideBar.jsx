import React from 'react';
import { Twitter } from 'lucide-react';

const PopularPost = ({ image, category, title }) => {
  return (
    <div className="flex items-start space-x-4 mb-4">
      <img src={image} alt={title} className="w-16 h-16 rounded object-cover" />
      <div>
        <span className="text-gray-500 text-xs uppercase">{category}</span>
        <h3 className="text-sm font-medium hover:text-pink-500">
          <a href="#">{title}</a>
        </h3>
      </div>
    </div>
  );
};

const Calendar = () => {
  return (
    <div className="bg-white rounded-lg p-4 mb-8">
      <table className="w-full">
        <thead>
        <tr>
          <th className="py-2">S</th>
          <th className="py-2">M</th>
          <th className="py-2">T</th>
          <th className="py-2">W</th>
          <th className="py-2">T</th>
          <th className="py-2">F</th>
          <th className="py-2">S</th>
        </tr>
        </thead>
        <tbody>
        {/* Calendar rows would be dynamically generated */}
        </tbody>
      </table>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="lg:w-80">
      <div className="mb-8">
        <input
          type="search"
          placeholder="Type something..."
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-4">POPULAR POST</h2>
        <PopularPost
          image="https://plus.unsplash.com/premium_photo-1682089708808-8fa18c1828dc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVyYmFufGVufDB8fDB8fHww"
          category="Design Process"
          title="Our 15 favorite websites from August"
        />
        <h2 className="font-bold mb-4">POPULAR POST</h2>
        <PopularPost
          image="https://plus.unsplash.com/premium_photo-1682089708808-8fa18c1828dc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVyYmFufGVufDB8fDB8fHww"
          category="Design Process"
          title="Our 15 favorite websites from August"
        />
        <h2 className="font-bold mb-4">POPULAR POST</h2>
        <PopularPost
          image="https://plus.unsplash.com/premium_photo-1682089708808-8fa18c1828dc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHVyYmFufGVufDB8fDB8fHww"
          category="Design Process"
          title="Our 15 favorite websites from August"
        />
        {/* More PopularPosts */}
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-4">SUBSCRIBE</h2>
        <input
          type="email"
          placeholder="Your email"
          className="w-full p-2 border rounded-lg mb-2"
        />
        <button className="w-full bg-pink-500 text-white rounded-lg py-2">
          Subscribe
        </button>
      </div>

      <Calendar />

      <div className="mb-8">
        <h2 className="font-bold mb-4">SOCIAL MEDIA</h2>
        <div className="flex space-x-4">
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <Twitter size={20} />
          </a>
          {/* More social media icons */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;