import { Suspense } from "react";
import { FaGithub } from "react-icons/fa";
import { RepoInfo, OwnerInfo, CommitDetails } from "../utils/readrepo";

interface CommitHistoryProps {
  repoInfo: {
    commits_details: CommitDetails[];
  };
}

interface UserProps {
  owner: string | undefined;
  ownerInfo: OwnerInfo;
  cardTheme: string | undefined;
}

interface RepoProps {
  repoName: string | undefined;
  owner: string | undefined;
  cardTheme: string | undefined;
  repoInfo: RepoInfo;
}

interface SummaryProps {
  owner: string | undefined;
  cardTheme: string | undefined;
  repoName: string | undefined;
  repoInfo: RepoInfo;
  ownerInfo: OwnerInfo;
}

const CommitHistory: React.FC<CommitHistoryProps> = ({ repoInfo }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Commit Name</th>
            <th>Additions</th>
            <th>Deletions</th>
          </tr>
        </thead>
        <tbody>
          {repoInfo.commits_details &&
            repoInfo.commits_details.map((commit, index) => (
              <tr key={index}>
                <td>{commit.message}</td>
                <td>{commit.additions}</td>
                <td>{commit.deletions}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const User: React.FC<UserProps> = ({ owner, ownerInfo, cardTheme }) => {
  return (
    <div className="user-summary">
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage
            src={ownerInfo.avatar_url}
            className="owner-avatar avtar-big"
            alt="Owner Avatar"
          />
        </Suspense>
        <div className="user-info">
          <p>{owner}</p>
          <p>Followers: {ownerInfo.followers}</p>
          <p>Following: {ownerInfo.following}</p>
          <p>Public Repositories: {ownerInfo.public_repos}</p>
          <p>Joined Github: {ownerInfo.joined_at}</p>
        </div>
      </div>

      <div className="stats mb-3">
        <LazyImage
          src={`https://github-readme-stats.vercel.app/api?username=${owner}&show_icons=true&theme=${cardTheme}`}
          alt="GitHub Stats"
        />
        <LazyImage
          src={`https://github-readme-streak-stats.herokuapp.com/?user=${owner}&theme=${cardTheme}`}
          alt="Streak Stats"
        />
        <LazyImage
          src={`https://github-readme-stats.vercel.app/api/top-langs?username=${owner}&layout=compact&hide=jupyter%20notebook&theme=${cardTheme}`}
          alt="GitHub Stats"
        />
      </div>
    </div>
  );
};

const Repo: React.FC<RepoProps> = ({
  repoName,
  owner,
  cardTheme,
  repoInfo,
}) => {
  return (
    <div>
      <div className="user-title mb-3">
        <FaGithub size={35} style={{ marginRight: "15px" }} />
        <a href={`https://github.com/${owner}`}>{owner}</a>
        <p>/</p>
        <a href={`https://github.com/${owner}/${repoName}`}>{repoName}</a>
      </div>
      <hr />
      <div className="repo-info">
        <div>
          <LazyImage
            className="repo-avatar"
            src={`https://github-readme-stats.vercel.app/api/pin/?username=${owner}&repo=${repoName}&theme=${cardTheme}`}
            alt="Repository"
          />
          <p style={{ textAlign: "center" }}>Repository Summary</p>
          <div className="summary-table">
            <table>
              <tbody>
                <tr>
                  <td>stars</td>
                  <td>{repoInfo.stargazers_count}</td>
                </tr>
                <tr>
                  <td>Total Commits</td>
                  <td>{repoInfo.commits_count}</td>
                </tr>
                <tr>
                  <td>forks</td>
                  <td>{repoInfo.forks_count}</td>
                </tr>
                <tr>
                  <td>branches</td>
                  <td>{repoInfo.branches}</td>
                </tr>
                <tr>
                  <td>Date Created</td>
                  <td>
                    {new Date(repoInfo.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Created {repoInfo.days_since_creation} days ago</p>
        </div>
        <div>
          <p>Total Commits: {repoInfo.commits_count}</p>
          <p>Last Commit Date: {repoInfo.last_commit_date}</p>
          <p>
            🟢 Average addition per commit:{" "}
            {repoInfo.average_addition_per_commit} lines
          </p>
          <p>
            🔴 Average deletion per commit:{" "}
            {repoInfo.average_deletion_per_commit} lines
          </p>
          <hr />
          <p>Languages Used:</p>
          <ul>
            {repoInfo.languages_used.map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <hr />
          <p>Forks: {repoInfo.forks_count}</p>
          <p>Branches: {repoInfo.branches}</p>
          <p>Releases: {repoInfo.releases_count}</p>
          <p>
            Workflows/github Actions:{" "}
            {repoInfo.workflows_count > 1 ? "Avaliable" : "Not Avaliable"}
          </p>
          <p>Issues: {repoInfo.issues_count}</p>
          <p>Pull Requests: {repoInfo.pulls_count}</p>
          <p>Total Number of Contributors: {repoInfo.contributors_count}</p>
          <p>
            <a href={repoInfo.code_frequency_link}>View</a> Code Frequency graph
            on GitHub
          </p>
        </div>
      </div>
    </div>
  );
};

const Summary: React.FC<SummaryProps> = ({
  owner,
  cardTheme,
  repoName,
  repoInfo,
  ownerInfo,
}) => {
  return (
    <div className="repo-eval">
      <div className="left-sidebar">
        <div>
          <div className="user-profile">
            <Suspense fallback={<div>Loading...</div>}>
              <LazyImage
                src={ownerInfo.avatar_url}
                className="owner-avatar"
                alt="Owner Avatar"
              />
            </Suspense>
            <div className="user-info">
              <p>{owner}</p>
              <p>Followers: {ownerInfo.followers}</p>
              <p>Following: {ownerInfo.following}</p>
              <p>Public Repositories: {ownerInfo.public_repos}</p>
            </div>
          </div>

          <div className="stats mb-3">
            <Suspense fallback={<div>Loading...</div>}>
              <LazyImage
                src={`https://github-readme-stats.vercel.app/api?username=${owner}&show_icons=true&theme=${cardTheme}`}
                alt="GitHub Stats"
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyImage
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${owner}&theme=${cardTheme}`}
                alt="Streak Stats"
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyImage
                src={`https://github-readme-stats.vercel.app/api/top-langs?username=${owner}&layout=compact&hide=jupyter%20notebook&theme=${cardTheme}`}
                alt="GitHub Stats"
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Repo info */}
      <div className="right-sidebar">
        <div className="d-flex flex-column">
          <div className="repo-info-summary">
            <div className="d-flex flex-column">
              <div>
                <div className="user-title mb-3">
                  <FaGithub size={35} style={{ marginRight: "15px" }} />
                  <a href={`https://github.com/${owner}`}>{owner}</a>
                  <p>/</p>
                  <a href={`https://github.com/${owner}/${repoName}`}>
                    {repoName}
                  </a>
                </div>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                <img
                  className="repo-avatar"
                  src={`https://github-readme-stats.vercel.app/api/pin/?username=${owner}&repo=${repoName}&theme=${cardTheme}`}
                  alt="Repository"
                />
              </Suspense>
              <hr />
              <div>
                <p>Repository Summary:</p>
                <ul>
                  <li>stars: {repoInfo.stargazers_count}</li>
                  <li>Total Commits: {repoInfo.commits_count}</li>
                  <li>forks: {repoInfo.forks_count}</li>
                  <li>branches {repoInfo.branches}</li>
                  <li>
                    Date Created:{" "}
                    {new Date(repoInfo.created_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </li>
                  <li>Days Since Creation: {repoInfo.days_since_creation}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LazyImage: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  className,
  ...props
}) => {
  return <img className={className} {...props} />;
};

export { User, Summary, Repo, CommitHistory };
