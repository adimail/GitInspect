import React from "react";

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState<string>(() => {
    // Read the theme from localStorage if available, otherwise use "light" as default
    return localStorage.getItem("theme") || "light";
  });

  React.useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--background-color", "#ffffff");
      root.style.setProperty("--link-color", "#646cff");
      root.style.setProperty("--link-hover-color", "#535bf2");
    } else {
      root.style.setProperty("--background-color", "#222222");
      root.style.setProperty("--link-color", "#42b983");
      root.style.setProperty("--link-hover-color", "#64d8cb");
    }
  }, [theme]);

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
