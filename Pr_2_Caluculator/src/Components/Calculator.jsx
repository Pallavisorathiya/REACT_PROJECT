import { useState } from "react";
import './Caluculator.css';

const Calculator = () => {
  const [buttons] = useState([
    1, 2, 3, '+',
    4, 5, 6, '-',
    7, 8, 9, '*',
    0, '/',
    '.', '%'
  ]);
  const [input, setInput] = useState('');

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleEvaluate = () => {
      const result = eval(input);
      setInput(result.toString());
 
  };

  return (
    <>
    <div className="title">
      <h1>Calculator</h1>
    </div>
    <div className="calculator">
      <input
        type="text"
        value={input}
        placeholder="0"
        readOnly
        className="input-field"
      />
      <div className="button-container">
        {buttons.map((item, index) => (
          <button
            className="btn"
            onClick={() => handleClick(item.toString())}
            key={index}
          >
            {item}
          </button>
        ))}
        <button className="btn equal" onClick={handleEvaluate}>=</button>
        <button className="btn clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
    </>
  );
};

export default Calculator;
