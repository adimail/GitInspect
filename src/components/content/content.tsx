import { useRepoContext } from "../../context/repocontext";
import RepositoryEvaluation from "../RepositoryEvaluation";

const DefaultContent = () => {
  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <h1>This is default content</h1>
    </div>
  );
};

const Content = () => {
  const { inputValue, owner, repoName } = useRepoContext();

  if (owner && repoName) {
    return <RepositoryEvaluation />;
  } else {
    return <DefaultContent />;
  }
};

export default Content;
