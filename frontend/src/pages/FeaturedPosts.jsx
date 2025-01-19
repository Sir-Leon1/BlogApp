import React, {useEffect, useState} from 'react';
import Layout from '../components/layout/Layout';
import FeaturedPost from '../components/featuredpage/FeaturedPost.jsx';
import ReadingList from '../components/featuredpage/ReadingList.jsx';
import ArticleCard from '../components/featuredpage/ArticleCard.jsx';
import ArticleCard2 from "../components/featuredpage/ArticleCard2.jsx";
import {getpopularTags, featuredPost, getlatestArticles} from '../services/blogApi';
import {useNavigate} from "react-router-dom";
import {addHistory} from "../services/userApi.js";

const FeaturedPosts = () => {
  const [featured_Post, setFeaturedPost] = useState({});
  const [popularTags, setPopularTags] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedPost = async () => {
      const response = await featuredPost();
      setFeaturedPost(response.data);
    }
    fetchFeaturedPost();
  }, [])

  useEffect(() => {
    const fetchPopularTags = async () => {
      const response = await getpopularTags();
      setPopularTags(response.data);
    }
    fetchPopularTags();
  }, []);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      const response = await getlatestArticles();
      setLatestArticles(response.data);
    }
    fetchLatestArticles();
  }, []);


  async function handleArticleClick(id) {
    await addHistory({
      userId: localStorage.getItem("userId"),
      blogId: id
    })
    navigate(`/article/${id}`);
  }

  return (
    <Layout>
      <FeaturedPost
        title={featured_Post.title}
        author={featured_Post.author}
        authorid={featured_Post.authorid}
        category={featured_Post.category}
        description={featured_Post.content}
        onClick={() => handleArticleClick(featured_Post.id)}
      />

      <ReadingList categories={popularTags}/>

      <section className="my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Popular</h2>
          <a href="#" className="text-pink-500 ">View all</a>
        </div>
        <div className="space-y-4">
          {latestArticles.map((article, index) => {
            const useArticleCard = index % 2 === 0;

            {/**TODO : change description to
             description={article.content.split(" ").
             slice(0, 15).join(" ") + (article.content.split(" ").
             length > 15 ? "..." : "")}
             */}
            return useArticleCard ? (
              <ArticleCard
                key={article.id}
                title={article.title}
                author={article.author}
                authorid={article.authorId._id}
                category={article.category}
                description={article.content.split(" ").
             slice(0, 15).join(" ") + (article.content.split(" ").
             length > 15 ? "..." : "")}
                image={article.image}
                onClick={() => handleArticleClick(article.id)}
              />
            ) : (
              <ArticleCard2
                key={article.id}
                title={article.title}
                author={article.author}
                authorid={article.authorId._id}
                category={article.category}
                description={article.content.split(" ").
             slice(0, 15).join(" ") + (article.content.split(" ").
             length > 15 ? "..." : "")}
                image={article.image}
                onClick={() => handleArticleClick(article.id)}
              />
            );
          })}

        </div>
      </section>
    </Layout>
  );
};

export default FeaturedPosts;
