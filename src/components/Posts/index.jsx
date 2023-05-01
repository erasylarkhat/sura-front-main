import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import decode from 'jwt-decode';
import PostItem from "./PostItem";

import '../../styles/posts/index.scss';
import { getPosts } from "../../actions/posts";
import { CLEAR_POST_STATE, LOGOUT } from "../../constants";
import CreateModal from "../CreateModal";

const Posts = () => {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const [user, setUser] = useState(null);
    const {posts} = useSelector((state)=>state.post);
    const [search, setSearch] = useState('');

    useEffect(()=>{
        dispatch({type: CLEAR_POST_STATE});
    }, [dispatch])

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
        if(posts === null){
            dispatch(getPosts());
        }
    },[posts])

    const [show, setShow] = useState(false);
    const openModal = (e) => {
        e.preventDefault();
        setShow(true);
    }

    const handleSearchChange = (e) => {
        const value = e.currentTarget.value;
        setSearch(value);
    }
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(getPosts(search));
    }

    return (
        <div id="posts">
            <CreateModal show={show} setShow={setShow} />
            <div className="container">
                {/* <div className="heading">POSTS</div> */}
                <div className="postbar">
                    <div className="userimage">
                        {(user && user.avatar) ? (
                            <img src={`${process.env.REACT_APP_SERVER}avatars/${user.avatar}`} alt="" />
                        ) : (
                            <div className="alt">{user ? user.firstname[0] : ''}</div>
                        )}
                    </div>
                    <div>
                        <form className="searchbar" onSubmit={handleSearchSubmit} >
                            <input type="text" value={search} placeholder="What do you want to know?" onChange={handleSearchChange} />
                        </form>
                        <div className="row">
                            <div className="col ask" onClick={openModal} ><i></i> Ask</div>
                            <div className="vr"></div>
                            {/* <div className="col"><i></i> Answer</div>
                            <div className="vr"></div> */}
                            <div className="col post" onClick={openModal}><i></i> Post</div>
                        </div>
                    </div>
                </div>
                <div className="posts">
                    {(posts && posts.length > 0) ? posts.map((post, key)=> (
                        <PostItem key={key} post={post} user={user ? user : null} />
                    )) : (
                        <div className="loading"></div>
                    )}    
                </div>
            </div>
        </div>
    );
}

export default Posts;