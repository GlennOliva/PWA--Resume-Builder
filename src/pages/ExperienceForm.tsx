import React from "react";

interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  jobDescription: string;
}

interface ExperienceItemProps {
  exp: Experience;
  index: number;
  experienceData: Experience[];
  setExperienceData: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({
  exp,
  index,
  experienceData,
  setExperienceData,
}) => {
  const handleChange = (field: keyof Experience, value: string | boolean) => {
    const updatedData = [...experienceData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setExperienceData(updatedData);
  };

  return (
    <div className="border p-4 rounded space-y-2">
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Company Name"
        value={exp.company}
        onChange={(e) => handleChange("company", e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Job Position"
        value={exp.position}
        onChange={(e) => handleChange("position", e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="date"
        value={exp.startDate}
        onChange={(e) => handleChange("startDate", e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="date"
        value={exp.endDate}
        disabled={exp.currentlyWorking}
        onChange={(e) => handleChange("endDate", e.target.value)}
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={exp.currentlyWorking}
          onChange={(e) => handleChange("currentlyWorking", e.target.checked)}
        />
        <span>Currently Working</span>
      </label>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Job Description"
        value={exp.jobDescription}
        onChange={(e) => handleChange("jobDescription", e.target.value)}
      ></textarea>
    </div>
  );
};

interface ExperienceFormProps {
  activeTab: string;
  experienceData: Experience[];
  setExperienceData: React.Dispatch<React.SetStateAction<Experience[]>>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  activeTab,
  experienceData,
  setExperienceData,
}) => {
  return (
    <>
      {activeTab === "Experience" && (
        <div className="space-y-3">
          {experienceData.map((exp, index) => (
            <ExperienceItem
              key={index}
              index={index}
              exp={exp}
              experienceData={experienceData}
              setExperienceData={setExperienceData}
            />
          ))}

          {/* Add Experience Button */}
          <button
        className="px-5 py-2 border rounded bg-gray-200 hover:bg-gray-300 text-right align-right"
            onClick={() =>
              setExperienceData([
                ...experienceData,
                {
                  company: "",
                  position: "",
                  startDate: "",
                  endDate: "",
                  currentlyWorking: false,
                  jobDescription: "",
                },
              ])
            }
          >
            + Add Experience
          </button>
        </div>
      )}
    </>
  );
};

export default ExperienceForm;
