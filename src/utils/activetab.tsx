import { useState } from "react";

export const useActiveTab = () => {
  const [activeTab, setActiveTab] = useState("summary");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return { activeTab, handleTabClick };
};
