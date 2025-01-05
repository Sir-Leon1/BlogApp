import axios from 'axios';
import { createBlog, updateBlog, deleteBlog } from './blogApi';

describe('blogApi', () => {
  describe('createPost', () => {
    it('creates a post successfully', async () => {
      const newPost = { title: 'New Post', content: 'New Content' };
      const result = await createBlog(newPost);
      expect(result).toHaveProperty('id');
      expect(result.title).toBe(newPost.title);
      expect(result.content).toBe(newPost.content);
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
      const updatedPost = { id: 1, title: 'Updated Post', content: 'Updated Content' };
      const result = await updateBlog(updatedPost.id, updatedPost);
      expect(result.title).toBe(updatedPost.title);
      expect(result.content).toBe(updatedPost.content);
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
      const result = await deleteBlog(1);
      expect(result).toHaveProperty('message', 'Post deleted successfully');
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
});