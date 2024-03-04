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

export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState<string>(() => {
    // Read the theme from localStorage if available, otherwise use "light" as default
    return localStorage.getItem("theme") || "light";
  });

  React.useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.style.setProperty("--background-color", "#D5D8DC");
      root.style.setProperty("--text-color", "#000000");
      root.style.setProperty("--link-color", "#646cff");
      root.style.setProperty("--link-hover-color", "#535bf2");
      root.style.setProperty("--table-background-color", "#76ccc1");
      root.style.setProperty("--table-border-color", "#000000");
      root.style.setProperty("--active-nav-bar-color", "#6C3483");
    } else {
      root.style.setProperty("--background-color", "#323f4c");
      root.style.setProperty("--text-color", "#ffffff");
      root.style.setProperty("--link-color", "#42b983");
      root.style.setProperty("--link-hover-color", "#64d8cb");
      root.style.setProperty("--table-background-color", "#1E272E");
      root.style.setProperty("--table-border-color", "#ffffff");
      root.style.setProperty("--active-nav-bar-color", "#28b463");
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
