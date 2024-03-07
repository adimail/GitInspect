import { MoveToTop } from "../../utils/gototop";
import SEO from "../helmet";

const HomeContent = () => {
  return (
    <>
      <SEO
        title="Git Inspect"
        description="Git Inspect is a web app for reviewing GitHub repo & user stats. It utilizes the GitHub API to provide insights into commit history & more."
        name="Git Inspect"
        type="Article"
      />

      <article className="container" style={{ marginTop: "30px" }}>
        <h2>How to evaluated a GitHub repository?</h2>
        <hr />
        <div className="container" style={{ padding: "1.5rem" }}>
          <p>
            GitHub doesn't show you many statistics related to a repository,
            aside from a repository's star count. When evaluating a repository
            on GitHub, I often find myself giving a lot of weight towards how
            many stars the repository has gained.
          </p>
          <p>
            Repository owners especially love it when they receive a lot of
            GitHub stars as it provides them with a sense of accomplishment.
            There are articles written on how developers can get more GitHub
            stars for their repositories, using tips such as writing an
            attractive README and even using paid advertising to get more eyes
            on the repo.
          </p>
          <p>
            The other day I stumbled upon a set of guidelines for recruiters
            that are trying to hire developer talent. One of the recommendations
            was to look for developers who have repositories on GitHub with 100+
            stars.
          </p>
          <p>
            Should we all be evaluating the quality of a GitHub repository based
            on its star count? Probably not, but it is an easy metric for people
            to look at. There are a ton of different factors that factor into a
            great GitHub project.
          </p>
          <p>
            The first thing I check when evaluating a Github project is the
            commit history. In my opinion, it gives me the best overall
            impression of the quality the code and the health of the whole
            project.
          </p>
          <ol>
            <li>
              What has been changed recently? Lots of features with no commits
              for bug fixes indicate a project early in its life. Are there lots
              of merge commits, but few "normal" commits? This could indicate
              the project is mature and feature-complete, and very stable. As
              long as there are recent commits, even if they are mostly
              community-contributed, means it is still actively maintained.
            </li>
            <li>
              When was the last commit made? And when was the last commit before
              that? I typically consider repos as no longer maintained if they
              haven't been updated in a more than a year, or if they have been
              updated less than once a month for over a year (not necessarily
              one commit per month, but infrequent "spurts" of activity with no
              consistency).
            </li>
          </ol>
          <p className="p-2">
            Sometimes people (students) copy code from other developers and put
            it on their github. Commit history is a good indicator of such
            practices very few commits and less activity clearly indicates code
            has been copied from other developer for sake of "resume building"
          </p>
          <hr />
          <h2>Don’t forget to read the code!</h2>
          <p>
            <mark style={{ backgroundColor: "lightblue" }}>
              There’s no better way to evaluate the quality of software than to
              inspect the actual software itself.
            </mark>{" "}
            With proprietary stuff this isn’t an option, but the beauty of open
            source is all the code is right there waiting for you to read it.
          </p>
          <p>
            People often skip this (paramount) step because reading code can be
            difficult and time consuming. Here are a few questions you can ask
            yourself about a project, to get you started:
          </p>
          <ul>
            <li>Does it have tests?</li>
            <li>Can I run the test suite and they all pass?</li>
            <li>Are the classes, functions, and variables named well?</li>
            <li>Is there a logical flow of execution?</li>
            <li>Would I design a solution similar to this?</li>
            <li>Are there code comments? If so, are they useful?</li>
          </ul>
        </div>
        <hr />
        <div className="container">
          <h2>Why GitInspect</h2>
          <p>
            Hiya stranger, I am <a href="https://adimail.github.io">Aditya</a>.
            I built GitInspect after interviving an candidate for a full stack
            position at a startup. While going through his resume, I noticed he
            had copied an entire project from another student adn added it on
            his github. Then I thought about a platform that will help evaluate
            github repositories based on the commit history of the repository.
          </p>
          <p>
            Best way to evaluate a github repository is from the commit history.
            You can use GitInspect to read commits of a repository, review the
            user profile using{" "}
            <a href="https://github.com/anuraghazra/github-readme-stats">
              github-readme-stats.
            </a>
          </p>
          <p>
            To use GitInspect, enter the project url in one of the following
            format
          </p>
          <ul>
            <li>https://github.com/Username/RepoName.git</li>
            <li>https://github.com/Username/RepoName</li>
            <li>Username/RepoName</li>
          </ul>
        </div>
        <MoveToTop />
      </article>
    </>
  );
};

const InvalidURL = () => {
  const invalidToken = new URLSearchParams(window.location.search).get(
    "invalidtoken"
  );

  return (
    <>
      <SEO
        title="Git Inspect - Invalid URL"
        description="Git Inspect is a web app for reviewing GitHub repo & user stats. It utilizes the GitHub API to provide insights into commit history & more."
        name="Git Inspect"
        type="Article"
      />
      <div className="container invalidurl pt-5">
        <div>
          <p>
            <mark>
              <i> {invalidToken ? decodeURIComponent(invalidToken) : ""}</i>
            </mark>{" "}
            is not a valid GitHub repository URL
          </p>
          <p>Please provide the URL in any one of the following formats:</p>
          <ul>
            <li>https://github.com/Username/RepoName.git</li>
            <li>https://github.com/Username/RepoName</li>
            <li>Username/RepoName</li>
          </ul>
        </div>
        <a href="/">
          <img
            loading="lazy"
            src="https://raw.githubusercontent.com/adimail/ReadRepo/main/public/dragon.png"
            alt="Dragon"
            className="image"
          />
        </a>
      </div>
    </>
  );
};

export { HomeContent, InvalidURL };
