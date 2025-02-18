import React, {useEffect, useState} from 'react';
import {ClipLoader} from "react-spinners";

const ReadingList = ({ categories }) => {
  const [loading, setLoading] = useState(true);
  console.log(categories);

  useEffect(() => {
    if (categories.length > 1) {
      setLoading(false);
      console.log(categories);
    }
  }, [categories]);

  return (
    <>

        < section className = "my-8" >
        < div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Trending</h2>
        <a href="/popular" className="text-pink-500">View all</a>
      </div>
          {loading ? (
            <div className="flex justify-center items-center h-36">
              <ClipLoader size={25} color="#123abc" loading={loading}/>
            </div>
          ) : (
      <div className="grid grid-cols-5 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="relative rounded-lg overflow-hidden">
            <img src={category.image ?? category.imageUrl} alt={category.name} className="w-full h-32 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70">
              <h3 className="text-white text-sm font-medium">{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
          )}
    </section>

      </>
  );
};

export default ReadingList;