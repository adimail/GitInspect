import React, { createContext, useContext, useState } from "react";

interface RepoContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const useRepoContext = () => {
  const context = useContext(RepoContext);
  if (!context) {
    throw new Error("useRepoContext must be used within a RepoProvider");
  }
  return context;
};

export const RepoProvider: React.FC = ({ children }) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <RepoContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </RepoContext.Provider>
  );
};
