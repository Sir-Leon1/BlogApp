import apiClient from "./api.js";

export const specificBlog = async (id) => {
    try {
        const response = await apiClient.get(`/b/blogs/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const getSpecificBlogAuthor = async (id) => {
    try {
        const response = await apiClient.get(`/b/blogs/${id}/author`);
        if (response.status === 200) {
            return response;
        } else {
            return ({ error: 'An unexpected error occurred' });
        }
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const getlatestArticles = async () => {
    try {
        const response = await apiClient.get('/b/blogs/latest');
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const getAuthorsBlogList = async (user_id) => {
    try {
        const response = await apiClient.get(`/b/blogs/users/${user_id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const createBlog = async ( data, authorId ) => {
    try {
        const response = await apiClient.post(`/b/blogs/${authorId}`,
            { data }
        )
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const updateBlog = async ( id, data ) => {
    try {
        const response = await apiClient.put(`/b/blogs/${id}`,
            {data}
        );
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const deleteBlog = async ( data ) => {
    const id = data.id;
    try {
        const response = await apiClient.delete(`/b/blogs/${id}`,);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const getpopularTags = async () => {
    try {
        const response = await apiClient.get('/t/tags');
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const readingList = async (id) => {
    try {
        const response = await apiClient.get(`/b/blogs/history/${id}`);
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}

export const featuredPost = async () => {
    try {
        const response = await apiClient.get('/b/blogs/featured');
        return response;
    } catch (error) {
        console.error(error);
        return error.response;
    }
}
