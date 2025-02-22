import React from "react";

interface Certificate {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  doesNotExpire: boolean;
}

interface CertificateItemProps {
  cert: Certificate;
  index: number;
  certificateData: Certificate[];
  setCertificateData: React.Dispatch<React.SetStateAction<Certificate[]>>;
}

const CertificateItem: React.FC<CertificateItemProps> = ({
  cert,
  index,
  certificateData,
  setCertificateData,
}) => {
  const handleChange = (field: keyof Certificate, value: string | boolean) => {
    const updatedData = [...certificateData];
    updatedData[index] = { ...updatedData[index], [field]: value };
    setCertificateData(updatedData);
  };

  return (
    <div className="border p-4 rounded space-y-3">
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Certificate Name"
        value={cert.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Issuing Organization"
        value={cert.organization}
        onChange={(e) => handleChange("organization", e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={cert.issueDate}
          onChange={(e) => handleChange("issueDate", e.target.value)}
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={cert.expiryDate}
          disabled={cert.doesNotExpire}
          onChange={(e) => handleChange("expiryDate", e.target.value)}
        />
      </div>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={cert.doesNotExpire}
          onChange={(e) => handleChange("doesNotExpire", e.target.checked)}
        />
        <span>Cert Valid</span>
      </label>
    </div>
  );
};

interface CertificateFormProps {
  activeTab: string;
  certificateData: Certificate[];
  setCertificateData: React.Dispatch<React.SetStateAction<Certificate[]>>;
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  activeTab,
  certificateData,
  setCertificateData,
}) => {
  return (
    <>
      {activeTab === "Certifications" && (
        <div className="space-y-4">
          {certificateData.map((cert, index) => (
            <CertificateItem
              key={index}
              index={index}
              cert={cert}
              certificateData={certificateData}
              setCertificateData={setCertificateData}
            />
          ))}

          {/* Add Certificate Button */}
          <button
            className="w-full sm:w-auto px-5 py-2 border rounded hover:bg-gray-300 transition"
            onClick={() =>
              setCertificateData([
                ...certificateData,
                {
                  name: "",
                  organization: "",
                  issueDate: "",
                  expiryDate: "",
                  doesNotExpire: false,
                },
              ])
            }
          >
            + Add Certificate
          </button>
        </div>
      )}
    </>
  );
};

export default CertificateForm;
