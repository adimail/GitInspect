function NotFound() {
  return (
    <div className="page404">
      <a href="/">
        <img
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
  );
}

export default NotFound;
