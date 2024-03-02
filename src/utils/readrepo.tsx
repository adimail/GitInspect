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
  owner_avatar_url: string;
  owner_repos_count: number;
  owner_followers_count: number;
  owner_following_count: number;
}

export async function getRepoInfo(
  owner: string,
  repo: string,
  token?: string
): Promise<RepoInfo | string> {
  try {
    const headers: any = {};
    if (token) {
      headers["Authorization"] = `token ${token}`;
    }

    const repoInfoUrl = `https://api.github.com/repos/${owner}/${repo}`;
    const [
      repoInfo,
      branches,
      contributors,
      commits,
      files,
      languages,
      releases,
      workflows,
      issues,
      pulls,
      ownerInfo,
    ] = await Promise.all([
      axios.get(repoInfoUrl, { headers }),
      axios.get(`${repoInfoUrl}/branches`, { headers }),
      axios.get(`${repoInfoUrl}/contributors`, { headers }),
      axios.get(`${repoInfoUrl}/commits`, { headers }),
      axios.get(`${repoInfoUrl}/contents`, { headers }),
      axios.get(`${repoInfoUrl}/languages`, { headers }),
      axios.get(`${repoInfoUrl}/releases`, { headers }),
      axios.get(`${repoInfoUrl}/actions/workflows`, { headers }),
      axios.get(`${repoInfoUrl}/issues`, { headers }),
      axios.get(`${repoInfoUrl}/pulls`, { headers }),
      axios.get(`https://api.github.com/users/${owner}`, { headers }),
    ]);

    const repoInfoData = repoInfo.data as RepoInfo;
    const ownerInfoData = ownerInfo.data;

    const created_at = new Date(repoInfoData.created_at);
    const last_commit_date = new Date(repoInfoData.updated_at);

    return {
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
      owner_avatar_url: ownerInfoData.avatar_url,
      owner_repos_count: ownerInfoData.public_repos,
      owner_followers_count: ownerInfoData.followers,
      owner_following_count: ownerInfoData.following,
    };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return `User ${owner} or repository ${repo} not found.`;
    } else {
      return `Error fetching data for ${owner}/${repo}: ${error.message}`;
    }
  }
}
