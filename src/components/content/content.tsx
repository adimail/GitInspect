import React from "react";
import "./index.css";
import { useRepoContext } from "../../context/repocontext";

const Content = () => {
  const { inputValue, owner, repoName } = useRepoContext();

  return (
    <div className="container">
      <h1>This is body</h1>
      <p>Input Value: {inputValue}</p>
      <p>Owner: {owner}</p>
      <p>Repository Name: {repoName}</p>
    </div>
  );
};

export default Content;
