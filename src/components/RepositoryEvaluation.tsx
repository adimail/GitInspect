import { useState, useEffect } from "react";
import { GitHubAPIKey } from "../secrets";
import { getRepoInfo, RepoInfo } from "../utils/readrepo";
import { useRepoContext } from "../context/repocontext";

const RepositoryEvaluation = () => {
  const { owner, repoName } = useRepoContext();
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);

  useEffect(() => {
    const fetchRepoInfo = async () => {
      const token = GitHubAPIKey;
      const info = await getRepoInfo(owner, repoName, token);
      if (info) {
        setRepoInfo(info);
      }
    };

    fetchRepoInfo();
  }, [owner, repoName]);

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      {typeof repoInfo === "string" ? (
        <p>{repoInfo}</p>
      ) : repoInfo ? (
        <>
          <p>
            Owner Avatar:{" "}
            <img src={repoInfo.owner_avatar_url} alt="Owner Avatar" />
          </p>
          <p>Repository Name: {repoInfo.name}</p>
          <p>Owner: {repoInfo.owner}</p>
          <p>Description: {repoInfo.description}</p>
          <p>License: {repoInfo.license.name || "N/A"}</p>
          <p>Date Created: {repoInfo.created_at}</p>
          <p>Days Since Creation: {repoInfo.days_since_creation}</p>
          <p>Stars: {repoInfo.stargazers_count}</p>
          <p>Forks: {repoInfo.forks_count}</p>
          <p>Branches: {repoInfo.branches}</p>
          <p>Number of Commits: {repoInfo.commits_count}</p>
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
          <p>Owner Repos Count: {repoInfo.owner_repos_count}</p>
          <p>Owner Followers Count: {repoInfo.owner_followers_count}</p>
          <p>Owner Following Count: {repoInfo.owner_following_count}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RepositoryEvaluation;
