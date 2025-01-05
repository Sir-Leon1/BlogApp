import React from 'react';
import TopicCard from './topicCard';
import {
  Lightbulb,
  MapPin,
  Bell,
  Rocket,
  Shield,
  Bell as BellIcon,
  Wrench,
  CreditCard
} from 'lucide-react';

const topics = [
  {
    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
    title: "Inspiration",
    description: "Get the web design inspiration you need from top 3layers users, amazing landing page and site designs, and 3layers Workshops.",
    background: "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    icon: <MapPin className="w-6 h-6 text-red-500" />,
    title: "Resource",
    description: "All the free tools and resources you need to build better websites, manage your time, be more creative, and freelance like a boss.",
    background: "https://plus.unsplash.com/premium_photo-1734293455122-c3a9a05b51e1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3Nnx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    icon: <Bell className="w-6 h-6 text-gray-500" />,
    title: "Announcements",
    description: "Get the lowdown on the latest new features of 3layers, from fl exbox to responsive images, Client Billing to Google Domains.",
    background: "https://plus.unsplash.com/premium_photo-1689609950097-1e6b05dfdba6?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTF8fHxlbnwwfHx8fHw%3D"
  },
  {
    icon: <Rocket className="w-6 h-6 text-blue-500" />,
    title: "Entrepreneurship",
    description: "Get tips and insights on building your own business with a little help from 3layers.",
    background: "https://images.unsplash.com/photo-1721332149346-00e39ce5c24f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMjh8fHxlbnwwfHx8fHw%3D"
  },
  {
    icon: <Shield className="w-6 h-6 text-green-500" />,
    title: "Tutorials",
    description: "Get step-by-step guides to building common layouts and interactions, including how to build natural-language forms, modals, ebooks, banner ads, and much more.",
    background: "https://images.unsplash.com/photo-1704791403624-c192488ca4fa?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5N3x8fGVufDB8fHx8fA%3D%3D"
  },
  {
    icon: <BellIcon className="w-6 h-6 text-yellow-500" />,
    title: "Freelancing",
    description: "Get tips, insights, and advice on becoming a freelance web designer, including how to find clients, design your freelancing rates, and managing projects.",
    background: "https://images.unsplash.com/photo-1730886769116-2cbaf94588d0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNjd8fHxlbnwwfHx8fHw%3D"
  },
  {
    icon: <Wrench className="w-6 h-6 text-gray-500" />,
    title: "Design Process",
    description: "Learn to better manage your design process, from wireframing and prototyping to gathering and handling feedback — plus tools that help.",
    background: "https://images.unsplash.com/photo-1719937051230-8798ae2ebe86?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNjl8fHxlbnwwfHx8fHw%3D"
  },
  {
    icon: <CreditCard className="w-6 h-6 text-blue-500" />,
    title: "Web Design",
    description: "Get detailed tips and insights on common design patterns and best practices, SEO, landing page design, and so much more.",
    background: "https://images.unsplash.com/photo-1720048171209-71f6fc3d7ea4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDh8fHxlbnwwfHx8fHw%3D"
  }
];


const TopicsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto px-4">
      {topics.map((topic, index) => (
        <TopicCard
          key={index}
          icon={topic.icon}
          title={topic.title}
          description={topic.description}
          background={topic.background}
        />
      ))}
    </div>
  );
};

export default TopicsGrid;