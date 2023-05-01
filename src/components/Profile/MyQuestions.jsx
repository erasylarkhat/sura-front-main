import React, { useEffect } from "react";

import '../../styles/profile/myquestions.scss';
import QuestionItem from "../Questions/QuestionItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserQuestions } from "../../actions/questions";
import { CLEAR_QUESTION_STATE } from "../../constants";

const MyQuestions = () => {
    const dispatch = useDispatch();
    const {questions} = useSelector((state)=>state.question);
    useEffect(()=>{
        dispatch({type: CLEAR_QUESTION_STATE});
    }, [dispatch])
    useEffect(()=>{
        if(!questions)
            dispatch(getUserQuestions());
    }, [questions]);
    return (
        (questions && questions.length>0) ? (
            <div id="myquestions">
                {questions.map((question, key) => (
                    <QuestionItem question={question} key={key} />
                ))}
            </div>
        ) : (
            <div className="nothing">
                <i></i>
                <div className="text">
                    You haven't asked any questions yet.
                </div>
            </div>
        )
    );
};

export default MyQuestions;