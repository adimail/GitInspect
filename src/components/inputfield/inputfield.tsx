import React, { useEffect, useState, useRef } from "react";
import "./ip.css";
import { useTheme } from "../../context/themecontext";
import { useRepoContext } from "../../context/repocontext";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import ParseRepo from "../../utils/parserepo";
import ErrorModal from "../ErrorModal";
import { motion } from "framer-motion";

const InputField = () => {
  const { theme, setTheme } = useTheme();
  const { setInputValue, setOwner, setRepoName } = useRepoContext();
  const [string, setString] = useState("");
  const inputRef = useRef(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [marginTop, setMarginTop] = useState(100);
  const [marginBottom, setMarginBottom] = useState(100);
  const [submitButtonVisible, setSubmitButtonVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
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
    setFadeOut(true);
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (fadeOut) {
      setTimeout(() => {
        setFadeOut(false);
      }, 300);
    }
  }, [fadeOut]);

  const handleSubmit = () => {
    setInputValue(string);
    let owner = "";
    let repoName = "";

    if (string) {
      const parsedRepo = ParseRepo(string);
      if (parsedRepo !== null) {
        const { owner: parsedOwner, repoName: parsedRepoName } = parsedRepo;
        owner = parsedOwner;
        repoName = parsedRepoName;
        setMarginTop(30);
        setMarginBottom(10);
        setSubmitButtonVisible(false);
        inputRef.current.blur();
      }
    }

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
    <motion.div
      className="top"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar">
        <h1>ReadRepo</h1>
        <div className="d-flex align-items-center gap-3">
          <a href="https://github.com/adimail/ReadRepo">
            <FaGithub color="white" size={20} />
          </a>
          <motion.div
            className={`themeicon ${fadeOut ? "fade-out" : "fade-in"}`}
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
          >
            {theme === "light" ? (
              <MdLightMode size={27} color="orange" />
            ) : (
              <MdDarkMode size={27} color="gray" />
            )}
          </motion.div>
        </div>
      </div>
      <motion.div
        className="input-container"
        style={{ marginTop: marginTop, marginBottom: marginBottom }}
        initial={{ marginTop: 10, marginBottom: 10 }}
        animate={{ marginTop: marginTop, marginBottom: marginBottom }}
        transition={{ duration: 0.5 }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter GitHub repository URL"
          className="url-input"
          value={string}
          onChange={(e) => setString(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {submitButtonVisible && <button onClick={handleSubmit}>Submit</button>}
      </motion.div>
    </motion.div>
  );
};

export default InputField;
