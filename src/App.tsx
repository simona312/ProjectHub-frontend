import {Routes, Route} from "react-router-dom";
import ProjectsPage from "./pages/ProjectPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectsPage/>}/>
    </Routes>
  );
}



