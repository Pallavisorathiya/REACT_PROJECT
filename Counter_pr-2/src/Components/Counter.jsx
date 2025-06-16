import  { useState } from "react";
import "./counter.css";

const Counter = () => {
  const [Count, setCount] = useState(0);

  const Incrimant = () => {
    setCount(Count + 1);
  };

  const Decrement = () => {
    if (Count > 0) {
      setCount(Count - 1);
    } else {
      alert("Count is already 0");
    }
  };

  const Reset = () => {
    setCount(0);
  };

  return (
    <div className="container">
      <h1 className="title">Counter App</h1>
      <div className="number">{Count}</div>
      <div className="btn-group">
        <button className="btn decrement" onClick={Decrement}>
          Decrement
        </button>
        <button className="btn reset" onClick={Reset}>
          Reset
        </button>
        <button className="btn increment" onClick={Incrimant}>
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
