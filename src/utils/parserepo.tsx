interface RepoInfo {
  owner: string;
  repoName: string;
}

function IsValidURL(repoUrl: string): boolean {
  repoUrl = repoUrl.replace(/\.git$/, "");

  const parts: string[] = repoUrl.split("/");
  if (
    (parts.length === 5 || parts.length === 4) &&
    parts[0] === "https:" &&
    parts[1] === "" &&
    parts[2] === "github.com"
  ) {
    return true;
  } else if (parts.length === 2) {
    return true;
  } else {
    return false;
  }
}

function ParseRepo(repoUrl: string): RepoInfo | null {
  let owner: string, repoName: string;

  // Remove .git extension if present
  repoUrl = repoUrl.replace(/\.git$/, "");

  // Extract owner and repository name
  const parts: string[] = repoUrl.split("/");
  if (
    (parts.length === 5 || parts.length === 4) &&
    parts[0] === "https:" &&
    parts[1] === "" &&
    parts[2] === "github.com"
  ) {
    owner = parts[3];
    repoName = parts[4];
  } else if (parts.length === 2) {
    [owner, repoName] = parts;
  } else {
    return null;
  }

  if (owner === "" || repoName === "") {
    return null;
  }

  return { owner, repoName };
}

export { ParseRepo, IsValidURL };
