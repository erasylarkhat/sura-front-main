import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { restoreAccount } from "../../actions/user";

import '../../styles/auth/auth.scss';
import logo from '../../assets/images/logo.png';
import { CLEAR_USER_STATUS } from "../../constants";

const Restore = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const {resetStatus} = useSelector((state)=>state.user);
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        const value = e.currentTarget.value;
        setMessage('');
        setEmail(value);
    }

    useEffect(()=>{
        if(resetStatus){
            switch (resetStatus) {
                case 200:
                    setMessage("Message with link to reset your password has been sent to your email adress.");
                    break;
                default:
                    setMessage("Something went wrong, please try again.");
                    break;
            }
            dispatch({type: CLEAR_USER_STATUS});
        }
    }, [resetStatus])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(restoreAccount(email));
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
                        <label>Enter your email to reset your password</label>
                        <input type="email" placeholder="Your email" name="email" value={email} onChange={handleChange} />
                    </div>
                </div>
                <input type="submit" className="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Restore;