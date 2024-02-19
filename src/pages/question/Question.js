import './Question.css'
import { GrFormNextLink } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from '../../App';

const questions = {
    '1' : {
      'question' : "What's your hair type or texture?",
      'answers' : [
        {'label': 'a. Straight', 'value': 'type_straight'},
        {'label': 'b. Curly', 'value': 'type_curly'},
        {'label': 'c. Wavy', 'value': 'type_wavy'},
        {'label': 'd. Fine', 'value': 'type_fine'}
      ]
    },
    '2' : {
      'question' : "How often do you wash your hair?",
      'answers' : [
        {'label': 'a. Daily', 'value': 'daily use'},
        {'label': 'b. Every other day', 'value': 'everyday use'},
        {'label': 'c. Twice a week', 'value': 'twice a week use'},
        {'label': 'd. Once a week', 'value': 'once a week use'},
        {'label': 'e. Every two weeks', 'value': 'every two weeks use'}
      ]
    },
    '3' : {
      'question' : "What benefit do you look for in your hair products?",
      'answers' : [
        {'label': 'a. Anti-breakage', 'value': 'breakage'},
        {'label': 'b. Hydration', 'value': 'hydration'},
        {'label': 'c. Soothing dry scalp', 'value': 'dry scalp'},
        {'label': 'd. Repairs appearance of damaged hair', 'value': 'damaged hair'},
        {'label': 'e. Volume', 'value': 'volume'},
        {'label': 'f. Curl and coil enhancing', 'value': 'curl enhancing'}
      ]
    },
    '4' : {
      'question' : "Is there anything troubling you about your hair?",
      'answers' : [
        {'label': 'a. Breakage', 'value': 'breakage'},
        {'label': 'b. Frizz', 'value': 'frizz'},
        {'label': 'c. Scalp dryness', 'value': 'dryness'},
        {'label': 'd. Damage', 'value': 'damage'},
        {'label': 'e. Tangling', 'value': 'detangling'}
      ]
    },
    '5' : {
      'question' : "What is your natural hair color(s) today?",
      'answers' : [
        {'label': 'a. Black', 'value': 'black'},
        {'label': 'b. Brown', 'value': 'brown'},
        {'label': 'c. Blonde', 'value': 'blonde'},
        {'label': 'd. Red/Orange', 'value': 'red/orange'},
        {'label': 'e. Silver/Grey', 'value': 'silver/grey'}
      ]
    }
  }

export default function Question () {
  const { givenAnswers, updateGivenAnswers } = useContext(DataContext);
  const params = useParams();

  function onAnswerClick (page, answerValue) {
    updateGivenAnswers({ ...givenAnswers, [page]: answerValue })
  }
  
  let questionsCount = Object.keys(questions).length;
  let page = params.id;
  if (page < 1 || page > questionsCount) {
    return <div>Not Found</div>;
  }

  let prevPage = page == 1 ? '' : 'question/' + (parseInt(page) - 1);
  let nextPage = page == questionsCount ? 'products-collection' : 'question/' + (parseInt(page) + 1);

  const answers = questions[page].answers.map(answer =>
    <li key={answer.value} className='answer'>
       <button onClick={()=>onAnswerClick(page, answer.value)} className={answer.value === givenAnswers[page] ? "active-answer" :""}>
        {answer.label}
       </button>
    </li>
  );
  return (
    <>
      <div className="counter" style={{ '--p': `${(page/questionsCount)*100}` }}>{page+'/'+questionsCount}</div>
      <div className='question'> 
        <h1>
          {questions[page].question}
        </h1>
        <ul>{answers}</ul>
        <div className='navigation-buttons'>
          <Link to={"/"+prevPage}>
            <p className="back" type="button">Back</p>
          </Link>
          <Link to={"/"+nextPage}>
            <button className="next" type="button"> { page == questionsCount ? 'Discover your results' : 'Next question' } <GrFormNextLink /> </button>
          </Link>
        </div>
      </div>
    </>
  )
}