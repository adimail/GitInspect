import SEO from "./helmet";

function NotFound() {
  return (
    <>
      <SEO
        title="Git Inspect - 404"
        description="Git Inspect is a web app for reviewing GitHub repo & user stats. It utilizes the GitHub API to provide insights into commit history & more."
        name="Git Inspect"
        type="Article"
      />
      <div className="page404">
        <a href="/">
          <img
            loading="lazy"
            src="https://raw.githubusercontent.com/adimail/ReadRepo/main/public/dragon.png"
            alt="Dragon"
            className="image"
          />
        </a>
        <div className="content">
          <h3>The page you are looking for does not exist</h3>
          <p>Click on the dinasour to go back to home page</p>
        </div>
      </div>
    </>
  );
}

export default NotFound;
