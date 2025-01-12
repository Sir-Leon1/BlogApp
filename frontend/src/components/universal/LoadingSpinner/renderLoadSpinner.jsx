import React, {useEffect, useState} from 'react';
import { ClipLoader } from "react-spinners";

const RenderLoadSpinner = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to load the page (e.g., API call or assets loading)
    const timer = setTimeout(() => setLoading(false), 2000); // Simulated 2-second load
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={50} color="#123abc" loading={loading}/>
    </div>
  )
}

export default RenderLoadSpinner;