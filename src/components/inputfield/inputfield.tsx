import React, { useEffect, useState } from "react";
import "./ip.css";
import { useTheme } from "../../context/themecontext";
import { useRepoContext } from "../../context/repocontext";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import ParseRepo from "../../utils/parserepo";

const InputField = () => {
  const { theme, setTheme } = useTheme();
  const { setInputValue, setOwner, setRepoName } = useRepoContext();
  const [string, setString] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSubmit = () => {
    setInputValue(string);
    const { owner, repoName } = ParseRepo(string);
    setOwner(owner);
    setRepoName(repoName);
    console.log(string);
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
          value={string}
          onChange={(e) => setString(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default InputField;
