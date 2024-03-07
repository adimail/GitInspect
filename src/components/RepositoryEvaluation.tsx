import { useState, useEffect, useRef } from "react";
import { GitHubAPIKey } from "../secrets";
import { GetInfo, RepoInfo, OwnerInfo } from "../utils/readrepo";
import { useTheme } from "../context/themecontext";
import { useParams } from "react-router-dom";
import { useActiveTab } from "../utils/activetab";

import { FaCode, FaHistory } from "react-icons/fa";
import { SiPowerpages } from "react-icons/si";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";

import { User, Summary, Repo, CommitHistory } from "./evaluationtabs";
import { MoveToTop } from "../utils/gototop";

import SEO from "./helmet";

interface RepoData {
  repoInfo: RepoInfo;
  ownerInfo: OwnerInfo;
}

interface RenderHelmetProps {
  title: string;
}

const RenderHelmet: React.FC<RenderHelmetProps> = ({ title }) => {
  return (
    <SEO
      title={title}
      description="Git Inspect is a web app for reviewing GitHub repo & user stats. It utilizes the GitHub API to provide insights into commit history & more."
      name="Git Inspect"
      type="Article"
    />
  );
};

const RepositoryEvaluation = () => {
  const { theme } = useTheme();
  const { owner, repoName } = useParams<{
    owner: string | undefined;
    repoName: string | undefined;
  }>() ?? { owner: undefined, repoName: undefined };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [cardTheme, setCardTheme] = useState<string>("darcula ");

  const { activeTab, handleTabClick } = useActiveTab();
  const navbarRef = useRef<HTMLDivElement>(null);

  const renderComponent = () => {
    switch (activeTab) {
      case "summary":
        return (
          <Summary
            owner={owner}
            cardTheme={cardTheme}
            repoName={repoName}
            repoInfo={repoInfo}
            ownerInfo={ownerInfo}
          />
        );
      case "userinfo":
        return (
          <User ownerInfo={ownerInfo} owner={owner} cardTheme={cardTheme} />
        );
      case "repoinfo":
        return (
          <Repo
            owner={owner}
            cardTheme={cardTheme}
            repoName={repoName}
            repoInfo={repoInfo}
          />
        );
      case "commithistory":
        return <CommitHistory repoInfo={repoInfo} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (navbarRef.current) {
      const navbarOffset = navbarRef.current.getBoundingClientRect().top;
      window.scrollTo({
        top: window.pageYOffset + navbarOffset,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (theme === "dark") {
      setCardTheme("dark");
    } else setCardTheme("darcula ");
  }, [theme]);

  useEffect(() => {
    const fetchRepoData = async () => {
      if (!owner || !repoName) return;

      setLoading(true);
      setError("");

      try {
        const token: string = GitHubAPIKey;
        const data = await GetInfo(owner, repoName, token);
        if (data) {
          setRepoData(data);
          setUserExists(true);
        } else {
          setUserExists(false);
        }
      } catch (error: any) {
        setError(`Error fetching data: ${error.message}`);
        setRepoData(null);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 0);
      }
    };

    fetchRepoData();
  }, [owner, repoName]);

  if (loading) {
    return (
      <>
        <RenderHelmet title="Git Inspect - Loading" />
        <p className="container pt-5">Loading...</p>
      </>
    );
  }
  if (error)
    return (
      <>
        <RenderHelmet title="Git Inspect - Uncaught Error" />
        <p className="container pt-5">{error}</p>
      </>
    );
  if (owner && repoName && !userExists) {
    return (
      <>
        <RenderHelmet title="Git Inspect - Search Error" />
        <div className="container">
          <p className="pt-5">
            There is a typo in your search.
            <br />
            GitInspect cannot find matching results for user{" "}
            <strong>{owner}</strong> & repository <strong>{repoName}</strong>
          </p>
          <p>
            Go back to <a href="/">home</a> page
          </p>
        </div>
      </>
    );
  }
  if (!repoData) return null;

  const { repoInfo, ownerInfo } = repoData;

  return (
    <>
      <RenderHelmet title="Git Inspect - Evaluation" />

      <div className="wrapper">
        <div ref={navbarRef} className="gitinspect-navbar">
          <div
            className={`nav-item ${activeTab === "summary" ? "active" : ""}`}
            onClick={() => handleTabClick("summary")}
          >
            <SiPowerpages size={20} />
            <span>Summary</span>
          </div>
          <div
            className={`nav-item ${activeTab === "repoinfo" ? "active" : ""}`}
            onClick={() => handleTabClick("repoinfo")}
          >
            <FaCode size={20} />
            <span>Repo Info</span>
          </div>
          <div
            className={`nav-item ${activeTab === "userinfo" ? "active" : ""}`}
            onClick={() => handleTabClick("userinfo")}
          >
            <BsFillFileEarmarkPersonFill size={20} />
            <span>User Info</span>
          </div>
          <div
            className={`nav-item ${
              activeTab === "commithistory" ? "active" : ""
            }`}
            onClick={() => handleTabClick("commithistory")}
          >
            <FaHistory size={20} />
            <span>Commits</span>
          </div>
        </div>

        <div className="container">{renderComponent()} </div>
        <MoveToTop />
      </div>
    </>
  );
};

export default RepositoryEvaluation;
