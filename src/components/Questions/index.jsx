import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionItem from "./QuestionItem";
import decode from 'jwt-decode';
import '../../styles/questions/index.scss';
import { getQuestions } from "../../actions/questions";
import { CLEAR_QUESTION_STATE, LOGOUT } from "../../constants";
import CreateModal from "../CreateModal";


const Questions = () => {
    const dispatch = useDispatch();
    const {questions} = useSelector((state)=>state.question);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);

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
        dispatch({type: CLEAR_QUESTION_STATE});
    }, [dispatch])

    useEffect(()=>{
        if(!questions){
            dispatch(getQuestions());
        }
    },[questions])
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
        dispatch(getQuestions(search));
    }
    return questions ? (
        <div id="questions">
            <CreateModal show={show} setShow={setShow} />
            <div className="container">
                    {/* <div className="heading">QUESTIONS</div> */}
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
                <div className="content">
                    {questions && questions.length > 0 && questions.map((question, key)=>(
                        <QuestionItem question={question} key={key} />
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <div className="loading"></div>
    );
};

export default Questions;