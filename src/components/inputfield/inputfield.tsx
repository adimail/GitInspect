import React, { useEffect, useState, useRef } from "react";
import "./ip.css";
import { useTheme } from "../../context/themecontext";
import { useRepoContext } from "../../context/repocontext";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import ParseRepo from "../../utils/parserepo";

const InputField = () => {
  const { theme, setTheme } = useTheme();
  const { setInputValue, setOwner, setRepoName } = useRepoContext();
  const [string, setString] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        // Focus on the input field when Ctrl + K is pressed
        inputRef.current.focus();
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSubmit = () => {
    setInputValue(string);
    if (string) {
      const parsedRepo = ParseRepo(string);
      if (parsedRepo !== null) {
        const { owner, repoName } = parsedRepo;
        setOwner(owner);
        setRepoName(repoName);
        console.log(string);
      } else {
        setOwner("");
        setRepoName("");
      }
    } else {
      setOwner("");
      setRepoName("");
    }
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
        Evaluate GitHub repositories. Read about the{" "}
        <a href="/algorithm">algorithm</a>
      </p>
      <div className="input-container">
        <input
          ref={inputRef}
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
