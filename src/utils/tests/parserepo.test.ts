import { ParseRepo } from "../parserepo";

const TestCases = [
  {
    url: "https://github.com/owner/repo",
    expected: { owner: "owner", repoName: "repo" },
  },
  { url: "owner/repo", expected: { owner: "owner", repoName: "repo" } },
  { url: "google.com/owner/repo", expected: null },
  { url: "", expected: null },
  {
    url: "https://github.com/adimail/config-files.git",
    expected: { owner: "adimail", repoName: "config-files" },
  },
  {
    url: "https://github.com/adimail/config-files",
    expected: { owner: "adimail", repoName: "config-files" },
  },
  { url: "config-files.git", expected: null },
  {
    url: "https://github.com/adimail/torrent-client.git",
    expected: { owner: "adimail", repoName: "torrent-client" },
  },
  {
    url: "https://github.com/adimail/torrent-client",
    expected: { owner: "adimail", repoName: "torrent-client" },
  },
  { url: "torrent-client", expected: null },
];

// tests for ParseRepo function
describe("ParseRepo function", () => {
  TestCases.forEach(({ url, expected }) => {
    test(`Parsing URL ${url}`, () => {
      expect(ParseRepo(url)).toEqual(expected);
    });
  });
});
