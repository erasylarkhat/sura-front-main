import React, { useEffect, useState } from "react";

import '../../styles/questions/answer.scss';
import { dateConvertFull } from "../../utils/dateConverter";
import { useDispatch, useSelector } from "react-redux";
import { dislikeAnswer, likeAnswer } from "../../actions/questions";

const Answer = ({answer: currentAnswer}) => {
    const dispatch = useDispatch();
    const {answer:newAnswer} = useSelector((state)=>state.question); 
    const [answer, setAnswer] = useState(currentAnswer);
    const like = (e) => {
        e.preventDefault();
        dispatch(likeAnswer(answer.id));
    }
    const dislike = (e) => {
        e.preventDefault();
        dispatch(dislikeAnswer(answer.id));
    }
    useEffect(()=>{
        if(newAnswer && newAnswer.id == answer.id){
            setAnswer(newAnswer);
        }
    }, [newAnswer]);
    return (
        <div className="answer">
            <div className="user">
                <div className="image">
                    {answer.user.avatar ? (
                        <img src={`${process.env.REACT_APP_SERVER}avatars/${answer.user.avatar}`} alt="" />
                    ) : (
                        <div className="alt">{answer.user.firstname[0]}</div>
                    )}
                </div>
                <div className="info">
                    <div className="name">{answer.user.firstname} {answer.user.lastname}</div>
                    <div className="credential">{answer.user.credential}, {dateConvertFull(answer.created_at)}</div>
                </div>
            </div>
            <div className="content">
                {answer.content}
            </div>
            <div className="bottom">
                <div className="likes">{answer.likes.length>0 && answer.likes.length} <i onClick={like}></i></div>
                <div className="dislikes">{answer.dislikes.length>0 && answer.dislikes.length} <i onClick={dislike}></i></div>
                {/* <div className="comments"><i></i> {answer.comments>0 && answer.comments}</div> */}
            </div>
        </div>
    );
};

export default Answer;