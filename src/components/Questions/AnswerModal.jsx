import React, { useEffect, useState } from "react";
import '../../styles/questions/answerModal.scss';
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';
import { LOGOUT } from "../../constants";
import { answerQuestion } from "../../actions/questions";
import { Link } from "react-router-dom";

const initUser = {
    image: '',
    firstname: 'Zhanat',
    lastname: 'Tolkyn',
};
const AnswerModal = ({show, setShow, id}) => {
    const dispatch = useDispatch();
    const [answer, setAnswer] = useState({content: ''});
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

    const close = (e) => {
        e.preventDefault();
        setShow(false);
    }
    
    const handleChange = (e) => {
        const value = e.currentTarget.value;
        setAnswer({content: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(answer.content){
            dispatch(answerQuestion(id, answer));
            close(e);
        }
    }

    if(!show)
        return;
    return (
        <div className="answerModal">
            <div className="modal">
                <div className="close" onClick={close}>
                    <i></i>
                </div>
                {user ? (
                    <>
                        <div className="top">
                            <div className="userImage">
                                {user.avatar ? (
                                    <img src={`${process.env.REACT_APP_SERVER}avatars/${user.avatar}`} alt="" />
                                ) : (
                                    <div className="alt">{user.firstname[0]}</div>
                                )}
                            </div>
                            <div className="name">
                                {user.firstname} {user.lastname}
                            </div>
                        </div>
                        <textarea name="answer" value={answer.content} onChange={handleChange} placeholder="Write your answer" ></textarea>
                        <div className="bottom">
                            <div className="btn" onClick={handleSubmit}>Send</div>
                        </div>
                    </>
                ) : (
                    <div className="unauthorized">
                        <div className="text">You need to authorize first</div>
                        <Link to="/login" className="login-btn">Login</Link>
                        <Link to="/login" className="signin-btn">Signin</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnswerModal;