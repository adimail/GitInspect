import { useEffect, useState, useRef } from "react";
import "./ip.css";
import { useTheme } from "../../context/themecontext";
import { useRepoContext } from "../../context/repocontext";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { ParseRepo } from "../../utils/parserepo";
import { motion } from "framer-motion";

const InputField = () => {
  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const [fadeOut, setFadeOut] = useState(false);
  const [marginTop, setMarginTop] = useState(30);
  const [marginBottom, setMarginBottom] = useState(0);
  const [submitButtonVisible, setSubmitButtonVisible] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter GitHub repository URL");

  const { setInputValue, setOwner, setRepoName } = useRepoContext();
  const [string, setString] = useState("");

  useEffect(() => {
    const handleFocus = () => {
      setMarginTop(75);
      setMarginBottom(75);
      setSubmitButtonVisible(true);
      setPlaceholder("Enter GitHub repository URL 🔗🤗");
    };

    const handleBlur = () => {
      setMarginTop(30);
      setMarginBottom(0);
      setSubmitButtonVisible(false);
      setPlaceholder("Enter GitHub repository URL");
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
        inputRef.current?.blur();
      }
    }

    if (owner && repoName) {
      window.location.href = `/${owner}/${repoName}`;
    } else {
      window.location.href = `/invalidurl`;
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
    <div className="top">
      <div className="navbar">
        <h1 style={{ color: "white" }}>GitInspect</h1>
        <motion.div
          className={`themeicon`}
          onClick={toggleTheme}
          whileHover={{ scale: 1.15 }}
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
        initial={{ marginTop: 30, marginBottom: 0 }}
        animate={{ marginTop: marginTop, marginBottom: marginBottom }}
        transition={{ duration: 0.9 }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className="url-input"
          value={string}
          onChange={(e) => setString(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <motion.button
          style={{
            opacity: submitButtonVisible ? 1 : 0,
            transition: "opacity 0.9s ease",
          }}
          onClick={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: submitButtonVisible ? 1 : 0 }}
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
};

export default InputField;
