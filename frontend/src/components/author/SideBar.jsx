import React, {useState} from 'react';
import {Facebook, Github, Link, Linkedin, Twitter} from 'lucide-react';

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
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const generateCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<td key={j}></td>);
        } else if (day > daysInMonth) {
          week.push(<td key={j}></td>);
        } else {
          const isToday = day === currentDate.getDate();
          week.push(
            <td key={j} className={isToday ? 'bg-blue-500 text-white rounded-full' : ''}>
              {day}
            </td>
          );
          day++;
        }
      }
      calendar.push(<tr key={i}>{week}</tr>);
    }
    return calendar;
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg p-4 mb-8">
      <table className="w-full">
        <thead>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="py-2">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateCalendar()}
        </tbody>
      </table>
    </div>
  );
};


const Sidebar = ({posts, socialLinks}) => {
  const iconsMap = {
    githublink: Github,
    twitterlink: Twitter,
    facebooklink: Facebook,
    linkedinlink: Linkedin,
    profilelink: Link,
  };
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const topPosts = posts.slice(0, 3);
  const searchPosts = filteredPosts.slice(0, 4);

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github size={20} />;
      case 'twitter':
        return <Twitter size={20} />;
      case 'facebook':
        return <Facebook size={20} />;
      case 'linkedin':
        return <Linkedin size={20} />;
      case 'link':
        return <Link size={20} />;
      default:
        return <Link size={20} />;
    }
  };

  return (
    <div className="lg:w-80">
      <div className="mb-8">
        <input
          type="search"
          placeholder="Search for a post..."
          className="w-full p-2 border rounded-lg"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-4">Search Results</h2>
        {searchPosts.map((post, index) => (
          <PopularPost
            key={index}
            image={post.image}
            category={post.category}
            title={post.title}
          />
        ))}
      </div>

      <div className="mb-8">
        <h2 className="font-bold mb-4">POPULAR POSTS</h2>
        {topPosts.map((post, index) => (
          <PopularPost
            key={index}
            image={post.image}
            category={post.category}
            title={post.title}
          />
        ))}
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

      <Calendar/>

      <div className="mb-8">
        <h2 className="font-bold mb-4">SOCIAL MEDIA</h2>
        <div className="flex space-x-4">
          { socialLinks.map((link, index) => (
            <a key={index} href={link.url} className="text-gray-400 hover:text-gray-600">
              {getIcon(link.platform)}
            </a>
          ))}
        </div>
      </div>
    </div>
);
};

export default Sidebar;