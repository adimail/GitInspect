import { useState, useEffect } from "react";
import { GitHubAPIKey } from "../secrets";
import { GetInfo, RepoInfo, OwnerInfo } from "../utils/readrepo";
import { useRepoContext } from "../context/repocontext";
import { FaGithub } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useTheme } from "../context/themecontext";

interface RepoData {
  repoInfo: RepoInfo;
  ownerInfo: OwnerInfo;
}

const RepositoryEvaluation = () => {
  const { theme } = useTheme();
  const { inputValue, owner, repoName } = useRepoContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [userExists, setUserExists] = useState<boolean>(false);
  const [cardTheme, setCardTheme] = useState<string>("darcula ");

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
          // }, 999);
        }, 0);
      }
    };

    fetchRepoData();
  }, [owner, repoName]);

  if (loading) return <p className="container pt-5">Loading...</p>;
  if (error) return <p className="container">{error}</p>;
  if (inputValue && !userExists)
    return (
      <p className="container pt-5">
        There is a typo in your search.
        <br />
        <br />
        GitInspect cannot find matching results for user{" "}
        <strong>{owner}</strong> & reposotory <strong>{repoName}</strong>
      </p>
    );
  if (!repoData) return null;

  const { repoInfo, ownerInfo } = repoData;

  return (
    <div className="container repo-eval">
      <div className="left-sidebar">
        {/* User profile */}
        <div className="user-profile">
          <img
            src={ownerInfo.avatar_url}
            className="owner-avatar"
            alt="Owner Avatar"
          />
          <div className="user-info">
            <p>{owner}</p>
            <p>Followers: {ownerInfo.followers}</p>
            <p>Following: {ownerInfo.following}</p>
            <p>Public Repositories: {ownerInfo.public_repos}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats mb-3">
          <img
            src={`https://github-readme-stats.vercel.app/api?username=${owner}&show_icons=true&theme=${cardTheme}`}
            alt="GitHub Stats"
          />
          <img
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${owner}&theme=${cardTheme}`}
            alt="Streak Stats"
          />
        </div>
      </div>

      {/* Repo info */}
      <div className="right-sidebar">
        <div className="d-flex flex-column">
          <div>
            <div className="user-title mb-3">
              <FaGithub size={35} style={{ marginRight: "15px" }} />
              <a href={`https://github.com/${owner}`}>{owner}</a>
              <p>/</p>
              <a href={`https://github.com/${owner}/${repoName}`}>{repoName}</a>
            </div>
          </div>
          <img
            className="repo-avatar"
            src={`https://github-readme-stats.vercel.app/api/pin/?username=${owner}&repo=${repoName}&theme=${cardTheme}`}
            alt="Repository"
          />
          {/* <FaStar color="yellow" /> */}
          <p>
            <FaStar color="yellow" /> {repoInfo.stargazers_count}
          </p>
          <p>Total Commits: {repoInfo.commits_count}</p>
          <p>Date Created: {repoInfo.created_at}</p>
          <p>Days Since Creation: {repoInfo.days_since_creation}</p>
          <p>Forks: {repoInfo.forks_count}</p>
          <p>Branches: {repoInfo.branches}</p>
          <p>Total Number of Files: {repoInfo.files_count}</p>
          <p>Languages Used: {repoInfo.languages_used.join(", ")}</p>
          <p>Releases: {repoInfo.releases_count}</p>
          <p>Workflows (Actions): {repoInfo.workflows_count}</p>
          <p>Issues: {repoInfo.issues_count}</p>
          <p>Pull Requests: {repoInfo.pulls_count}</p>
          <p>Total Number of Contributors: {repoInfo.contributors_count}</p>
          <p>Last Commit Date: {repoInfo.last_commit_date}</p>
          <p>
            Code Frequency: <a href={repoInfo.code_frequency_link}>View</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RepositoryEvaluation;
