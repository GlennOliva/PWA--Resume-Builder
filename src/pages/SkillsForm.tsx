import React from "react";

interface Skill {
  skillName: string;
}

interface SkillItemProps {
  skill: Skill;
  index: number;
  skillsData: Skill[];
  setSkillsData: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const SkillItem: React.FC<SkillItemProps> = ({
  skill,
  index,
  skillsData,
  setSkillsData,
}) => {
  const handleChange = (value: string) => {
    const updatedData = [...skillsData];
    updatedData[index] = { ...updatedData[index], skillName: value };
    setSkillsData(updatedData);
  };

  return (
    <div className="border p-4 rounded space-y-2">
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Skill Name"
        value={skill.skillName}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

interface SkillsFormProps {
  activeTab: string;
  skillsData: Skill[];
  setSkillsData: React.Dispatch<React.SetStateAction<Skill[]>>;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  activeTab,
  skillsData,
  setSkillsData,
}) => {
  return (
    <>
      {activeTab === "Skills" && (
        <div className="space-y-3">
          {skillsData.map((skill, index) => (
            <SkillItem
              key={index}
              index={index}
              skill={skill}
              skillsData={skillsData}
              setSkillsData={setSkillsData}
            />
          ))}

          {/* Add Skill Button */}
          <button
            className="px-5 py-2 border rounded bg-gray-200 hover:bg-gray-300"
            onClick={() =>
              setSkillsData([
                ...skillsData,
                { skillName: "" },
              ])
            }
          >
            + Add Skill
          </button>
        </div>
      )}
    </>
  );
};

export default SkillsForm;
