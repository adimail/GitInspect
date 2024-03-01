import React from "react";
import "./index.css";
import { useRepoContext } from "../../context/repocontext";

const DefaultContent = () => {
  return (
    <div className="container">
      <h1>This is default content</h1>
    </div>
  );
};

const RepositoryEvaluation = () => {
  const { inputValue, owner, repoName } = useRepoContext();
  return (
    <div className="container">
      <p>Input Value: {inputValue}</p>
      <p>Owner: {owner}</p>
      <p>Repository Name: {repoName}</p>
    </div>
  );
};

const Content = () => {
  const { inputValue, owner, repoName } = useRepoContext();

  if (owner && repoName) {
    return <RepositoryEvaluation />;
  } else {
    return <DefaultContent />;
  }
};

export default Content;
