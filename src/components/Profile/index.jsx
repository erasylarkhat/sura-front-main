import React, { useEffect, useState } from "react";
import '../../styles/profile/profile.scss';
import MyPosts from "./MyPosts";
import MyAnswers from "./MyAnswers";
import MyQuestions from "./MyQuestions";
import { Link } from "react-router-dom";
import decode from 'jwt-decode';
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants";

const initUser = {
    image: '',
    firstname: 'Zhanat',
    lastname: 'Tolkyn',
    credential: 'Student, future designer',
    bio: 'I like to go to various exhibitions and experience different artworks, I also like to paint, I feel relaxed when I paint (including illustration, watercolor, computer painting). I hope to find people who share my interests and go to various places together.',
}

const Profile = () => {
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState('posts');
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const [user, setUser] = useState(null);
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

    const handleTabChange = (e) => {
        const value = e.currentTarget.dataset.value;
        setCurrentTab(value);
    }

    return (
        <div id="profile">
            {user ? (
                <div className="container">
                    <div className="top">
                        <div className="userImage">
                            {user.avatar ? (
                                <img src={`${process.env.REACT_APP_SERVER}avatars/${user.avatar}`} alt="profile" />
                            ) : (
                                <div className="alt">{user.firstname[0]}</div>
                            )}
                        </div>
                        <div className="info">
                            <div className="name">
                                {user.firstname} {user.lastname}
                                <Link className="edit" to="settings">
                                    <i></i>
                                </Link>
                            </div>
                            <div className="details">
                                <div className="credential">
                                    {user.credential}
                                </div>
                                <div className="bio">
                                    {user.bio}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="tab-nav">
                            {/* <div className={`tab-item ${currentTab==='profile' ? 'active' : ''}`} data-value="profile" onClick={handleTabChange}>
                                Profile
                                <div className="hr"></div>
                            </div> */}
                            <div className={`tab-item ${currentTab==='posts' ? 'active' : ''}`} data-value="posts" onClick={handleTabChange}>
                                Posts
                                <div className="hr"></div>
                            </div>
                            <div className={`tab-item ${currentTab==='questions' ? 'active' : ''}`} data-value="questions" onClick={handleTabChange}>
                                Questions
                                <div className="hr"></div>
                            </div>
                            <div className={`tab-item ${currentTab==='answers' ? 'active' : ''}`} data-value="answers" onClick={handleTabChange}>
                                Answers
                                <div className="hr"></div>
                            </div>
                        </div>
                        {currentTab=='posts' && (<MyPosts user={user} />) }
                        {currentTab=='answers' && (<MyAnswers user={user} />) }
                        {currentTab=='questions' && (<MyQuestions user={user} />) }
                        {/* {currentTab=='posts' && (<MyPosts />) } */}
                    </div>
                </div>
            ) : (
                <div className="loading"></div>
            )}
        </div>
    );
};
export default Profile;