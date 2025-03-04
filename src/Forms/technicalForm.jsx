import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaCogs,
  FaFileAlt,
  FaWrench,
  FaSatelliteDish,
  FaRocket,
} from "react-icons/fa";

const icons = [FaCode, FaCogs, FaFileAlt, FaWrench, FaSatelliteDish, FaRocket];

const EducationalAdministrations = [
  "Aswan",
  "Luxor",
  "Qena",
  "Sohag",
  "Assiut",
  "Minia",
  "Beni Suef",
  "Fayoum",
];

const colors = {
  primary: "#72B27D",
  darkGreen: "#4A8055",
  lightGreen: "#A3D6A8",
  warmNeutral: "#E6F0E8",
  accentGreen: "#8FC997",
  darkNeutral: "#2C3E2F",
};

const TechnicalFormSubmission = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [hasPrototype, setHasPrototype] = useState(false);
  const [prototypeDimensions, setPrototypeDimensions] = useState("");
  const [projectAbstract, setProjectAbstract] = useState("");
  const [educationalAdministration, setEducationalAdministration] =
    useState("");
  const [school, setSchool] = useState("");
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "",
      phone: "",
      email: "",
      nationalId: "",
      accommodation: false,
    },
  ]);
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorPhone, setSupervisorPhone] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [supervisorNationalId, setSupervisorNationalId] = useState("");
  const [supervisorAccommodation, setSupervisorAccommodation] = useState(false);
  const [teamLeaderEmail, setTeamLeaderEmail] = useState("");
  const [teamLeaderWhatsApp, setTeamLeaderWhatsApp] = useState("");
  const [errors, setErrors] = useState({});
  const [floatingCircles, setFloatingCircles] = useState([]);

  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name.trim());
  const validateEgyptianPhoneNumber = (phone) =>
    /^01[0-2,5]{1}[0-9]{8}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNationalId = (id) => /^\d{14}$/.test(id);

  const handleAddMember = () => {
    if (members.length < 5) {
      setMembers([
        ...members,
        {
          id: members.length + 1,
          name: "",
          phone: "",
          email: "",
          nationalId: "",
          accommodation: false,
        },
      ]);
    }
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleAccommodationChange = (index) => {
    const updatedMembers = [...members];
    const currentAccommodationCount = updatedMembers.filter(
      (member) => member.accommodation
    ).length;

    if (currentAccommodationCount < 2 || updatedMembers[index].accommodation) {
      updatedMembers[index].accommodation =
        !updatedMembers[index].accommodation;
      setMembers(updatedMembers);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (showPrototypeInput && !prototypeDimensions.trim()) {
      newErrors.prototypeDimensions = "Prototype dimensions are required.";
    }

    if (!projectCategory)
      newErrors.projectCategory = "Project category is required.";
    if (projectCategory === "Other" && !validateName(otherCategory)) {
      newErrors.otherCategory =
        "Please specify the category (at least 3 letters).";
    }

    if (!projectAbstract.trim()) {
      newErrors.projectAbstract = "Project abstract is required.";
    } else if (projectAbstract.length < 5) {
      newErrors.projectAbstract =
        "Project abstract must be at least 5 characters long.";
    }

    if (!educationalAdministration)
      newErrors.educationalAdministration =
        "Educational administration is required.";

    if (!validateName(school))
      newErrors.school = "School is required and must be at least 3 letters.";

    // Members Validation
    members.forEach((member, index) => {
      if (!validateName(member.name))
        newErrors[`member${index + 1}Name`] = `Member ${
          index + 1
        } name is required.`;
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

    if (!validateName(supervisorName))
      newErrors.supervisorName =
        "Supervisor name is required and must be at least 3 letters.";
    if (!validateEgyptianPhoneNumber(supervisorPhone))
      newErrors.supervisorPhone = "Invalid Egyptian phone number.";
    if (supervisorEmail && !validateEmail(supervisorEmail))
      newErrors.supervisorEmail = "Invalid email format.";
    if (!validateNationalId(supervisorNationalId))
      newErrors.supervisorNationalId = "Invalid national ID.";

    if (!validateEmail(teamLeaderEmail))
      newErrors.teamLeaderEmail = "Invalid email format.";
    if (!validateEgyptianPhoneNumber(teamLeaderWhatsApp))
      newErrors.teamLeaderWhatsApp = "Invalid WhatsApp number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      resetForm();
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  const resetForm = () => {
    setProjectTitle("");
    setProjectCategory("");
    setOtherCategory("");
    setHasPrototype(false);
    setPrototypeDimensions("");
    setProjectAbstract("");
    setEducationalAdministration("");
    setSchool("");
    setMembers([
      {
        id: 1,
        name: "",
        phone: "",
        email: "",
        nationalId: "",
        accommodation: false,
      },
    ]);
    setSupervisorName("");
    setSupervisorPhone("");
    setSupervisorEmail("");
    setSupervisorNationalId("");
    setSupervisorAccommodation(false);
    setTeamLeaderEmail("");
    setTeamLeaderWhatsApp("");
    setErrors({});
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: colors.warmNeutral }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating Technical Icons */}
      {Array.from({ length: 12 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = Math.random() * 60 + 30;
        const color = `rgb(114, 178, 125, ${Math.random() * 0.5 + 0.3})`;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4,
              color,
            }}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 30, -30, 0],
              opacity: [0.6, 0.3, 0.6],
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
          background: `linear-gradient(135deg, ${colors.primary}22, ${colors.lightGreen}33, ${colors.darkNeutral}22)`,
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
          Technical Projects Form
        </motion.h2>

        <motion.div
          className="h-1 w-24 mx-auto mb-8"
          style={{
            background: `linear-gradient(to right, ${colors.accentGreen}, ${colors.primary})`,
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
            Project Title *
          </label>
          <input
            type="text"
            placeholder="Enter your project title"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
            style={{ borderColor: colors.lightGreen }}
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
            Project Category *
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#72B27D] hover:shadow-md"
            style={{
              borderColor: colors.lightGreen,
              color: colors.darkNeutral,
            }}
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option>Power and Green Environment</option>
            <option>Information and Communications Technology</option>
            <option value="Other">Other</option>
          </select>
          {projectCategory === "Other" && (
            <motion.div
              className="mt-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Specify category"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
            Does the project have a prototype?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 rounded hover:border-[#72B27D] hover:shadow-md"
                style={{ color: colors.primary }}
                checked={hasPrototype}
                onChange={(e) => setHasPrototype(e.target.checked)}
              />
              <span className="ml-2" style={{ color: colors.darkNeutral }}>
                Yes
              </span>
            </label>
          </div>
          {hasPrototype && (
            <motion.div
              className="mt-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                Prototype Dimensions
              </label>
              <input
                type="text"
                placeholder="Enter prototype dimensions"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
                value={prototypeDimensions}
                onChange={(e) => setPrototypeDimensions(e.target.value)}
              />
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
            Project Abstract *
          </label>
          <textarea
            placeholder="Describe your project"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
            style={{ borderColor: colors.lightGreen }}
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

        {/* Educational Administration */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Educational Administration *
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#72B27D] hover:shadow-md"
            style={{
              borderColor: colors.lightGreen,
              color: colors.darkNeutral,
            }}
            value={educationalAdministration}
            onChange={(e) => setEducationalAdministration(e.target.value)}
            required
          >
            <option value="">Select Educational Administration</option>
            {EducationalAdministrations.map((uni, index) => (
              <option key={index}>{uni}</option>
            ))}
          </select>
          {errors.educationalAdministration && (
            <p className="text-sm text-red-500 mt-1">
              {errors.educationalAdministration}
            </p>
          )}
        </motion.div>

        {/* School */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            School *
          </label>
          <input
            type="text"
            placeholder="Enter your school"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
            style={{ borderColor: colors.lightGreen }}
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
          />
          {errors.school && (
            <p className="text-sm text-red-500 mt-1">{errors.school}</p>
          )}
        </motion.div>

        {/* Red Note */}
        <motion.div
          className="text-center text-sm text-red-500 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{ borderTop: `2px solid ${colors.lightGreen}` }}
        >
          Note: Free accommodation is only available for 2 members.
        </motion.div>

        {/* Members Details */}
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            className="space-y-4 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 + index * 0.1 }}
          >
            <motion.h3
              className="text-xl font-semibold"
              style={{
                color: index % 2 === 0 ? colors.primary : colors.accentGreen,
              }}
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
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter member's name"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                  style={{ borderColor: colors.lightGreen }}
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
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter member's phone number"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                  style={{ borderColor: colors.lightGreen }}
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
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter member's email"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                  style={{ borderColor: colors.lightGreen }}
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
                  National ID *
                </label>
                <input
                  type="text"
                  placeholder="Enter member's national ID"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                  style={{ borderColor: colors.lightGreen }}
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

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                Additional for Member #{index + 1}
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 rounded hover:border-[#72B27D] hover:shadow-md"
                    style={{ color: colors.primary }}
                    checked={member.accommodation}
                    onChange={() => handleAccommodationChange(index)}
                    disabled={
                      !member.accommodation &&
                      members.filter((m) => m.accommodation).length >= 2
                    }
                  />
                  <span className="ml-2" style={{ color: colors.darkNeutral }}>
                    Accommodation (free for 2 members)
                  </span>
                </label>
              </div>
            </div>

            {/* Remove Member Button*/}
            {index >= 1 && (
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-700"
                onClick={() => handleRemoveMember(member.id)}
              >
                Remove Member
              </button>
            )}
          </motion.div>
        ))}

        {/* Add Member Button */}
        {members.length < 5 && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + members.length * 0.1 }}
          >
            <button
              type="button"
              className="px-4 py-2 text-white font-semibold rounded-lg transition-all"
              style={{
                background: `linear-gradient(to right, ${colors.primary}, ${colors.accentGreen})`,
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddMember}
            >
              Add Member
            </button>
          </motion.div>
        )}

        {/* Supervisor */}
        <motion.div
          className="space-y-4 pt-4"
          style={{ borderTop: `2px solid ${colors.lightGreen}` }}
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
                Name *
              </label>
              <input
                type="text"
                placeholder="Enter supervisor's name"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="Enter supervisor's phone number"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                Email
              </label>
              <input
                type="email"
                placeholder="Enter supervisor's email"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
                value={supervisorEmail}
                onChange={(e) => setSupervisorEmail(e.target.value)}
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
                National ID *
              </label>
              <input
                type="text"
                placeholder="Enter supervisor's national ID"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                  className="form-checkbox h-5 w-5 rounded hover:border-[#72B27D] hover:shadow-md"
                  style={{ color: colors.primary }}
                  checked={supervisorAccommodation}
                  onChange={(e) => setSupervisorAccommodation(e.target.checked)}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  Accommodation
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Contact Information - Supervisor */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="p-4 rounded-lg"
          style={{ backgroundColor: colors.warmNeutral }}
        >
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: colors.primary }}
          >
            Contact Information - Supervisor
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                Email *
              </label>
              <input
                type="email"
                placeholder="Team leader's email"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:colors.dimGray hover:border-[#72B27D] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
                value={teamLeaderEmail}
                onChange={(e) => setTeamLeaderEmail(e.target.value)}
                required
              />
              {errors.teamLeaderEmail && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.teamLeaderEmail}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                WhatsApp Number *
              </label>
              <input
                type="tel"
                placeholder="Team leader's WhatsApp"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:colors.dimGray hover:border-[#72B27D] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
                value={teamLeaderWhatsApp}
                onChange={(e) => setTeamLeaderWhatsApp(e.target.value)}
                required
              />
              {errors.teamLeaderWhatsApp && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.teamLeaderWhatsApp}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-lg transition-all"
          style={{
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accentGreen})`,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            background: `linear-gradient(to right, ${colors.accentGreen}, ${colors.primary})`,
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring" }}
        >
          Submit
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default TechnicalFormSubmission;
