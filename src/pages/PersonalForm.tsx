import React from "react";

interface PersonalFormProps {
  formData: {
    fullName: string;
    email: string;
    contact: string;
    address: string;
    summary: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalForm: React.FC<PersonalFormProps> = ({ formData, handleChange }) => {
  return (
    <div className="space-y-3 border p-4 rounded space-y-2">
      <input
        className="w-full p-2 border rounded"
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        name="contact"
        placeholder="Contact #"
        value={formData.contact}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border rounded"
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <textarea
        className="w-full p-2 border rounded"
        name="summary"
        placeholder="Summary"
        value={formData.summary}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default PersonalForm;
