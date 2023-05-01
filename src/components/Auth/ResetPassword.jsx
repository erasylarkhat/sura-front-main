import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restorePassword } from "../../actions/user";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import '../../styles/auth/auth.scss';
import logo from '../../assets/images/logo.png';
import { CLEAR_USER_STATUS } from "../../constants";
const initFormData = {
    password: "",
    rePassword: "",
}
const ResetPassword = () => {
    const location = useLocation();
    const { email, token, expires } = queryString.parse(location.search);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(initFormData);
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        setFormData({...formData, [name]: value});
        setMessage('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.password)
            setMessage('Type in your new password');
        else if(!formData.rePassword)
            setMessage('Retype your new password');
        else if(formData.password !== formData.rePassword){
            setMessage('Passwords do not match');
        }else{
            dispatch(restorePassword(formData, email, token, expires));
        }
    }

    return (
        <div id="login">
            <form onSubmit={handleSubmit}>
                <div className="top">
                    <img src={logo} alt="logo" className="logo" />
                    <div className="text">Have questions, must have answers.</div>
                    {message && (
                        <div className="text">{message}</div>
                    )}
                </div>
                <div className="inputs">
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Retype password</label>
                        <input type="password" placeholder="Retype password" name="rePassword" value={formData.rePassword} onChange={handleChange} />
                    </div>
                </div>
                <input type="submit" className="submit" value="Reset" />
            </form>
        </div>
    );
};

export default ResetPassword;