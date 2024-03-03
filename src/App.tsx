import { Route, Routes } from "react-router-dom";
import Algorithm from "./components/algorithm/algorithm";
import NotFound from "./components/notfound";
import InputField from "./components/inputfield/inputfield";
import { HomeContent, InvalidURL } from "./components/home/home";
import RepositoryEvaluation from "./components/RepositoryEvaluation";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <InputField />
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/:owner/:repoName" element={<RepositoryEvaluation />} />
        <Route path="/algorithm" element={<Algorithm />} />
        <Route path="/not-found" element={<InvalidURL />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
