import React from 'react';

const TopicCard = ({ icon, title, description, background }) => {
  return (
    <div className="relative bg-purple-900  rounded-lg p-4"
         style={{
           backgroundImage: `url(${background})`,
           backgroundSize: 'cover',
           backgroundPosition: 'center'
         }}
    >
    <div className=" absolute inset-0 bg-purple-900 opacity-80 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
    </div>
    <div className=" text-white relative z-10">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white text-sm leading-relaxed">{description}</p>
</div>
    </div>
  );
};

export default TopicCard;