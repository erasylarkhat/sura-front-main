import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import { LOGOUT } from "../constants";

import '../styles/createModal.scss';
import { createQuestion } from "../actions/questions";
import { createPost } from "../actions/posts";
import { Link, useNavigate } from "react-router-dom";

const CreateModal = ({show=true, setShow}) => {
    const dispatch = useDispatch();
    const [questionFormData, setQuestionFormData] = useState({title: ''});
    const [postFormData, setPostFormData] = useState({title: '', description: ''});
    const [files, setFiles] = useState([]);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const [user, setUser] = useState(null);
    const [previews, setPreviews] = useState([]);
    useEffect(() => {
        if(profile && profile.user && profile.token){
            const token = profile.token;
            if (token) {
                const decodedToken = decode(token);
          
                if (decodedToken.exp * 1000 > new Date().getTime()){
                    setUser(profile.user);
                } else{
                    dispatch({type: LOGOUT});
                    setProfile(null);
                }
            }
        }
    }, [profile]);

    const close = (e) => {
        e.preventDefault();
        setShow(false);
    }

    const handleQuestionChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setQuestionFormData({...questionFormData, [name]: value});
    }
    const handlePostChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setPostFormData({...postFormData, [name]: value});
    }
    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        if(questionFormData.title){
            dispatch(createQuestion(questionFormData));
            close(e);
        }
    }
    const handlePostSubmit = (e) => {
        e.preventDefault();
        if(postFormData.title && postFormData.description){
            const formData = new FormData();
            formData.append('title', postFormData.title);
            formData.append('description', postFormData.description);
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i]);
            }
            dispatch(createPost(formData));
            close(e);
        }
    }
    const handleFileChange = (e) => {
        const files = e.currentTarget.files;
        console.log(files)
        setFiles(files);
        const prevs = [];
        for (let i = 0; i < files.length; i++) {
            prevs.push(URL.createObjectURL(files[i]));
        }
        console.log(prevs);
        setPreviews(prevs);
    }
    const [tab, setTab] = useState('question');
    const changeTab = (e) => {
        e.preventDefault();
        const value = e.currentTarget.dataset.value;
        setTab(value);
    }
    if(!show)
        return ;
    return (
        <div id="createModal">
            <div className="modal">
                <div className="close" onClick={close}>
                    <i></i>
                </div>
                {user ? (
                    <>
                        <div className="tabs">
                            <div className={`tab ${tab === 'question' ? 'active' : ''}`} data-value="question" onClick={changeTab}>Add Questions</div>
                            <div className={`tab ${tab === 'post' ? 'active' : ''}`} data-value="post" onClick={changeTab}>Create Post</div>
                        </div>
                        <div className="top">
                            <div className="userImage">
                                {user.avatar ? (
                                    <img src={`${process.env.REACT_APP_SERVER}avatars/${user.avatar}`} alt="" />
                                ) : (
                                    <div className="alt">{user.firstname[0]}</div>
                                )}
                            </div>
                            <div className="name">
                                {user.firstname} {user.lastname}
                            </div>
                        </div>
                        <div className="create-content">
                            {tab === 'question' && (
                                <textarea name="title" value={questionFormData.title} onChange={handleQuestionChange} placeholder="Ask your question." ></textarea>
                            )}
                            {tab === 'post' && (
                                <>
                                    <input type="text" value={postFormData.title} name="title" onChange={handlePostChange} placeholder="Title" />
                                    <textarea name="description" value={postFormData.description} onChange={handlePostChange} placeholder="Write something" ></textarea>
                                    {previews && previews.length>0 && (
                                        <div className="images">
                                            {previews.map((image, key) => (
                                                <div className="img" key={key} >
                                                    <img src={image} alt=""/>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="bottom">
                            {tab === 'question' && (
                                <div className="btn" onClick={handleQuestionSubmit}>Send</div>
                            )}
                            {tab === 'post' && (
                                <div className="btn" onClick={handlePostSubmit}>Send</div>
                            )}

                            {tab === 'post' && (
                                <label className="img-btn">
                                    <i></i>
                                    <input type="file" multiple onChange={handleFileChange} />
                                </label>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="unauthorized">
                        <div className="text">You need to authorize first</div>
                        <Link to="/login" className="login-btn">Login</Link>
                        <Link to="/login" className="signin-btn">Signin</Link>
                    </div>
                )}
            </div>
        </div>
    )
};

export default CreateModal;