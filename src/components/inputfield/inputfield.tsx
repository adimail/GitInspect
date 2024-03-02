import { useEffect, useState, useRef } from "react";
import "./ip.css";
import { useTheme } from "../../context/themecontext";
import { useRepoContext } from "../../context/repocontext";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import ParseRepo from "../../utils/parserepo";
import { motion } from "framer-motion";

const InputField = () => {
  const { theme, setTheme } = useTheme();
  const { setInputValue, setOwner, setRepoName } = useRepoContext();
  const [string, setString] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [marginTop, setMarginTop] = useState(50);
  const [marginBottom, setMarginBottom] = useState(0);
  const [submitButtonVisible, setSubmitButtonVisible] = useState(false);

  useEffect(() => {
    const handleFocus = () => {
      setMarginTop(100);
      setMarginBottom(100);
      setSubmitButtonVisible(true);
    };

    const handleBlur = () => {
      setMarginTop(30);
      setMarginBottom(0);
      setSubmitButtonVisible(false);
    };

    inputRef.current?.addEventListener("focus", handleFocus);
    inputRef.current?.addEventListener("blur", handleBlur);

    return () => {
      inputRef.current?.removeEventListener("focus", handleFocus);
      inputRef.current?.removeEventListener("blur", handleBlur);
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
        inputRef.current.blur();
      }
    }

    setOwner(owner);
    setRepoName(repoName);
    console.log(string);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        <h1 style={{ color: "white" }}>ReadRepo</h1>
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
        <motion.button
          style={{
            opacity: submitButtonVisible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
          onClick={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: submitButtonVisible ? 1 : 0 }}
        >
          Submit
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default InputField;
