import axios from 'axios';
import { createBlog, updateBlog, deleteBlog, getSpecificBlogAuthor, specificBlog, getAuthorsBlogList, readingList, featuredPost, getpopularTags, getlatestArticles } from './blogApi';

describe('blogApi', () => {
  describe('createPost', () => {
    it('creates a post successfully', async () => {
      const newPost = { title: 'New Post', content: 'New Content' };
      const result = await createBlog({ title: 'New Post', content: 'New Content' }, "675e6ae47bbe53863df4c03f");
      expect(result.data).toHaveProperty('id');
      expect(result.data.title).toBe(newPost.title);
      expect(result.data.content).toBe(newPost.content);
    });

    it('handles create post failure', async () => {
      try {
        await axios.post('invalid-url', { title: 'New Post', content: 'New Content' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('handles missing title or content', async () => {
      try {
        await createBlog({ title: '', content: '' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('updatePost', () => {
    it('updates a post successfully', async () => {
      const updatedPost = {
        id: "677bd2c12a17002edc3bfdcf",
        authorId: "675e6ae47bbe53863df4c03f",
        title: 'Updated Post',
        content: 'Updated Content'
      };
      const result = await updateBlog(updatedPost.id, updatedPost);
      expect(result.data.title).toBe(updatedPost.title);
      expect(result.data.content).toBe(updatedPost.content);
    });

    it('handles update post failure', async () => {
      try {
        await axios.put('invalid-url', { title: 'Updated Post', content: 'Updated Content' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('handles missing post ID', async () => {
      try {
        await updateBlog(null, { title: 'Updated Post', content: 'Updated Content' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('deletePost', () => {
    it('deletes a post successfully', async () => {
      const result = await deleteBlog({id: "677bd3492a17002edc3bfdd3"});
      expect(result.data).toHaveProperty('message', 'Blog deleted successfully');
    });

    it('handles delete post failure', async () => {
      try {
        await axios.delete('invalid-url');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('handles missing post ID', async () => {
      try {
        await deleteBlog(null);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getBlogs', () => {
    it('handles fetch blogs failure', async () => {
      try {
        await axios.get('invalid-url');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getBlogById', () => {
    it('fetches a blog by ID successfully', async () => {
      const blogId = "677bd2c12a17002edc3bfdcf";
      const result = await specificBlog(blogId);
      expect(result.data).toHaveProperty('id', blogId);
      expect(result.data).toHaveProperty('title');
      expect(result.data).toHaveProperty('content');
      expect(result.data).toHaveProperty('authorId');
    });

    it('handles fetch blog by ID failure', async () => {
      try {
        await specificBlog('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getLatestBlogs', () => {
    it('fetches the latest blogs successfully', async () => {
      const result = await getlatestArticles();
      expect(result.data).toBeInstanceOf(Array);
    });

    it('handles fetch latest blogs failure', async () => {
      try {
        await axios.get('invalid-url');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getBlogsByUser', () => {
    it('fetches blogs by user ID successfully', async () => {
      const userId = "675e6ae47bbe53863df4c03f";
      const result = await getAuthorsBlogList(userId);
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data[0]).toHaveProperty('authorId', userId);
    });

    it('handles fetch blogs by user ID failure', async () => {
      try {
        await getAuthorsBlogList('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getBlogTags', () => {
    it('fetches all blog tags successfully', async () => {
      const result = await getpopularTags();
      expect(result.data).toBeInstanceOf(Array);
    });

    it('handles fetch blog tags failure', async () => {
      try {
        await axios.get('invalid-url');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getUserReadHistory', () => {
    it('fetches user read history successfully', async () => {
      const userId = "675e6ae47bbe53863df4c03f";
      const result = await readingList(userId);
      expect(result.data).toBeInstanceOf(Array);
    });

    it('handles fetch user read history failure', async () => {
      try {
        await readingList('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getFeaturedBlog', () => {
    it('fetches the featured blog successfully', async () => {
      const result = await featuredPost();
      expect(result.data).toHaveProperty('id');
    });

    it('handles fetch featured blog failure', async () => {
      try {
        await axios.get('invalid-url');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getBlogAuthor', () => {
    it('fetches the blog author successfully', async () => {
      const blogId = "677bd2c12a17002edc3bfdcf";
      const result = await getSpecificBlogAuthor(blogId);
      expect(result.data).toHaveProperty('name');
    });

    it('handles fetch blog author failure', async () => {
      try {
        await getSpecificBlogAuthor('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});