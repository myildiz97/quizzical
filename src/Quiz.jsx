import React, { useState } from "react";
import { nanoid } from "nanoid";

export default function Quiz(props) {
  const [selectedOption, setSelectedOption] = useState(["", "", "", "", ""]);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);
  const { qs, setIsStart, setIsDisabled } = props;
  const handleOptionChange = (event, id) => {
    const newState = [...selectedOption];
    newState[id] = event?.target?.value || "";
    return setSelectedOption(newState);
  };

  const handleCheck = () => {
    setIsChecked(true);
    for (let i = 0; i < 5; i++) {
      if (selectedOption[i] === qs[i].c) {
        setCount((prev) => prev + 1);
      }
    }
  };

  const handleClick = () => {
    setIsStart((prev) => !prev);
    setIsDisabled((prev) => !prev);
  };

  const quiz = qs.map((item, index) => {
    return (
      <div className="questions" key={index}>
        <h2>{item.q}</h2>
        <div className="options">
          {item.o.map((option, optionIndex) => {
            const isCorrect = selectedOption[index] === item.c;
            const isSelected = selectedOption[index] === option;
            let backgroundColor, color;
            if (isSelected) {
              if (isChecked && isCorrect) {
                backgroundColor = "#a7c957";
                color = "#ffffff";
              } else if (isChecked) {
                backgroundColor = "#ffb3c6";
                color = "#ffffff";
              } else {
                backgroundColor = "#4d5b9e";
                color = "#ffffff";
              }
            } else {
              if (isChecked && isCorrect === false && option === item.c) {
                backgroundColor = "#a7c957";
                color = "#ffffff";
              } else {
                backgroundColor = "#ffffff";
                color = "#000000";
              }
            }
            return (
              <label
                className="radio-button"
                key={optionIndex}
                style={{ backgroundColor, color, fontWeight: "bold" }}
              >
                <input
                  id={nanoid()}
                  type="radio"
                  name={`option_${index}`}
                  value={option}
                  checked={selectedOption[index] === option}
                  onChange={(event) => handleOptionChange(event, index)}
                />
                {option}
              </label>
            );
          })}
        </div>
        <hr />
      </div>
    );
  });
  return (
    <div className="main-quiz">
      {quiz}
      {!isChecked && (
        <button className="check-btn" onClick={handleCheck}>
          Check Answers
        </button>
      )}
      {isChecked && (
        <div className="play-again">
          <span>{`You scored ${count}/5 correct answers`}</span>
          <button className="play-again-btn" onClick={handleClick}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
