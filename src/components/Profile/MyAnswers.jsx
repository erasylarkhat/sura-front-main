import React, { useEffect } from "react";
import QuestionItem from "../Questions/QuestionItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserAnsweredQuestions } from "../../actions/questions";
import '../../styles/profile/myanswers.scss';
import { CLEAR_QUESTION_STATE } from "../../constants";

const MyAnswers = () => {
    const dispatch = useDispatch();
    const {questions} = useSelector((state)=>state.question);
    useEffect(()=>{
        dispatch({type: CLEAR_QUESTION_STATE});
    }, [dispatch])
    useEffect(()=>{
        if(!questions)
            dispatch(getUserAnsweredQuestions());
    }, [questions]);
    return (

        (questions && questions.length>0) ? (
            <div id="myanswers">
                {questions.map((question, key) => (
                    <QuestionItem question={question} key={key} />

                ))}
            </div>
        ) : (
            <div className="nothing">
                <i></i>
                <div className="text">
                    You haven't answered any questions yet.
                </div>
            </div>
        )
    );
};

export default MyAnswers;