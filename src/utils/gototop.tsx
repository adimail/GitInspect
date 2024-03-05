import { GoDesktopDownload } from "react-icons/go";

export const MoveToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToTop}
      style={{ textAlign: "center", marginTop: "20px" }}
    >
      <GoDesktopDownload />
      <span>Go to top</span>
    </div>
  );
};
