import React, { createContext, useContext, useState } from "react";

interface RepoContextType {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  owner: string | null;
  setOwner: React.Dispatch<React.SetStateAction<string | null>>;
  repoName: string | null;
  setRepoName: React.Dispatch<React.SetStateAction<string | null>>;
}

const RepoContext = createContext<RepoContextType | undefined>(undefined);

export const useRepoContext = () => {
  const context = useContext(RepoContext);
  if (!context) {
    throw new Error("useRepoContext must be used within a RepoProvider");
  }
  return context;
};

export const RepoProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [owner, setOwner] = useState<string | null>(null);
  const [repoName, setRepoName] = useState<string | null>(null);

  return (
    <RepoContext.Provider
      value={{
        inputValue,
        setInputValue,
        owner,
        setOwner,
        repoName,
        setRepoName,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};
