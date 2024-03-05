import { IsValidURL } from "../parserepo";

const TestCases = [
  { url: "https://github.com/owner/repo", expected: true },
  { url: "https://github.com/owner/repo.git", expected: true },
  { url: "owner/repo", expected: true },
  { url: "https://example.com/owner/repo", expected: false },
  { url: "example.com/owner/repo", expected: false },
  { url: "https://owner/repo", expected: false },
];

describe("IsValidURL function", () => {
  TestCases.forEach(({ url, expected }) => {
    test(`URL ${url} validity check`, () => {
      expect(IsValidURL(url)).toBe(expected);
    });
  });
});
