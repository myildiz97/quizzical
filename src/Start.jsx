import React, { useState } from "react";

export default function Start(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const { setIsStart, isDisabled, randomQuiz, onStateChange } = props;

  function handleStart() {
    randomQuiz();
    setIsStart(true);
  }

  const handleOptionChange = (event) => {
    const newState = event.target.value;
    setSelectedOption(newState);
    onStateChange(newState);
    //setSelectedOption(event.target.value);
  };

  return (
    <div className="start-page">
      <h1>Quizzical</h1>
      <hr />
      <p>
        There will be <strong>five</strong> random questions in{" "}
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">Select Category</option>
          <option value="0">General Knowledge</option>
          <option value="1">Books</option>
          <option value="2">Film</option>
          <option value="3">Music</option>
          <option value="4">Television</option>
          <option value="5">Video Games</option>
          <option value="6">Board Games</option>
          <option value="7">Sports</option>
          <option value="8">Science & Nature</option>
          <option value="9">Computer Science</option>
        </select>
        category. There is only <strong>one</strong> correct answer of each
        question.
      </p>
      <button className="start-btn" onClick={handleStart} disabled={isDisabled}>
        Start Quiz
      </button>
    </div>
  );
}
