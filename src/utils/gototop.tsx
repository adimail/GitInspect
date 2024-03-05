import { GoDesktopDownload } from "react-icons/go";

export const MoveToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div onClick={scrollToTop} className="gototop">
      <GoDesktopDownload size={20} />
      <span>Go to top</span>
    </div>
  );
};
