import { useState } from "react";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import Sidebar from "./components/Sidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined, //undefined means there is no existing project
    projectsList: [],
  });

  const handleStartNewProject = () => {
    setProjectsState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: null, // null means we are starting a new project
      };
    });
  };

  const handleCancelNewProject = () => {
    setProjectsState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: undefined, // undefined means no project is selected to be displayed
      };
    });
  };

  const handleSelectProject = (projectId) => {
    setProjectsState((prevProjectState) => {
      return {
        ...prevProjectState,
        selectedProjectId: projectId, // Displays the selected project
      };
    });
  };

  const handleProjectData = (projectData) => {
    setProjectsState((prevProjectState) => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      };
      return {
        ...prevProjectState,
        selectedProjectId: undefined, // undefined means no project is selected to be displayed
        projectsList: [...prevProjectState.projectsList, newProject],
      };
    });
  };

  const handleDeleteSelectedProject = () => {
    setProjectsState((prevProjectState) => {
      const updatedProjectList = prevProjectState.projectsList.filter(
        (project) => project.id !== prevProjectState.selectedProjectId,
      );

      return {
        ...prevProjectState,
        selectedProjectId: undefined, // undefined means no project is selected to be displayed
        projectsList: updatedProjectList,
      };
    });
  };

  const selectedProject = projectsState.projectsList.find(
    (project) => project.id === projectsState.selectedProjectId,
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteSelectedProject}
    />
  );

  // Main screen content
  if (projectsState.selectedProjectId === null) {
    // Show add project form if the user wants to add project
    content = (
      <NewProject onAdd={handleProjectData} onCancel={handleCancelNewProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    // Show no project selected screen by default when no project id is chosen
    content = <NoProjectSelected onStartNewProject={handleStartNewProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <Sidebar
        onStartNewProject={handleStartNewProject}
        projects={projectsState.projectsList}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
