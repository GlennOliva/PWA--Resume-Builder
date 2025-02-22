import React, { useState } from "react";
import Right_Resumepanel from "./Right_Resumepanel";
import Footer from "./Footer";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import PersonalForm from "./PersonalForm";
import ProjectForm from "./ProjectForm";
import SkillsForm from "./SkillsForm";
import CertificateForm from "./CertificateForm";

interface FormData {
  fullName: string;
  email: string;
  contact: string;
  address: string;
  summary: string;
}

interface ProjectData {
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  currentlyProject: boolean;
}

interface ExperienceData {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  jobDescription: string;
}

interface EducationData {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyStudy: boolean;
}

interface SkillData {
  skillName: string;
}

interface CertificateData {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  doesNotExpire: boolean;
}

const Personalinfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Personal Info");
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    contact: "",
    address: "",
    summary: "",
  });

  const [experienceData, setExperienceData] = useState<ExperienceData[]>([]);
  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [projectData, setProjectData] = useState<ProjectData[]>([]);
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [certificateData, setCertificateData] = useState<CertificateData[]>([]);

  const tabs: string[] = [
    "Personal Info",
    "Experience",
    "Education",
    "Projects",
    "Skills",
    "Certifications",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200 p-3 sm:p-5">
      <h1 className="text-lg sm:text-xl font-bold mb-5 text-center">RESUME BUILDER</h1>

      {/* Resume Builder Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white shadow-lg p-4 sm:p-5 rounded-lg">
        {/* Left Panel - Form */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0  p-3 sm:p-5">
          <div className="flex overflow-x-auto space-x-2 border-b pb-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 text-sm whitespace-nowrap ${
                  activeTab === tab ? "border-b-2 border-black font-semibold" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Conditional Forms */}
          {activeTab === "Personal Info" && <PersonalForm formData={formData} handleChange={handleChange} />}
          {activeTab === "Experience" && (
            <ExperienceForm activeTab={activeTab} experienceData={experienceData} setExperienceData={setExperienceData} />
          )}
          {activeTab === "Education" && (
            <EducationForm activeTab={activeTab} educationData={educationData} setEducationData={setEducationData} />
          )}
          {activeTab === "Projects" && (
            <ProjectForm activeTab={activeTab} projectData={projectData} setProjectData={setProjectData} />
          )}
          {activeTab === "Skills" && (
            <SkillsForm activeTab={activeTab} skillsData={skillsData} setSkillsData={setSkillsData} />
          )}
          {activeTab === "Certifications" && (
            <CertificateForm activeTab={activeTab} certificateData={certificateData} setCertificateData={setCertificateData} />
          )}
        </div>

        {/* Right Panel with Dynamic Preview */}
 
          <Right_Resumepanel
            formData={formData}
            experienceData={experienceData}
            educationData={educationData}
            projectData={projectData}
            skillsData={skillsData}
            certificatesData={certificateData}
          />
  
      </div>

      <Footer />
    </div>
  );
};

export default Personalinfo;
