import React, { useEffect, useState } from "react";
import '../styles/header.scss';
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from "../constants";

// const initUser = {
//     firstname: 'Zhanat',
//     image: '',
// }
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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

    return (
        <header>
            <div className="desktop">
                <div className="container">
                    <div className="navbar">
                        <div className="logo">
                            <i></i>
                        </div>
                        <ul className="nav">
                            <li className={`home ${location.pathname === '/posts' ? 'active' : ''}`}>
                                <Link to='/posts'>
                                    <i></i>
                                </Link>
                            </li>
                            <li className={`qa ${location.pathname === '/questions' ? 'active' : ''}`}>
                                <Link to='/questions'>
                                    <i></i>
                                </Link>
                            </li>
                            <li className="search">
                                <SearchBar />
                            </li>
                        </ul>
                        <ul className="nav right">
                            <li className="profile">
                                <ProfBtn user={user} setUser={setUser}/>
                                
                            </li>
                            <li className="about">
                                <Link to='/about' className="btn">
                                    About us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mobile">
                <div className="navbar">
                    <nav className="top">
                        <li></li>
                        <li className="logo">
                            <i></i>
                        </li>
                        <li className="about">
                            <Link to='/about' className="btn">
                                About us
                            </Link>
                        </li>
                    </nav>
                    <nav className="bottom">
                        <li className={`home ${location.pathname === '/posts' ? 'active' : ''}`}>
                            <Link to='/posts'>
                                <i></i>
                            </Link>
                        </li>
                        <li className={`qa ${location.pathname === '/questions' ? 'active' : ''}`}>
                            <Link to='/questions'>
                                <i></i>
                            </Link>
                        </li>
                        <li className="profile">
                            <ProfBtn user={user} setUser={setUser} />
                            
                        </li>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.currentTarget.value);
    }
    const handleSearch = () => {
        console.log(search);
    }

    return (
        <div id="searchBar">
            <input type="text" value={search} onChange={handleChange}  placeholder="Search" />
            <div className="search-btn" onClick={handleSearch}>
                <i></i>
            </div>
        </div>
    );
}

const ProfBtn = ({user, setUser}) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = (e) => {
        e.preventDefault();
        setShow(false);
        dispatch({type: LOGOUT});
        navigate('/posts');
        setUser(null);
    }
    const navidateToProfile = (e) => {
        e.preventDefault();
        setShow(false);
        navigate('/profile')
    }
    const toggleDropdown = (e) => {
        setShow(!show);
    }
    return (
        <div className={`profbtn ${show ? 'active' : ''}`}>
            {user ? (
                <>
                    <div className="user" onClick={toggleDropdown}>
                        {user.avatar ? (
                            <img src={`${process.env.REACT_APP_SERVER}avatars/${user.avatar}`} alt="" />
                        ) : (
                            <div className="alt">{user.firstname[0]}</div>
                        )}
                    </div>
                    <div className="dropdown">
                        <div className="link" onClick={navidateToProfile}>
                            <i></i>
                            {user.firstname}
                        </div>
                        <div className="hr"></div>
                        <div className="logout" onClick={logout}>
                            <i></i>
                            Logout
                        </div>
                    </div>
                </>
            ) : (
                <Link to='/login' className="anonymous">
                    <i></i>
                </Link>
            )}
        </div>
    );
}