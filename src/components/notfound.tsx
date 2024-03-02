function NotFound() {
  return (
    <div className="page">
      <img
        src="https://raw.githubusercontent.com/adimail/ReadRepo/main/public/dragon.png"
        alt="Dragon"
      />{" "}
      <h1>Oops! The page you are looking for does not exist</h1>
      <p>
        Go back to the home page from <a href="/">here</a>
      </p>
    </div>
  );
}

export default NotFound;
