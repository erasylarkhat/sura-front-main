import React from "react";
import '../../styles/questions/questionItem.scss';
import { Link } from "react-router-dom";
import { dateConvertFull } from "../../utils/dateConverter";

const QuestionItem = ({question}) => {
    return (
        <div className="question-item">
            <div className="info">
                <div className="title">{question.title}</div>
                <div className="date">
                    <span className="answers-count">{question.answers ? question.answers.length : 0} Answers ·</span> Asked on {dateConvertFull(question.createdAt)}
                </div>
            </div>
            <Link to={`/questions/${question.id}`} className="answer-btn">
                Answer
            </Link>
        </div>
    );
};

export default QuestionItem;