import React from "react";
import "./index.css";
import { useRepoContext } from "../../context/repocontext";
import { Route, Routes } from "react-router-dom";

const Content = () => {
  const { owner, repoName } = useRepoContext();

  return (
    <div className="container">
      <h2>This is body</h2>
      <p>Owner: {owner}</p>
      <p>Repository Name: {repoName}</p>
    </div>
  );
};

export default Content;
