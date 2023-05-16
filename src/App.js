import React from "react";
import { useState, useEffect } from "react";
import Start from "./Start";
import { decode } from "html-entities";
import Quiz from "./Quiz";
import "./styles.css";

export default function App() {
  const [isStart, setIsStart] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState(null);
  const [childState, setChildState] = useState("");

  const [qs, setQs] = useState([
    {
      q: "",
      o: null,
      c: "",
      id: 0
    },
    {
      q: "",
      o: null,
      c: "",
      id: 1
    },
    {
      q: "",
      o: null,
      c: "",
      id: 2
    },
    {
      q: "",
      o: null,
      c: "",
      id: 3
    },
    {
      q: "",
      o: null,
      c: "",
      id: 4
    }
  ]);

  const categories = [
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=14&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=16&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple",
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
  ];

  const category = categories[childState];

  useEffect(() => {
    fetch(category)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setIsDisabled((prev) => !prev);
        console.log(childState);
      });
  }, [category, childState]);

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function randomQuiz() {
    const arr = [...data];
    const newState = [...qs];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(Math.random() * arr.length);
      const randomQ = arr[randomNumber];
      newState[i].q = decode(randomQ.question);
      const wrongOptions = randomQ.incorrect_answers.map((item) =>
        decode(item)
      );
      const options = [decode(randomQ.correct_answer), ...wrongOptions];
      newState[i].o = shuffleArray(options);
      newState[i].c = decode(randomQ.correct_answer);
      arr.splice(randomNumber, 1);
    }
    setQs(newState);
  }

  const handleChildStateChange = (newState) => {
    setChildState(newState);
  };

  return (
    <div className="App">
      {!isStart && (
        <Start
          setIsStart={setIsStart}
          isDisabled={isDisabled}
          randomQuiz={() => randomQuiz()}
          onStateChange={handleChildStateChange}
        />
      )}
      {isStart && (
        <Quiz qs={qs} setIsStart={setIsStart} setIsDisabled={setIsDisabled} />
      )}
    </div>
  );
}
