import React, { useEffect, useState } from "react";
import decode from 'jwt-decode';
import '../../styles/posts/post.scss';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dateConvertFull } from "../../utils/dateConverter";
import { commentPost, dislikePost, likePost } from "../../actions/posts";
import { getPost } from "../../actions/posts";
import { LOGOUT } from "../../constants";

const Post = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {post} = useSelector((state)=>state.post);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const [user, setUser] = useState(null);
    const [userActions, setUserActions] = useState({liked: false, disliked: false});
    const [comment, setComment] = useState({content: ''});
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

    useEffect(()=>{
        if(!post)
            dispatch(getPost(id));
    }, [post])
    const like = (e) => {
        e.preventDefault();
        dispatch(likePost(post.id))
    }
    const dislike = (e) => {
        e.preventDefault();
        dispatch(dislikePost(post.id))
    }

    useEffect(()=>{
        if(user && post){
            let acted = {liked: false, disliked: false};
            for (let i = 0; i < post.likes.length; i++) {
                const like = post.likes[i];
                if(like.user.email === user.username){
                    acted.liked = true;
                    break;
                }
            }

            for (let i = 0; i < post.dislikes.length; i++) {
                const dislike = post.dislikes[i];
                if(dislike.user.email === user.username){
                    acted.disliked = true;
                    break;
                }
            }
            setUserActions(acted);
        }
    }, [user, post]);

    const handleCommentChange = (e) => {
        const value = e.currentTarget.value;
        setComment({content: value});
    }
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        dispatch(commentPost(id, comment));
    }

    return post ? (

        <div id="post">
            <div className="container">
                <div className="content">
                    <div className="top">
                        <div className="user-image">
                            {post.user.avatar ? (
                                <img src={`${process.env.REACT_APP_SERVER}avatars/${post.user.avatar}`} alt="" />
                            ) : (
                                <div className="alt">{post.user.firstname[0]}</div>
                            )}
                        </div>
                        <div className="user-info">
                            <div className="name">{post.user.firstname} {post.user.lastname}</div>
                            <div className="details">{post.user.credential ? `${post.user.credential} · ` : '' } {dateConvertFull(post.created_at)}</div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="title">{post.title}</div>
                        <div className="description">{post.description}</div>
                        {post.images && post.images.length > 0 && (
                            <div className={`images `}>
                                {post.images.map((image, key) => (
                                    <div className="img" key={key} >
                                        <img src={`${process.env.REACT_APP_SERVER}postimages/${image.name}`} alt=""/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="bottom">
                        <div className={`likes ${userActions.liked ? 'active' : ''}`}><i onClick={like}></i>{post.likes.length>0 && post.likes.length}</div>
                        <div className={`dislikes ${userActions.disliked ? 'active' : ''}`}><i onClick={dislike}></i>{post.dislikes.length>0 && post.dislikes.length}</div>
                        <div className={`comments`}><i></i>{post.comments.length>0 && post.comments.length}</div>
                    </div>

                    <div className="comments">
                        <div className="comments-top">
                            Comments
                        </div>
                        <div className="comment-form">
                            <label>Comment post</label>
                            {user ? (
                                <>
                                    <textarea name="comment" rows="5" placeholder="Write down your thoughts" value={comment.content} onChange={handleCommentChange}></textarea>
                                    <div className="bottom">
                                        <div className="btn" onClick={handleCommentSubmit}>Send</div>
                                    </div>
                                </>
                            ):(
                                <div className="unauthorized bordered">
                                    <div className="text">You need to authorize first</div>
                                    <Link to="/login" className="login-btn">Login</Link>
                                    <Link to="/login" className="signin-btn">Signin</Link>
                                </div>
                            )}
                        </div>
                        {post.comments && post.comments.length > 0 && 
                            post.comments.map((comment, key)=> (
                                <div className="comment" key={key}>
                                    <div className="comment-top">
                                        <div className="user-image">
                                            {comment.user.avatar ? (
                                                <img src={`${process.env.REACT_APP_SERVER}avatars/${comment.user.avatar}`} alt="" />
                                            ) : (
                                                <div className="alt">{comment.user.firstname[0]}</div>
                                            )}
                                        </div>
                                        <div className="user-info">
                                            <div className="name">{comment.user.firstname} {comment.user.lastname}</div>
                                            <div className="details">{comment.user.credential ? `${comment.user.credential} · ` : '' } {dateConvertFull(post.created_at)}</div>
                                        </div>
                                    </div>
                                    <div className="comment-content">
                                        {comment.content}
                                    </div>
                                </div>
                            ))
                        }
                        </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="loading">
            
        </div>
    )
    ;
}
export default Post;