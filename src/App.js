import './App.css';
import { useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home.js';
import Question from './pages/question/Question.js'
import ProductsCollection from './pages/products-collection/ProductsCollection.js'

export const DataContext = createContext();

function App() {
  const [givenAnswers, setGivenAnswers] = useState({});
  function updateGivenAnswers(answers) {
    setGivenAnswers(answers);
  };

  return (
    <BrowserRouter>
      <DataContext.Provider value={{givenAnswers, updateGivenAnswers}}>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/question/:id" element={<Question/>}/>
          <Route path="/products-collection" element={<ProductsCollection/>}/>
      </Routes>
      </DataContext.Provider>
    </BrowserRouter>
  );
}

export default App;
