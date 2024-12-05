// postAction.ts

const BASE_URL = "https://your-api-url.com"; // Replace with your backend URL

// Create a new post
export const createPost = async (postData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error("Failed to create post");
        }
        return await response.json(); // Return the created post data
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};


// Update an existing post
export const updatePost = async (postId: number, updatedData: any) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
        if (!response.ok) {
            throw new Error("Failed to update post");
        }
        return await response.json(); // Return the updated post data
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
};


// Delete a post
export const deletePost = async (postId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete post");
        }
        return { success: true }; // Indicate successful deletion
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
    }
};


// Get a post by ID
export const getPostById = async (postId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/posts/${postId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch post");
        }
        return await response.json(); // Return the post data
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    }
};


// Get all posts for a specific user
export const getPosts = async (userId: number) => {
    try {
        const response = await fetch(`${BASE_URL}/users/${userId}/posts`);
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return await response.json(); // Return an array of posts
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

/*
Original : 
// postAction.ts

export const createPost = async() => {
    
};

export const updatePost = async() => {
    
};

export const deletePost = async() => {
    
};

export const getPostById = async() => {
    
};

export const getPosts = async(userId: number) => {
    
};
*/