import React from "react";

interface Education {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyStudy: boolean;
}

interface EducationItemProps {
  edu: Education;
  index: number;
  educationData: Education[];
  setEducationData: React.Dispatch<React.SetStateAction<Education[]>>;
}

const EducationItem: React.FC<EducationItemProps> = ({
  edu,
  index,
  educationData,
  setEducationData,
}) => {
  const handleChange = (field: keyof Education, value: string | boolean) => {
    const updatedData = [...educationData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setEducationData(updatedData);
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="School / University"
        value={edu.school}
        onChange={(e) => handleChange("school", e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Degree"
        value={edu.degree}
        onChange={(e) => handleChange("degree", e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        <input
          className="w-full  p-2 border rounded"
          type="date"
          value={edu.startDate}
          onChange={(e) => handleChange("startDate", e.target.value)}
        />
        <input
          className="w-full  p-2 border rounded"
          type="date"
          value={edu.endDate}
          disabled={edu.currentlyStudy}
          onChange={(e) => handleChange("endDate", e.target.value)}
        />
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={edu.currentlyStudy}
          onChange={(e) => handleChange("currentlyStudy", e.target.checked)}
        />
        <span>Currently Studying</span>
      </label>
    </div>
  );
};

interface EducationFormProps {
  activeTab: string;
  educationData: Education[];
  setEducationData: React.Dispatch<React.SetStateAction<Education[]>>;
}

const EducationForm: React.FC<EducationFormProps> = ({
  activeTab,
  educationData,
  setEducationData,
}) => {
  return (
    <>
      {activeTab === "Education" && (
        <div className="space-y-4">
          {educationData.map((edu, index) => (
            <EducationItem
              key={index}
              index={index}
              edu={edu}
              educationData={educationData}
              setEducationData={setEducationData}
            />
          ))}

          {/* Add Education Button */}
          <button
            className="w-full sm:w-auto px-5 py-2 border rounded hover:bg-gray-300 transition"
            onClick={() =>
              setEducationData([
                ...educationData,
                {
                  school: "",
                  degree: "",
                  fieldOfStudy: "",
                  startDate: "",
                  endDate: "",
                  currentlyStudy: false,
                },
              ])
            }
          >
            + Add Education
          </button>
        </div>
      )}
    </>
  );
};

export default EducationForm;
