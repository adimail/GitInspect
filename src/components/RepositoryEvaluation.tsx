import { useState, useEffect } from "react";
import { GitHubAPIKey } from "../secrets";
import { GetInfo, RepoInfo, OwnerInfo } from "../utils/readrepo";
import { useRepoContext } from "../context/repocontext";

const RepositoryEvaluation = () => {
  const { owner, repoName } = useRepoContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [repoData, setRepoData] = useState<{
    repoInfo: RepoInfo;
    ownerInfo: OwnerInfo;
  } | null>(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      if (!owner || !repoName) return;

      setLoading(true);
      setError("");

      try {
        const token = GitHubAPIKey;
        const data = await GetInfo(owner, repoName, token);
        setRepoData(data);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoData();
  }, [owner, repoName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!repoData) return null; // Or whatever fallback you prefer

  const { repoInfo, ownerInfo } = repoData;

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <p>
        Owner Avatar: <img src={ownerInfo.avatar_url} alt="Owner Avatar" />
      </p>
      <p>Repository Name: {repoInfo.name}</p>
      <p>Owner: {repoInfo.owner}</p>
      <p>Description: {repoInfo.description}</p>
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
      <p>Owner Repos Count: {ownerInfo.public_repos}</p>
      <p>Owner Followers Count: {ownerInfo.followers}</p>
      <p>Owner Following Count: {ownerInfo.following}</p>
    </div>
  );
};

export default RepositoryEvaluation;
