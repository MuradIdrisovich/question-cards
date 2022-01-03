import React, {useEffect, useRef, useState} from 'react';

const Question = ({q, increaseScore}) => {
    const [flip, setFlip] = useState(true)
    const [newHeight, setNewHeight] = useState('')
    const frontEl = useRef();
    const difEl = useRef();
    const [newColor, setnewColor] = useState('')
    const [repetition, setRepetition] = useState([])

    function heightFunc(){
        let height = frontEl.current.clientHeight;
        setNewHeight(height)
    }

    useEffect(() => {
        console.log(difEl.current.innerText)
        if(difEl.current.innerText === 'hard'){
            setnewColor('#ffd5d5')
        } else if (difEl.current.innerText === 'medium'){
            setnewColor('#f4ffbb')
        } else {
            setnewColor('#c6ffcf')
        }
        heightFunc()
        setFlip(true)
    },[q.name])

    useEffect(() => {
        window.addEventListener('resize', () => {
            heightFunc()
        })
        return () => {
            window.removeEventListener('resize', () => {heightFunc()})
        }
    },[])

    function handleScore(o,answer){
        if(o === answer && !(repetition.includes(o))){
            setRepetition([...repetition, o])
            // console.log(!(repetition.includes(o)));
            increaseScore()
        }
    }
    return (
        <div
            key={q.id}
            className={flip ? 'card' : 'card flip'}
            onClick={() => setFlip(!flip)}
            style={{height: newHeight, backgroundColor: newColor}}
        >
            <div ref={frontEl} className='front'>
                <div  className="question">{q.name}</div>
                <div className="options">
                    {q.options.map((o,index) =>
                        <div onClick={() => handleScore(o,q.answer)} className='option' key={index}>{o}</div>
                    )}
                </div>
                <div style={{display: 'none'}} ref={difEl}>{q.difficulty}</div>
            </div>
            <div className="back">
                <div className="answer">{q.answer}</div>
            </div>
        </div>
    );
};

export default Question;