import axios from "axios";

const API = axios.create({baseURL: process.env.REACT_APP_SERVER, validateStatus: function (status) { return true } });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

// user
export const login = (formData) => API.post('/api/signin', formData);
export const signup = (formData) => API.post('/api/signup', formData);
export const restoreAccount = (email) => API.post('/api/reset', {"email": email});
export const restorePassword = (formData,email,token,expires) => API.post(`/api/reset-pass?email=${email}&token=${token}&expires=${expires}`, formData);
export const updateUserInfo = (formData) => API.post('/api/update-info', formData);
export const updateUserAvatar = (image) => API.post('/api/avatar', image, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const updateUserPassword = (formData) => API.post('/api/update-password', formData);
// post
export const getUserPosts = () => API.get('/posts/user/');
export const getPosts = (search) => API.get(`/posts${search ? `?searchValue=${search}` : ''}`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const createPost = (formData) => API.post('/posts', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const likePost = (id) => API.post(`/posts/${id}/like`);
export const dislikePost = (id) => API.post(`/posts/${id}/dislike`);
export const commentPost = (id, comment) => API.post(`/posts/${id}/comment`, comment);

// question

export const createQuestion = (formData) => API.post('/questions', formData);
export const getUserQuestions = () => API.get('/questions/user');
export const getUserAnsweredQuestions = () => API.get('/questions/user/answer');
export const getQuestions = () => API.get('/questions');
export const getQuestion = (id) => API.get(`/questions/${id}`);

export const answerQuestion = (id, formData) => API.post(`/questions/${id}/answer`,formData);
export const likeAnswer = (id) => API.post(`/questions/answer/${id}/like`);
export const dislikeAnswer = (id) => API.post(`/questions/answer/${id}/dislike`);
