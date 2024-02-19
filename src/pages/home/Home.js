import './Home.css'
import png from '../../resources/homeImg.jpeg';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from '../../App';

export default function Home () {
    const { givenAnswers, updateGivenAnswers } = useContext(DataContext);
    function onStart () {
        updateGivenAnswers({})
    }
    return (
        <>
            <img
                className="home-picture"
                src={png}
                alt="img"/>
            <div className="content-container">
                <div className="text-container">
                    <h1>Build a self care routine suitable for you</h1>
                    <p>Take out test to get a personalised self care routine based on your needs.</p>
                </div>
                <Link to={`/question/${1}`}>
                    <button id="start-button" type="button" onClick={onStart}>Start the quiz</button>
                </Link>
            </div>
        </>
  )
}