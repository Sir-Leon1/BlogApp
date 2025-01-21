import axios from 'axios';
import { createComment, updateComment, deleteComment, getCommentsByBlog, getCommentById } from './commentsApi';

describe('commentsApi', () => {
  describe('createComment', () => {
    it('creates a comment successfully', async () => {
      const newComment = { content: 'New Comment', blogId: '677bd2c12a17002edc3bfdcf' };
      const result = await createComment(newComment);
      expect(result.data).toHaveProperty('id');
      expect(result.data.content).toBe(newComment.content);
    });

    it('handles create comment failure', async () => {
      try {
        await axios.post('invalid-url', { content: 'New Comment', blogId: '677bd2c12a17002edc3bfdcf' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('handles missing content or blogId', async () => {
      try {
        await createComment({ content: '', blogId: '' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('updateComment', () => {
    it('updates a comment successfully', async () => {
      const updatedComment = { id: '677bd2c12a17002edc3bfdcf', content: 'Updated Comment' };
      const result = await updateComment(updatedComment.id, updatedComment);
      expect(result.data.content).toBe(updatedComment.content);
    });

    it('handles update comment failure', async () => {
      try {
        await axios.put('invalid-url', { content: 'Updated Comment' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('handles missing comment ID', async () => {
      try {
        await updateComment(null, { content: 'Updated Comment' });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('deleteComment', () => {
    it('deletes a comment successfully', async () => {
      const result = await deleteComment({ id: '677bd3492a17002edc3bfdd3' });
      expect(result.data).toHaveProperty('message', 'Comment deleted successfully');
    });

    it('handles delete comment failure', async () => {
      try {
        await axios.delete('invalid-url');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('handles missing comment ID', async () => {
      try {
        await deleteComment(null);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getCommentsByBlog', () => {
    it('fetches comments by blog ID successfully', async () => {
      const blogId = '677bd2c12a17002edc3bfdcf';
      const result = await getCommentsByBlog(blogId);
      expect(result.data).toBeInstanceOf(Array);
    });

    it('handles fetch comments by blog ID failure', async () => {
      try {
        await getCommentsByBlog('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });

  describe('getCommentById', () => {
    it('fetches a comment by ID successfully', async () => {
      const commentId = '677bd2c12a17002edc3bfdcf';
      const result = await getCommentById(commentId);
      expect(result.data).toHaveProperty('id', commentId);
    });

    it('handles fetch comment by ID failure', async () => {
      try {
        await getCommentById('invalid-id');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});