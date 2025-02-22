import React from "react";

interface Project {
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  currentlyProject: boolean;
}

interface ProjectItemProps {
  pro: Project;
  index: number;
  projectData: Project[];
  setProjectData: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  pro,
  index,
  projectData,
  setProjectData,
}) => {
  const handleChange = (field: keyof Project, value: string | boolean) => {
    const updatedData = [...projectData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setProjectData(updatedData);
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Project Name"
        value={pro.projectName}
        onChange={(e) => handleChange("projectName", e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Project Description"
        value={pro.projectDescription}
        onChange={(e) => handleChange("projectDescription", e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        <input
          className="w-full  p-2 border rounded"
          type="date"
          value={pro.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={pro.endDate}
          disabled={pro.currentlyProject}
          onChange={(e) => handleChange("endDate", e.target.value)}
        />
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={pro.currentlyProject}
          onChange={(e) => handleChange("currentlyProject", e.target.checked)}
        />
        <span>Currently Working</span>
      </label>
    </div>
  );
};

interface ProjectFormProps {
  activeTab: string;
  projectData: Project[];
  setProjectData: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  activeTab,
  projectData,
  setProjectData,
}) => {
  return (
    <>
      {activeTab === "Projects" && (
        <div className="space-y-4">
          {projectData.map((pro, index) => (
            <ProjectItem
              key={index}
              index={index}
              pro={pro}
              projectData={projectData}
              setProjectData={setProjectData}
            />
          ))}

          {/* Add Project Button */}
          <button
            className="w-full sm:w-auto px-5 py-2 border rounded hover:bg-gray-300 transition"
            onClick={() =>
              setProjectData([
                ...projectData,
                {
                  projectName: "",
                  projectDescription: "",
                  startDate: "",
                  endDate: "",
                  currentlyProject: false,
                },
              ])
            }
          >
            + Add Project
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectForm;
