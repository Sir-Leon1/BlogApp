import React from 'react';

const ReadingCard = ({ title, description, image }) => {
    return (
        <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-48 object-cover transform transition-transform group-hover:scale-105"
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default ReadingCard;