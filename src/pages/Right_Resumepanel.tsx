import React, { useRef } from "react";
import jsPDF from "jspdf";

interface FormData {
  fullName: string;
  email: string;
  contact: string;
  address: string;
  summary: string;
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
  startDate: string;
  endDate: string;
  currentlyStudy: boolean;
}

interface ProjectData {
  projectName: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  currentlyProject: boolean;
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

interface RightResumePanelProps {
  formData: FormData;
  experienceData: ExperienceData[];
  educationData: EducationData[];
  projectData: ProjectData[];
  skillsData: SkillData[];
  certificatesData: CertificateData[];
}

const RightResumePanel: React.FC<RightResumePanelProps> = ({
  formData,
  experienceData,
  educationData,
  projectData,
  skillsData,
  certificatesData,
}) => {
  const resumeRef = useRef(null);

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
  
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const pageCenter = doc.internal.pageSize.getWidth() / 2;
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = margin;
  
    // Function to check if a new page is needed
    const checkPageBreak = (height = 10) => {
      if (y + height > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
    };
  
    // Full Name (Centered)
    doc.setFontSize(22);
    doc.text(formData.fullName || "FULL NAME", pageCenter, y, { align: "center" });
    y += 12;
  
    // Contact Info (Centered)
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${formData.email || "EMAIL"} | ${formData.contact || "CONTACT #"} | ${formData.address || "LOCATION"}`,
      pageCenter,
      y,
      { align: "center" }
    );
    y += 15;
  
    // Summary (Centered)
    if (formData.summary) {
      checkPageBreak(15);
      doc.setFontSize(12);
      doc.setFont("helvetica", "italic");
      const summaryText = doc.splitTextToSize(formData.summary, pageWidth);
      summaryText.forEach((line: string | string[]) => {
        doc.text(line, pageCenter, y, { align: "center" });
        y += 5;
      });
      y += 10;
    }
  
    // Function to add section titles (Left-aligned)
    const addSectionTitle = (title: string | string[]) => {
      checkPageBreak(15);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin, y);
      y += 5;
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth + margin, y);
      y += 7;
    };
  
    // EXPERIENCE SECTION
    if (experienceData.length > 0) {
      addSectionTitle("PROFESSIONAL EXPERIENCE");
  
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
  
      experienceData.forEach((exp) => {
        checkPageBreak(20);
        doc.setFont("helvetica", "bold");
        doc.text(`${exp.company} - ${exp.position}`, margin, y);
        y += 5;
  
        doc.setFont("helvetica", "normal");
        doc.text(`${exp.startDate} - ${exp.currentlyWorking ? "Present" : exp.endDate}`, margin, y);
        y += 5;
  
        // Justify Job Description
        const jobDescriptionText = doc.splitTextToSize(exp.jobDescription, pageWidth);
        jobDescriptionText.forEach((line: string | string[]) => {
          checkPageBreak(5);
          doc.text(line, margin, y);
          y += 5;
        });
  
        y += 8;
      });
    }
  
    // EDUCATION SECTION
    if (educationData.length > 0) {
      addSectionTitle("EDUCATION");
  
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
  
      educationData.forEach((edu) => {
        checkPageBreak(20);
        doc.setFont("helvetica", "bold");
        doc.text(`${edu.school} - ${edu.degree}`, margin, y);
        y += 5;
  
        doc.setFont("helvetica", "normal");
        doc.text(`${edu.startDate} - ${edu.currentlyStudy ? "Present" : edu.endDate}`, margin, y);
        y += 8;
      });
    }
  
    // PROJECTS SECTION
    if (projectData.length > 0) {
      addSectionTitle("PROJECTS");
  
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
  
      projectData.forEach((proj) => {
        checkPageBreak(20);
        doc.setFont("helvetica", "bold");
        doc.text(proj.projectName, margin, y);
        y += 5;
  
        doc.setFont("helvetica", "normal");
        doc.text(`${proj.startDate} - ${proj.currentlyProject ? "Present" : proj.endDate}`, margin, y);
        y += 5;
  
        // Justify Project Description
        const projectDescriptionText = doc.splitTextToSize(proj.projectDescription, pageWidth);
        projectDescriptionText.forEach((line: string | string[]) => {
          checkPageBreak(5);
          doc.text(line, margin, y);
          y += 5;
        });
  
        y += 8;
      });
    }
  
    // SKILLS SECTION
    if (skillsData.length > 0) {
      addSectionTitle("SKILLS");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(skillsData.map((skill) => skill.skillName).join(", "), margin, y);
      y += 8;
    }
  
    // CERTIFICATIONS SECTION
    if (certificatesData.length > 0) {
      addSectionTitle("CERTIFICATIONS");
  
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
  
      certificatesData.forEach((cert) => {
        checkPageBreak(15);
        doc.setFont("helvetica", "bold");
        doc.text(`${cert.name} - ${cert.organization}`, margin, y);
        y += 5;
  
        doc.setFont("helvetica", "normal");
        doc.text(`${cert.issueDate} - ${cert.doesNotExpire ? "No Expiry" : cert.expiryDate}`, margin, y);
        y += 8;
      });
    }
  
    doc.save(`${formData.fullName || "Resume"}.pdf`);
  };
  



  
  

  return (
    <div className="w-full lg:w-1/2 p-4 bg-white border shadow-md rounded-md">
      <div ref={resumeRef} className="p-4 space-y-4">
        {/* Header */}
        <div className="text-center border-b pb-3">
          <h2 className="text-lg sm:text-xl font-bold">{formData.fullName || "FULL NAME"}</h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            {formData.email || "EMAIL"} | {formData.contact || "CONTACT #"} | {formData.address || "LOCATION"}
          </p>
          <p className="text-sm text-gray-700 mt-1">{formData.summary || "Brief summary about yourself..."}</p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {/* Experience */}
          <Section title="EXPERIENCE">
            {experienceData.length > 0 ? (
              experienceData.map((exp, index) => (
                <ExperienceItem key={index} exp={exp} />
              ))
            ) : (
              <Placeholder text="No experience added yet." />
            )}
          </Section>

          {/* Education */}
          <Section title="EDUCATION">
            {educationData.length > 0 ? (
              educationData.map((edu, index) => (
                <EducationItem key={index} edu={edu} />
              ))
            ) : (
              <Placeholder text="No education added yet." />
            )}
          </Section>

          {/* Projects */}
          <Section title="PROJECTS">
            {projectData.length > 0 ? (
              projectData.map((proj, index) => (
                <ProjectItem key={index} proj={proj} />
              ))
            ) : (
              <Placeholder text="No projects added yet." />
            )}
          </Section>

          {/* Skills */}
          <Section title="SKILLS">
            {skillsData.length > 0 ? (
              <ul className="list-disc list-inside text-sm grid grid-cols-2 sm:grid-cols-3 gap-2">
                {skillsData.map((skill, index) => (
                  <li key={index} className="text-gray-700">{skill.skillName}</li>
                ))}
              </ul>
            ) : (
              <Placeholder text="No skills added yet." />
            )}
          </Section>

          {/* Certifications */}
          <Section title="CERTIFICATIONS">
            {certificatesData.length > 0 ? (
              certificatesData.map((cert, index) => (
                <CertificateItem key={index} cert={cert} />
              ))
            ) : (
              <Placeholder text="No certifications added yet." />
            )}
          </Section>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 text-sm md:text-base"
        >
          DOWNLOAD RESUME
        </button>
      </div>
    </div>
  );
};

export default RightResumePanel;

// Helper Components
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="border-b pb-3">
    <h3 className="font-semibold text-md">{title}</h3>
    {children}
  </div>
);

const ExperienceItem: React.FC<{ exp: ExperienceData }> = ({ exp }) => (
  <div className="mt-2 text-sm">
    <p className="font-semibold">{exp.company}, {exp.position}</p>
    <p className="text-xs text-gray-600">{exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</p>
    <p className="text-gray-700">{exp.jobDescription}</p>
  </div>
);

const EducationItem: React.FC<{ edu: EducationData }> = ({ edu }) => (
  <div className="mt-2 text-sm">
    <p className="font-semibold">{edu.school}</p>
    <p className="text-gray-700">{edu.degree}</p>
    <p className="text-xs text-gray-600">{edu.startDate} - {edu.currentlyStudy ? "Present" : edu.endDate}</p>
  </div>
);

const ProjectItem: React.FC<{ proj: ProjectData }> = ({ proj }) => (
  <div className="mt-2 text-sm">
    <p className="font-semibold">{proj.projectName}</p>
    <p className="text-gray-700">{proj.projectDescription}</p>
    <p className="text-xs text-gray-600">{proj.startDate} - {proj.currentlyProject ? "Present" : proj.endDate}</p>
  </div>
);

const CertificateItem: React.FC<{ cert: CertificateData }> = ({ cert }) => (
  <div className="mt-2 text-sm">
    <p className="font-semibold">{cert.name}</p>
    <p className="text-gray-700">{cert.organization}</p>
    <p className="text-xs text-gray-600">
      {cert.issueDate} - {cert.doesNotExpire ? "No Expiry" : cert.expiryDate}
    </p>
  </div>
);

const Placeholder: React.FC<{ text: string }> = ({ text }) => (
  <p className="text-sm text-gray-500">{text}</p>
);
