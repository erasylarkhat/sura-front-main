import React, { useEffect } from "react";

import '../../styles/profile/myposts.scss';
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts } from "../../actions/posts";
import { dateConvert } from "../../utils/dateConverter";
import PostItem from "../Posts/PostItem";

const MyPosts = ({user}) => {
    const dispatch = useDispatch();
    const {posts} = useSelector((state)=>state.post);
    useEffect(()=>{
        if(posts == null){
            dispatch(getUserPosts());
        }
    }, [posts])

    return (

        (posts && posts.length > 0)? (
            <div id="myposts">
                {posts.map((post, key) => (
                    <PostItem key={key} post={post} />
                ))}
            </div>
        ) : (
            <div className="nothing">
                <i></i>
                <div className="text">
                    You don't have any posts yet.
                </div>
            </div>
        )
    );
};

export default MyPosts;