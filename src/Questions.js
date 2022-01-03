import React from 'react';
import Question from "./Question";

const Questions = ({questions, increaseScore}) => {
    return (
        <div className='container'>
            {questions.map(q =>
                <Question increaseScore={increaseScore} q={q} key={q.id}/>
            )}
        </div>
    );
};

export default Questions;