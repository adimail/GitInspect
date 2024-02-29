import React, { useState } from "react";
import "./ip.css";
import { useTheme } from "../../context/themecontext";
import { useRepoContext } from "../../context/repocontext";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const InputField = () => {
  const { theme, setTheme } = useTheme();
  const { inputValue, setInputValue } = useRepoContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSubmit = () => {
    console.log(inputValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="top">
      <div className="navbar">
        <h1>Read Repo</h1>
        <div className="themeicon" onClick={toggleTheme}>
          {theme === "light" ? (
            <MdLightMode size={20} />
          ) : (
            <MdDarkMode size={20} />
          )}
        </div>
      </div>
      <p>
        Evaluate github repositories. Read about the{" "}
        <a href="/algorithm">algorithm</a>
      </p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter GitHub repository URL"
          className="url-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default InputField;
