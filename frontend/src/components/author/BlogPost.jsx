import React, {useEffect, useState} from 'react';
import ArticleLinkWrapper from "../postPage/BlogLinkWrapper.jsx";
import { ClipLoader } from "react-spinners";

const BlogPost = ({ image, category, title, author, articleId }) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to load the page (e.g., API call or assets loading)
    const timer = setTimeout(() => setLoading(false), 2000); // Simulated 2-second load
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <>
    { loading ? (
          <div className="flex justify-center items-center h-screen">
            <ClipLoader size={50} color="#123abc" loading={loading}/>
          </div>
        ) : (
        <ArticleLinkWrapper articleId={articleId}>
          <article className="mb-12">
            <img src={image} alt={title} className="md:w-full md:h-80 w-full h-40 object-cover rounded-lg"/>
            <div className="flex items-center text-sm text-white mb-2">
              <span>BY {author}</span>
              <span className="mx-2 text-white">IN</span>
              <span className="uppercase text-white">{category}</span>
            </div>
            <h2 className="text-xl font-bold text-white hover:text-pink-500">
              {title}
            </h2>
          </article>
        </ArticleLinkWrapper>
      )}
      </>
  );
}
  ;

  export default BlogPost;