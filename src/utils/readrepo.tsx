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
}

export interface OwnerInfo {
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export async function GetInfo(
  owner: string,
  repo: string,
  token?: string
): Promise<{ ownerInfo: OwnerInfo; repoInfo: RepoInfo } | null> {
  try {
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
      axios.get(`${repoInfoUrl}/commits`, { headers }),
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
    };

    const ownerInfo: OwnerInfo = {
      avatar_url: ownerInfoData.avatar_url,
      public_repos: ownerInfoData.public_repos,
      followers: ownerInfoData.followers,
      following: ownerInfoData.following,
    };

    return { ownerInfo, repoInfo };
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log(`User ${owner} or repository ${repo} not found.`);
      return null;
    } else {
      console.log(`Error fetching data for ${owner}/${repo}: ${error.message}`);
      return null;
    }
  }
}
