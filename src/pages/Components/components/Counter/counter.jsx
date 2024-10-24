import { useState } from "react";
import "./counter.css";

function Counter(props) {
  const [value, setValue] = useState(props.value || 0);
  function inc() {
    setValue(value + 1);
  }

  function dec() {
    setValue(value - 1);
  }
  return (
    <div className="counter-container">
      <h3 className="title">{props.name || "Counter"}</h3>
      <button className="btn btn-danger" onClick={dec}>
        &minus;
      </button>
      <span className="counter-value">{value}</span>
      <button className="btn btn-success" onClick={inc}>
        +
      </button>
    </div>
  );
}

export default Counter;
