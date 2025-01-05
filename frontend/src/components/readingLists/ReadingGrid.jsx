import React, {useState} from 'react';
import ReadingCard from './ReadingCard';
import {getreadingHistory} from '../../services/userApi';

/** TODO: remove this hard coded data */
const readingItems = [
    {
        id: 1,
        title: 'UI design',
        description: 'Every website is a user interface. Learn to build yours right.',
        image: 'https://images.unsplash.com/photo-1734255578950-c1b4a1cc6ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8',
    },
    {
        id: 2,
        title: 'UX design',
        description: 'Step-by-step instructions to make your very own agency site in 3layers.',
        image: 'https://images.unsplash.com/photo-1702884162674-b05320817c58?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D',
    },
    // Add other items...
];

const ReadingGrid = () => {
    const [readingItems, setReadingItems] = useState([]);

    const fetchReadingItems = async () => {
        const response = await getreadingHistory();
        setReadingItems(response.data);
    }
    fetchReadingItems().then(r => console.log(r));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {readingItems.map(item => (
                <ReadingCard key={item.id} {...item} />
            ))}
        </div>
    );
};

export default ReadingGrid;