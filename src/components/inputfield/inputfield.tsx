import { useEffect, useState } from "react";
import "./ip.css";
import { useTheme } from "../../context/themecontext";
import { useRepoContext } from "../../context/repocontext";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { ParseRepo } from "../../utils/parserepo";
import { motion } from "framer-motion";

interface InputFieldState {
  marginTop: number;
  marginBottom: number;
  submitButtonVisible: boolean;
  placeholder: string | null;
  string: string;
}

const InputField = () => {
  const { theme, setTheme } = useTheme();
  const { setInputValue, setOwner, setRepoName } = useRepoContext();

  const [state, setState] = useState<InputFieldState>({
    marginTop: 10,
    marginBottom: 0,
    submitButtonVisible: false,
    placeholder: "Enter GitHub repository URL",
    string: "",
  });

  const { marginTop, marginBottom, submitButtonVisible, placeholder, string } =
    state;

  const inputquery = new URLSearchParams(window.location.search).get(
    "inputquery"
  );

  useEffect(() => {
    if (inputquery) {
      setState((prevState) => ({
        ...prevState,
        placeholder: inputquery,
      }));
    }
  }, [inputquery]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
      }
    }

    if (owner && repoName) {
      window.location.href = `/${owner}/${repoName}?inputquery=${encodeURIComponent(
        string
      )}`;
    } else {
      window.location.href = `/not-found?invalidtoken=${encodeURIComponent(
        string
      )}`;
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

  const handleFocus = () => {
    setState((prevState) => ({
      ...prevState,
      marginTop: 60,
      marginBottom: 60,
      submitButtonVisible: true,
      placeholder: "Enter GitHub repository URL 🔗🤗",
    }));
  };

  const handleBlur = () => {
    setState((prevState) => ({
      ...prevState,
      marginTop: 30,
      marginBottom: 0,
      submitButtonVisible: false,
      placeholder: inputquery ?? "Enter GitHub repository URL",
    }));
  };

  return (
    <div className="top">
      <div className="navbar">
        <h1>
          <a style={{ color: "white" }} href="/">
            GitInspect
          </a>
        </h1>
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
        initial={{ marginTop: 10, marginBottom: 0 }}
        animate={{ marginTop: marginTop, marginBottom: marginBottom }}
        transition={{ duration: 0.6 }}
      >
        <input
          type="text"
          placeholder={placeholder ?? ""}
          className="url-input"
          value={string}
          onChange={(e) =>
            setState((prevState) => ({ ...prevState, string: e.target.value }))
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
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
