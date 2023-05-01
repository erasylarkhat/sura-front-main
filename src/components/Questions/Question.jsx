import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import '../../styles/questions/question.scss';
import Answer from "./Answer";
import AnswerModal from "./AnswerModal";
import { getQuestion } from "../../actions/questions";
import { useParams } from "react-router-dom";
import { dateConvertFull } from "../../utils/dateConverter";

const Question = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {question} = useSelector((state)=>state.question);
    // const question = initQuestion;
    const [show, setShow] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setShow(true);
    }

    useEffect(()=>{
        if(!question)
            dispatch(getQuestion(id))
    }, [question])

    return question ? (
        <div id="question">
            <AnswerModal show={show} setShow={setShow} id={id}/>
            <div className="container">
                <div className="content">
                    <div className="question">
                        <div className="info">
                            <div className="title">{question.title}</div>
                            <div className="answer-count">{question.answers ? question.answers.length : 0} answers</div>
                            <div className="date">Asked on {dateConvertFull(question.created_at)}</div>
                        </div>
                        <div className="answer-btn" onClick={openModal}><i></i> Answer</div>
                    </div>
                    <div className="answers">
                        <div className="top">
                            Answers
                        </div>
                        {question.answers && question.answers.map((answer, key) => (
                            <Answer answer={answer} key={key}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="loading"></div>
    );
};

export default Question;
