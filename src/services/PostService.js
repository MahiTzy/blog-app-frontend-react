import { myAxios, privateAxios } from "./Helper";


export const createPost = (post) => {
    // console.log(post);
    return privateAxios.post(`/user/${post.userId}/category/${post.categoryId}/posts`, post).then(response => {
        return response.data;
    }
    );
}

export const getAllPosts = (pageNumber, pageSize) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(response => {
        return response.data;
    }
    );
}

export const getPost = (postId) => {
    return myAxios.get(`/posts/${postId}`).then(response => {
        return response.data;
    }
    );
}

export const createComment = (comment,postId) => {
    return privateAxios.post(`/post/${postId}/comments`, comment).then(response => {
        return response.data;
    }
    );
}

export const uploadImage = (image, postId) => {
    let formData = new FormData();
    formData.append('image', image);
    return privateAxios.post(`/post/image/upload/${postId}`, formData).then(response => {
        return response.data;
    }
    );
}

export const loadPostByCategory = (categoryId) => {
    return myAxios.get(`/category/${categoryId}/posts`).then(response => {
        return response.data;
    }
    );
}

export const loadPostByUser = (userId) => {
    return myAxios.get(`/user/${userId}/posts`).then(response => {
        return response.data;
    }
    );
}

export const deletePostOfUser = (postId) => {
    return privateAxios.delete(`/posts/${postId}`).then(response => {
        return response.data;
    }
    );
}

export const updatePost = (post) => {
    return privateAxios.put(`/posts/${post.postId}`, post).then(response => {
        return response.data;
    }
    );
}