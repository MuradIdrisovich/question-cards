import './App.css';
import {useEffect, useRef, useState} from "react";
import Questions from "./Questions";
import axios from "axios";
import {decode} from "./utils";

function App() {
    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('')
    const [difficulty, setDifficulty] = useState('');
    const [score, setScore] = useState(0)

    const categoryEl = useRef(null);
    const amountEl = useRef()
    const difficultyEl = useRef();

    function increaseScore(){
        setScore(score + 1)
    }

    useEffect(() => {
        axios.get('https://opentdb.com/api_category.php')
            .then((res) => setCategories(res.data.trivia_categories))
    },[])                         // getting categories

    function getCards(cat,dif,amnt){
        axios.get('https://opentdb.com/api.php', {
            params: {
                category: cat || 9,
                amount: amnt || 10,
                difficulty: dif || null
            }
        })
            .then((res) => setQuestions(res.data.results.map((q, index) => {
                return {
                    id: index,
                    name: decode(q.question),
                    options: ([...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)).map(el => {
                        return decode(el)
                    }),
                    answer: decode(q.correct_answer),
                    difficulty: q.difficulty
                }
            })))
    }                         // func getting cards

    useEffect(() => {                                      // getting first five cards
        getCards(category, difficulty, amountEl.current.value)
    },[])

    function handleSubmit(e){
        e.preventDefault();
        getCards(category, difficulty, amountEl.current.value)
    }

  return (
    <>
        <div className='header'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <select
                    className='categories'
                    onChange={() => {setCategory(categoryEl.current.value)}}
                    ref={categoryEl} >
                    {categories.map((c) => {
                        return <option value={c.id} key={c.id}>{c.name}</option>
                    })}
                </select>
                <select
                    className='difficulty'
                    onChange={() => {setDifficulty(difficultyEl.current.value)}}
                    ref={difficultyEl}
                    defaultValue={'Difficulty'}
                >
                    <option disabled>Difficulty</option>
                    {['easy','medium','hard'].map((d,index) =>
                         <option  key={index} value={d} >{d}</option>
                    )}
                </select>
                <input
                    className='amount'
                    type="number" name="amount"
                    min="1" max="50" step='1'
                    defaultValue='10'
                    ref={amountEl}
                />
                <div className='score'>{'Score: ' + score}</div>
                <button type='submit'>GENERATE</button>
            </form>
        </div>

        <Questions increaseScore={increaseScore} questions={questions}/>
    </>
  );
}

export default App;
