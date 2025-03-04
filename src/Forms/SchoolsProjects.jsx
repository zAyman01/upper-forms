import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaSchool,
  FaChalkboardTeacher,
  FaBook,
  FaPencilRuler,
  FaGlobe,
} from "react-icons/fa";

const icons = [
  FaSchool,
  FaChalkboardTeacher,
  FaBook,
  FaPencilRuler,
  FaGlobe,
  FaGraduationCap,
];


const colors = {
  primary: "#937DB2",
  darkerPurple: "#6A5A7E",
  lighterPurple: "#B9A8D1",
  warmNeutral: "#F0EAF5",
  accentPurple: "#A88FC7",
  darkNeutral: "#3E3648",
};
const educationalAdministrations = [
  "Aswan",
  "Luxor",
  "Qena",
  "Sohag",
  "Assiut",
  "Minia",
  "Beni Suef",
  "Fayoum",
];

const SchoolProjectForm = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [otherCategory, setOtherCategory] = useState("");
  const [showPrototypeInput, setShowPrototypeInput] = useState(false);
  const [prototypeDimensions, setPrototypeDimensions] = useState("");
  const [projectAbstract, setProjectAbstract] = useState("");
  const [educationalLevel, setEducationalLevel] = useState("");
  const [educationalAdministration, setEducationalAdministration] =
    useState("");
  const [schoolName, setSchoolName] = useState("");
  const [members, setMembers] = useState([
    { name: "", phone: "", email: "", nationalId: "" },
  ]);
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorPhone, setSupervisorPhone] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [supervisorNationalId, setSupervisorNationalId] = useState("");
  const [supervisorAccommodation, setSupervisorAccommodation] = useState(false);
  const [supervisorLunch, setSupervisorLunch] = useState(false);
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  // Popup Component
  const Popup = ({ type, message, onClose }) => {
    const popupStyles = {
      success: {
        backgroundColor: colors.primary,
        borderColor: colors.darkGreen,
      },
      error: {
        backgroundColor: "#f44336",
        borderColor: "#d32f2f",
      },
    };

    return (
      <motion.div
        className="fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white flex items-center justify-between z-50"
        style={popupStyles[type]}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          &times;
        </button>
      </motion.div>
    );
  };

  // Validation functions
  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name.trim());
  const validateEgyptianPhoneNumber = (phone) =>
    /^01[0-2,5]{1}[0-9]{8}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNationalId = (id) => /^\d{14}$/.test(id);

  const validateForm = () => {
    const newErrors = {};

    // Project Title
    if (!projectTitle.trim()) {
      newErrors.projectTitle = "Project title is required.";
    } else if (!validateName(projectTitle)) {
      newErrors.projectTitle = "Project title must be at least 3 letters.";
    }

    // Project Category
    if (!projectCategory)
      newErrors.projectCategory = "Project category is required.";
    if (projectCategory === "Other" && !validateName(otherCategory)) {
      newErrors.otherCategory =
        "Please specify the category (at least 3 letters).";
    }

    // Prototype Dimensions
    if (showPrototypeInput && !prototypeDimensions.trim()) {
      newErrors.prototypeDimensions = "Prototype dimensions are required.";
    }

    // Project Abstract
    if (!projectAbstract.trim()) {
      newErrors.projectAbstract = "Project abstract is required.";
    } else if (projectAbstract.length < 10) {
      newErrors.projectAbstract =
        "Project abstract must be at least 10 characters long.";
    }

    // Educational Level
    if (!educationalLevel) {
      newErrors.educationalLevel = "Educational level is required.";
    }

    // Educational Administration
    if (!educationalAdministration) {
      newErrors.educationalAdministration =
        "Educational administration is required.";
    }

    // School Name
    if (!validateName(schoolName))
      newErrors.schoolName =
        "School is required and must be at least 3 letters.";

    // Members
    members.forEach((member, index) => {
      if (!validateName(member.name))
        newErrors[`member${index + 1}Name`] = `Member ${
          index + 1
        } name must be at least 3 letters.`;
      if (!validateEgyptianPhoneNumber(member.phone))
        newErrors[
          `member${index + 1}Phone`
        ] = `Invalid phone number for member ${index + 1}.`;
      if (!validateEmail(member.email))
        newErrors[
          `member${index + 1}Email`
        ] = `Invalid email format for member ${index + 1}.`;
      if (!validateNationalId(member.nationalId))
        newErrors[
          `member${index + 1}NationalId`
        ] = `Invalid national ID for member ${index + 1}.`;
    });


    // Supervisor
    if (!validateName(supervisorName))
      newErrors.supervisorName = "Supervisor name must be at least 3 letters.";
    if (!validateEgyptianPhoneNumber(supervisorPhone))
      newErrors.supervisorPhone = "Invalid Egyptian phone number.";
    if (supervisorEmail && !validateEmail(supervisorEmail))
      newErrors.supervisorEmail = "Invalid email format.";
    if (!validateNationalId(supervisorNationalId))
      newErrors.supervisorNationalId = "Invalid national ID.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setPopup({
        visible: true,
        type: "success",
        message: "Form submitted successfully!",
      });

      resetForm();

      setTimeout(() => {
        setPopup({ visible: false, type: "", message: "" });
      }, 5000);
    } else {
      console.log(errors);
    }
  };

  const resetForm = () => {
    setProjectTitle("");
    setProjectCategory("");
    setShowOtherCategory(false);
    setOtherCategory("");
    setShowPrototypeInput(false);
    setPrototypeDimensions("");
    setProjectAbstract("");
    setEducationalLevel("");
    setEducationalAdministration("");
    setSchoolName("");
    setMembers([{ name: "", phone: "", email: "", nationalId: "" }]);
    setSupervisorName("");
    setSupervisorPhone("");
    setSupervisorEmail("");
    setSupervisorNationalId("");
    setSupervisorAccommodation(false);
    setSupervisorLunch(false);
    setErrors({});
  };

  const addMember = () => {
    if (members.length < 5) {
      setMembers([
        ...members,
        { name: "", phone: "", email: "", nationalId: "" },
      ]);
    }
  };

  const removeMember = (index) => {
    if (members.length > 1) {
      const newMembers = members.filter((_, i) => i !== index);
      setMembers(newMembers);
    }
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: colors.warmNeutral }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating School Icons */}
      {Array.from({ length: 16 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = Math.random() * 60 + 30;
        const color = `rgb(168, 143, 199, ${Math.random() * 0.5 + 0.3})`;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.6,
              color,
            }}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 30, -30, 0],
              opacity: [0.6, 0.8, 0.6],
              filter: ["blur(2px)", "blur(6px)", "blur(2px)"],
              x: [0, 40, -40, 0],
              y: [0, -40, 40, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 3,
            }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accentPurple}33, ${colors.warmNeutral}22)`,
        }}
      ></div>

      <motion.form
        className="relative bg-white p-8 rounded-xl shadow-2xl space-y-6 z-10 my-12"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ borderTop: `5px solid ${colors.primary}` }}
        onSubmit={handleSubmit}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: colors.darkNeutral }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Schools Projects Form
        </motion.h2>

        {/* Divider */}
        <motion.div
          className="h-1 w-24 mx-auto mb-8"
          style={{
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accentPurple})`, // Updated gradient
          }}
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ delay: 0.5, duration: 0.7 }}
        ></motion.div>

        {/* Project Title */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Project Title عنوان المشروع*
          </label>
          <input
            type="text"
            placeholder="Enter project title"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
            style={{
              borderColor: colors.lighterPurple,
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            required
          />
          {errors.projectTitle && (
            <p className="text-sm text-red-500 mt-1">{errors.projectTitle}</p>
          )}
        </motion.div>

        {/* Project Category */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Project Category فئه المشروع*
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
            style={{
              borderColor: colors.lighterPurple,
              color: colors.darkNeutral,
            }}
            value={projectCategory}
            onChange={(e) => {
              setProjectCategory(e.target.value);
              setShowOtherCategory(e.target.value === "Other");
            }}
            required
          >
            <option value="">Select Category</option>
            <option>Power and Green Environment</option>
            <option>Information and Communications Technology</option>
            <option value="Other">Other</option>
          </select>
          {showOtherCategory && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <input
                type="text"
                placeholder="Specify category"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                style={{ borderColor: colors.lighterPurple }}
                value={otherCategory}
                onChange={(e) => setOtherCategory(e.target.value)}
                required
              />
              {errors.otherCategory && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.otherCategory}
                </p>
              )}
            </motion.div>
          )}
          {errors.projectCategory && (
            <p className="text-sm text-red-500 mt-1">
              {errors.projectCategory}
            </p>
          )}
        </motion.div>

        {/* Prototype Dimensions */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Prototype Dimensions (if applicable) ابعاد المشروع (اذا وجد)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 rounded hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
              style={{ color: colors.lighterPurple }} // Updated checkbox color
              checked={showPrototypeInput}
              onChange={(e) => setShowPrototypeInput(e.target.checked)}
            />
            <span style={{ color: colors.darkNeutral }}>
              Include Prototype Dimensions
            </span>
          </div>
          {showPrototypeInput && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <input
                type="text"
                placeholder="Enter prototype dimensions"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                style={{ borderColor: colors.lighterPurple }}
                value={prototypeDimensions}
                onChange={(e) => setPrototypeDimensions(e.target.value)}
                required
              />
              {errors.prototypeDimensions && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.prototypeDimensions}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Project Abstract */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Project Abstract ملخص المشروع*
          </label>
          <textarea
            placeholder="Describe your project"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
            style={{ borderColor: colors.lighterPurple }}
            rows="4"
            value={projectAbstract}
            onChange={(e) => setProjectAbstract(e.target.value)}
            required
          ></textarea>
          {errors.projectAbstract && (
            <p className="text-sm text-red-500 mt-1">
              {errors.projectAbstract}
            </p>
          )}
        </motion.div>

        {/* Upload Project Proposal */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Upload Project Proposal رفع مقترح المشروع*
          </label>
          <div
            className="flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 transition-all"
            style={{
              borderColor: colors.lighterPurple + "77",
              backgroundColor: colors.warmNeutral, // Updated background color
            }}
          >
            <input
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[transparent] file:text-[#937DB2] hover:file:bg-[#937DB2] hover:file:text-white transition-all"
              style={{
                color: colors.lighterPurple,
              }}
              accept=".pdf, .doc, .docx"
              required
            />
          </div>
          <p className="mt-2 text-sm" style={{ color: colors.darkNeutral }}>
            Max 10 MB
          </p>
        </motion.div>

        {/* Educational Level */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Educational Level المستوي التعليمي*
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
            style={{
              borderColor: colors.lighterPurple,
              color: colors.darkNeutral,
            }}
            value={educationalLevel}
            onChange={(e) => setEducationalLevel(e.target.value)}
            required
          >
            <option value="">Select Level</option>
            <option>Primary -- ابتدائي</option>
            <option>Preparatory -- أعدادي</option>
            <option>Secondary -- ثانوي</option>
          </select>
          {errors.educationalLevel && (
            <p className="text-sm text-red-500 mt-1">
              {errors.educationalLevel}
            </p>
          )}
        </motion.div>

        {/* Educational Administration */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Educational Administration الادارة التعليمية*
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
            style={{
              borderColor: colors.lighterPurple,
              color: colors.darkNeutral,
            }}
            value={educationalAdministration}
            onChange={(e) => setEducationalAdministration(e.target.value)}
            required
          >
            <option value="">Select Administration</option>
            {educationalAdministrations.map((admin, index) => (
              <option key={index}>{admin}</option>
            ))}
          </select>
          {errors.educationalAdministration && (
            <p className="text-sm text-red-500 mt-1">
              {errors.educationalAdministration}
            </p>
          )}
        </motion.div>

        {/* School Name */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            School Name اسم المدرسه*
          </label>
          <input
            type="text"
            placeholder="Enter school name"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
            style={{ borderColor: colors.lighterPurple }}
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
          {errors.schoolName && (
            <p className="text-sm text-red-500 mt-1">{errors.schoolName}</p>
          )}
        </motion.div>

        {/* Members */}
        {members.map((member, index) => (
          <motion.div
            key={index}
            className="space-y-4 pt-4"
            style={{ borderTop: `2px solid ${colors.lighterPurple}` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            <motion.h3
              className="text-xl font-semibold"
              style={{ color: colors.primary }}
              whileHover={{ x: 5 }}
            >
              Member #{index + 1}
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.darkNeutral }}
                >
                  Name اسم الطالب*
                </label>
                <input
                  type="text"
                  placeholder="Enter member's name"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                  style={{ borderColor: colors.lighterPurple }}
                  value={member.name}
                  onChange={(e) =>
                    handleMemberChange(index, "name", e.target.value)
                  }
                  required
                />
                {errors[`member${index + 1}Name`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`member${index + 1}Name`]}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.darkNeutral }}
                >
                  Phone Number رقم الهاتف*
                </label>
                <input
                  type="tel"
                  placeholder="Enter member's phone number"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                  style={{ borderColor: colors.lighterPurple }}
                  value={member.phone}
                  onChange={(e) =>
                    handleMemberChange(index, "phone", e.target.value)
                  }
                  required
                />
                {errors[`member${index + 1}Phone`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`member${index + 1}Phone`]}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.darkNeutral }}
                >
                  Email البريد الالكتروني*
                </label>
                <input
                  type="email"
                  placeholder="Enter member's email"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                  style={{ borderColor: colors.lighterPurple }}
                  value={member.email}
                  onChange={(e) =>
                    handleMemberChange(index, "email", e.target.value)
                  }
                  required
                />
                {errors[`member${index + 1}Email`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`member${index + 1}Email`]}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.darkNeutral }}
                >
                  National ID الرقم القومي*
                </label>
                <input
                  type="text"
                  placeholder="Enter member's national ID"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                  style={{ borderColor: colors.lighterPurple }}
                  value={member.nationalId}
                  onChange={(e) =>
                    handleMemberChange(index, "nationalId", e.target.value)
                  }
                  required
                />
                {errors[`member${index + 1}NationalId`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`member${index + 1}NationalId`]}
                  </p>
                )}
              </div>
            </div>

            {members.length > 1 && (
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-700"
                onClick={() => removeMember(index)}
              >
                Remove Member
              </button>
            )}
          </motion.div>
        ))}

        {/* Add Member Button */}
        {members.length < 5 && (
          <motion.button
            type="button"
            className="w-full py-2 text-sm font-semibold rounded-lg transition-all"
            style={{
              background: `linear-gradient(to right, ${colors.primary}, ${colors.accentPurple})`, // Updated gradient
              color: "white",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              background: `linear-gradient(to right, ${colors.accentPurple}, ${colors.primary})`, // Updated hover gradient
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring" }}
            onClick={addMember}
          >
            Add Member
          </motion.button>
        )}

        {/* Supervisor */}
        <motion.div
          className="space-y-4 pt-4"
          style={{ borderTop: `2px solid ${colors.lighterPurple}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.h3
            className="text-xl font-semibold"
            style={{ color: colors.primary }}
            whileHover={{ x: 5 }}
          >
            Supervisor
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                Name اسم المشرف*
              </label>
              <input
                type="text"
                placeholder="Enter supervisor's name"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                style={{ borderColor: colors.lighterPurple }}
                value={supervisorName}
                onChange={(e) => setSupervisorName(e.target.value)}
                required
              />
              {errors.supervisorName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.supervisorName}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                Phone Number رقم الهاتف*
              </label>
              <input
                type="tel"
                placeholder="Enter supervisor's phone number"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                style={{ borderColor: colors.lighterPurple }}
                value={supervisorPhone}
                onChange={(e) => setSupervisorPhone(e.target.value)}
                required
              />
              {errors.supervisorPhone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.supervisorPhone}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                Email البريد الالكتروني*
              </label>
              <input
                type="email"
                placeholder="Enter supervisor's email"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                style={{ borderColor: colors.lighterPurple }}
                value={supervisorEmail}
                onChange={(e) => setSupervisorEmail(e.target.value)}
                required
              />
              {errors.supervisorEmail && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.supervisorEmail}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                National ID الرقم القومي*
              </label>
              <input
                type="text"
                placeholder="Enter supervisor's national ID"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md" // Updated hover border color
                style={{ borderColor: colors.lighterPurple }}
                value={supervisorNationalId}
                onChange={(e) => setSupervisorNationalId(e.target.value)}
                required
              />
              {errors.supervisorNationalId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.supervisorNationalId}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: colors.darkNeutral }}
            >
              Additional for Supervisor
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded hover:border-[#937DB2] hover:shadow-md"
                  style={{ color: colors.lighterPurple }}
                  checked={supervisorAccommodation}
                  onChange={(e) => setSupervisorAccommodation(e.target.checked)}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  Accommodation - السكن
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded hover:border-[#937DB2] hover:shadow-md"
                  style={{ color: colors.lighterPurple }}
                  checked={supervisorLunch}
                  onChange={(e) => setSupervisorLunch(e.target.checked)}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  Lunch - الغذاء
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-lg transition-all"
          style={{
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accentPurple})`,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            background: `linear-gradient(to right, ${colors.accentPurple}, ${colors.primary})`,
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          Submit
        </motion.button>
      </motion.form>
      {/* Popup */}
      {popup.visible && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ visible: false, type: "", message: "" })}
        />
      )}
    </motion.div>
  );
};

export default SchoolProjectForm;
