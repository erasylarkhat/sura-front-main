import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import decode from 'jwt-decode';
import { login } from "../../actions/user";

import '../../styles/auth/auth.scss';
import logo from '../../assets/images/logo.png';

const initFormData = {
    email: '',
    password: '',
}
const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(localStorage.getItem('profile'));
    const [formData, setFormData] = useState(initFormData);

    const {authStatus} = useSelector((state)=>state.user);

    useEffect(() => {
        if(profile && profile.user && profile.token){
            const token = profile.token;
            if (token) {
                const decodedToken = decode(token);
          
                if (decodedToken.exp * 1000 > new Date().getTime()){
                    navigate('/');
                } 
            }
        }
    }, [profile, dispatch]);

    useEffect(()=>{
        if(authStatus){
            switch (authStatus) {
                case 200:
                    var pf = JSON.parse(localStorage.getItem('profile'));
                    if(pf && pf.user){
                        navigate('/profile');
                    }
                    break;

                default:
                    break;
            }
        }
    }, [authStatus])

    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit}>
                <div className="top">
                    <img src={logo} alt="logo" className="logo" />
                    <div className="text">Have questions, must have answers.</div>
                </div>
                <div className="inputs">
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Your email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                </div>
                <input type="submit" className="submit" value="Login" />
                <div className="bottom">
                    <Link to="/signup">New User?</Link>
                    <Link to="/restore">Forgot password</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;