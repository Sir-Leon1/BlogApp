import React, {useState} from 'react';
import Layout from '../components/layout/Layout';
import FeaturedPost from '../components/featuredpage/FeaturedPost.jsx';
import ReadingList from '../components/featuredpage/ReadingList.jsx';
import ArticleCard from '../components/featuredpage/ArticleCard.jsx';
import ArticleCard2 from "../components/featuredpage/ArticleCard2.jsx";
import {getpopularTags, featuredPost, getlatestArticles} from '../services/blogApi';
import {useNavigate} from "react-router-dom";

const FeaturedPosts = () => {
    //const [featured_Post, setFeaturedPost] = useState({});
    const [popularTags, setPopularTags] = useState([]);
    //const [latestArticles, setLatestArticles] = useState([]);
    const navigate = useNavigate();
    /**
     * TODO: REMOVE THIS HARDCODED DATA
     * */
  const categories = [
    { id: 1, name: 'UI design', image: 'https://images.unsplash.com/photo-1721332155433-3a4b5446bcd9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8' },
    { id: 2, name: 'UX design', image: 'https://images.unsplash.com/photo-1702884163621-ded464345868?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8' },
    { id: 3, name: 'SEO', image: 'https://images.unsplash.com/photo-1734275923064-fc1aa3103c86?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8' },
    { id: 4, name: 'Popular', image: 'https://images.unsplash.com/photo-1734329403517-d463a131f7b0?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, name: 'Essentials', image: 'https://images.unsplash.com/photo-1720048170996-40507a45c720?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const featured_Post = [
    {
      id: '1',
      title: 'First Featured Post',
      author: 'Author One',
      authorId: 'author1',
      category: 'Category One',
      content: 'This is the content of the first featured post.',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      title: 'Second Featured Post',
      author: 'Author Two',
      authorId: 'author2',
      category: 'Category Two',
      content: 'This is the content of the second featured post.',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      title: 'Third Featured Post',
      author: 'Author Three',
      authorId: 'author3',
      category: 'Category Three',
      content: 'This is the content of the third featured post.',
      image: 'https://via.placeholder.com/150'
    }
  ];

  const latestArticles = [
    {
      id: '1',
      title: 'First Latest Article',
      author: 'Author One',
      authorId: 'author1',
      category: 'Category One',
      content: 'This is the content of the first latest article.',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      title: 'Second Latest Article',
      author: 'Author Two',
      authorId: 'author2',
      category: 'Category Two',
      content: 'This is the content of the second latest article.',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: '3',
      title: 'Third Latest Article',
      author: 'Author Three',
      authorId: 'author3',
      category: 'Category Three',
      content: 'This is the content of the third latest article.',
      image: 'https://via.placeholder.com/150'
    }
  ];

  /**const fetchFeaturedPost = async () => {
    const response = await featuredPost();
    setFeaturedPost(response.data);
  }
  fetchFeaturedPost().then(r => console.log(r));*/

  const fetchPopularTags = async () => {
      const response = await getpopularTags();
      setPopularTags(response.data);
  }
  fetchPopularTags().then(r => console.log(r));

  /**const fetchLatestArticles = async () => {
    const response = await getlatestArticles();
    setLatestArticles(response.data);
  }
  fetchLatestArticles().then(r => console.log(r));*/

  function handleArticleClick(id) {
    navigate(`/article/${id}`);
  }

  return (
    <Layout>
      <FeaturedPost
        title={featured_Post.title}
        author={featured_Post.author}
        authorid={featured_Post.authorid}
        category={featured_Post.category}
        description={featured_Post.description}
        onClick = {() => handleArticleClick(featured_Post.id)}
      />

      <ReadingList categories={popularTags} />

      <section className="my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Popular</h2>
          <a href="#" className="text-pink-500">View all</a>
        </div>
        <div className="space-y-4">
          {latestArticles.map((article, index) => (
            index % 2 === 0 ? (
          <ArticleCard
            key={article.id}
            title={article.title}
            author={article.author}
            authorid={article.authorid}
            category={article.category}
            description={article.description}
            image={article.image}
            onClick={() => handleArticleClick(article.id)}
          />
          ) : (
          <ArticleCard2
            key={article.id}
            title={article.title}
            author={article.author}
            authorid={article.authorid}
            category={article.category}
            description={article.description}
            image={article.image}
            onClick={() => handleArticleClick(article.id)}
          />
            )
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default FeaturedPosts;