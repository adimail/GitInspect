import React from "react";
import "./index.css";
import { useRepoContext } from "../../context/repocontext";

const Content = () => {
  const { inputValue } = useRepoContext();

  return (
    <div className="container">
      <h2>This is body</h2>
      <p>Input Value: {inputValue}</p>
    </div>
  );
};

export default Content;
