import axios from "axios";

export interface RepoInfo {
  name: string;
  owner: string;
  description: string;
  license: {
    name: string;
  };
  created_at: string;
  updated_at: string;
  days_since_creation: number;
  stargazers_count: number;
  forks_count: number;
  branches: number;
  commits_count: number;
  files_count: number;
  languages_used: string[];
  releases_count: number;
  workflows_count: number;
  issues_count: number;
  pulls_count: number;
  contributors_count: number;
  last_commit_date: string;
  code_frequency_link: string;
  commits_details: CommitDetails[];
  average_addition_per_commit: number;
  average_deletion_per_commit: number;
}

export interface OwnerInfo {
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface CommitDetails {
  sha: string;
  message: string;
  additions: number;
  deletions: number;
}

async function userRepoExists(
  owner: string,
  repo: string,
  token?: string
): Promise<boolean> {
  try {
    const headers: any = {};
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers }
    );
    return response.status === 200;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return false;
    } else {
      console.error(
        `Error checking repository existence for ${owner}/${repo}: ${error.message}`
      );
      throw error;
    }
  }
}

export async function GetInfo(
  owner: string,
  repo: string,
  token?: string
): Promise<{ ownerInfo: OwnerInfo; repoInfo: RepoInfo } | null> {
  if (await userRepoExists(owner, repo, token)) {
    const headers: any = {};
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const repoInfoUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const [
      repoData,
      branches,
      contributors,
      commits,
      files,
      languages,
      releases,
      workflows,
      issues,
      pulls,
      userInfo,
    ] = await Promise.all([
      axios.get(repoInfoUrl, { headers }),
      axios.get(`${repoInfoUrl}/branches`, { headers }),
      axios.get(`${repoInfoUrl}/contributors`, { headers }),
      axios.get(`${repoInfoUrl}/commits?per_page=100`, { headers }),
      axios.get(`${repoInfoUrl}/contents`, { headers }),
      axios.get(`${repoInfoUrl}/languages`, { headers }),
      axios.get(`${repoInfoUrl}/releases`, { headers }),
      axios.get(`${repoInfoUrl}/actions/workflows`, { headers }),
      axios.get(`${repoInfoUrl}/issues`, { headers }),
      axios.get(`${repoInfoUrl}/pulls`, { headers }),
      axios.get(`https://api.github.com/users/${owner}`, { headers }),
    ]);

    const repoInfoData = repoData.data as RepoInfo;
    const ownerInfoData = userInfo.data as OwnerInfo;

    const created_at = new Date(repoInfoData.created_at);
    const last_commit_date = new Date(repoInfoData.updated_at);

    const commitDetailsPromises = (commits.data as any[]).map(
      async (commit: any) => {
        const commitUrl = commit.url;
        const commitResponse = await axios.get(commitUrl, { headers });
        const commitData = commitResponse.data;
        const additions = commitData.stats.additions;
        const deletions = commitData.stats.deletions;
        return {
          sha: commitData.sha,
          message: commitData.commit.message,
          additions,
          deletions,
        } as CommitDetails;
      }
    );

    const commitDetails = await Promise.all(commitDetailsPromises);

    let totalAdditions = 0;
    let totalDeletions = 0;

    commitDetails.forEach((commit) => {
      totalAdditions += commit.additions;
      totalDeletions += commit.deletions;
    });

    const numberOfCommits = commitDetails.length;

    const averageAdditionPerCommit =
      numberOfCommits > 0
        ? (totalAdditions / numberOfCommits).toFixed(2)
        : "0.00";
    const averageDeletionPerCommit =
      numberOfCommits > 0
        ? (totalDeletions / numberOfCommits).toFixed(2)
        : "0.00";

    const averageAdditionPerCommitNum = parseFloat(averageAdditionPerCommit);
    const averageDeletionPerCommitNum = parseFloat(averageDeletionPerCommit);

    const repoInfo: RepoInfo = {
      ...repoInfoData,
      owner,
      branches: branches.data.length,
      contributors_count: contributors.data.length,
      commits_count: commits.data.length,
      files_count: files.data.length,
      languages_used: Object.keys(languages.data),
      releases_count: releases.data.length,
      workflows_count: workflows.data.total_count,
      issues_count: issues.data.length,
      pulls_count: pulls.data.length,
      days_since_creation: Math.floor(
        (new Date().getTime() - created_at.getTime()) / (1000 * 3600 * 24)
      ),
      last_commit_date: last_commit_date.toISOString().split("T")[0],
      code_frequency_link: `https://github.com/${owner}/${repo}/graphs/code-frequency`,
      commits_details: commitDetails,
      average_addition_per_commit: averageAdditionPerCommitNum,
      average_deletion_per_commit: averageDeletionPerCommitNum,
    };

    const ownerInfo: OwnerInfo = {
      avatar_url: ownerInfoData.avatar_url,
      public_repos: ownerInfoData.public_repos,
      followers: ownerInfoData.followers,
      following: ownerInfoData.following,
    };

    return { ownerInfo, repoInfo };
  } else {
    return null;
  }
}
