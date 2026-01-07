import {Routes, Route} from "react-router-dom";
import ProjectsPage from "./pages/ProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectsPage/>}/>
      <Route path="/projects/:id" element={<ProjectDetailsPage />} />
    </Routes>
  );
}



