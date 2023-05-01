import React, { useEffect, useState } from "react";
import '../../styles/posts/postItem.scss';
import { dateConvertFull } from "../../utils/dateConverter";
import { useDispatch, useSelector } from "react-redux";
import { dislikePost, likePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const PostItem = ({post:currentPost, user=null}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userActions, setUserActions] = useState({liked: false, disliked: false});
    const {post:updatedPost} = useSelector((state)=>state.post);
    const [post, setPost] = useState(currentPost)
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

    useEffect(()=>{
        if(updatedPost && updatedPost.id === currentPost.id){
            setPost(updatedPost)
        }
    }, [updatedPost])

    const like = (e) => {
        e.preventDefault();
        dispatch(likePost(post.id))
    }
    const dislike = (e) => {
        e.preventDefault();
        dispatch(dislikePost(post.id))
    }
    const getLength = (length) => {
        return 1; 
    }
    const navigateToPost = (id) => {
        navigate(`/posts/${id}`)
    }
    return (
        <div className="post-item">
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
                    <div className={`images length${getLength(post.images.length)}`}>
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
                <div className={`comments`} ><i  onClick={(e) => {e.preventDefault(); navigateToPost(post.id)}}></i>{post.comments.length>0 && post.comments.length}</div>
            </div>
        </div>
    );
}

export default PostItem;