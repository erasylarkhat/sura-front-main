import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../actions/user";

import '../../styles/auth/auth.scss';
import logo from '../../assets/images/logo.png';

const initFormData = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
}
const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initFormData);
    const {authStatus} = useSelector((state)=>state.user);

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
        dispatch(signup(formData));
    }

    return (
        <div id="registration">
            <form onSubmit={handleSubmit}>    
                <div className="top">
                    <img src={logo} alt="logo" className="logo" />
                    <div className="text">Have questions, must have answers.</div>
                </div>
                <div className="inputs">
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" placeholder="First Name" name="firstname" value={formData.firstname} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" placeholder="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Your email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                </div>
                <input type="submit" className="submit" value="Sign Up" />
                <div className="bottom">
                    <Link to="/login">Have an account?</Link>
                </div>
            </form>
        </div>
    );
};

export default Registration;