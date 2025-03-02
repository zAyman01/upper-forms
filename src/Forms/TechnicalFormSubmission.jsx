import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  const [member1Name, setMember1Name] = useState("");
  const [member1Phone, setMember1Phone] = useState("");
  const [member1Email, setMember1Email] = useState("");
  const [member1NationalId, setMember1NationalId] = useState("");
  const [member1Accommodation, setMember1Accommodation] = useState(false);
  const [supervisorName, setSupervisorName] = useState("");
  const [supervisorPhone, setSupervisorPhone] = useState("");
  const [supervisorEmail, setSupervisorEmail] = useState("");
  const [supervisorNationalId, setSupervisorNationalId] = useState("");
  const [supervisorAccommodation, setSupervisorAccommodation] = useState(false);
  const [teamLeaderEmail, setTeamLeaderEmail] = useState("");
  const [teamLeaderWhatsApp, setTeamLeaderWhatsApp] = useState("");
  const [errors, setErrors] = useState({});
  const [floatingCircles, setFloatingCircles] = useState([]);

  useEffect(() => {
    const generateCircles = () => {
      const circles = [];
      const circleColors = [
        colors.primary,
        colors.darkGreen,
        colors.accentGreen,
        colors.lightGreen,
      ];

      for (let i = 0; i < 15; i++) {
        circles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 80 + 20,
          color: circleColors[Math.floor(Math.random() * circleColors.length)],
          duration: Math.random() * 10 + 5,
          delay: Math.random() * 2,
        });
      }
      setFloatingCircles(circles);
    };

    generateCircles();
  }, []);

  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name.trim());
  const validateEgyptianPhoneNumber = (phone) =>
    /^01[0-2,5]{1}[0-9]{8}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNationalId = (id) => /^\d{14}$/.test(id);

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

    if (!validateName(member1Name))
      newErrors.member1Name =
        "Member 1 name is required and must be at least 3 letters.";
    if (!validateEgyptianPhoneNumber(member1Phone))
      newErrors.member1Phone = "Invalid Egyptian phone number.";
    if (!validateEmail(member1Email))
      newErrors.member1Email = "Invalid email format.";
    if (!validateNationalId(member1NationalId))
      newErrors.member1NationalId = "Invalid national ID.";

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
      setProjectTitle("");
      setProjectCategory("");
      setOtherCategory("");
      setHasPrototype(false);
      setPrototypeDimensions("");
      setProjectAbstract("");
      setEducationalAdministration("");
      setSchool("");
      setMember1Name("");
      setMember1Phone("");
      setMember1Email("");
      setMember1NationalId("");
      setMember1Accommodation(false);
      setSupervisorName("");
      setSupervisorPhone("");
      setSupervisorEmail("");
      setSupervisorNationalId("");
      setSupervisorAccommodation(false);
      setTeamLeaderEmail("");
      setTeamLeaderWhatsApp("");
      setErrors({});
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: colors.warmNeutral }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingCircles.map((circle) => (
          <motion.div
            key={circle.id}
            className="absolute rounded-full opacity-40"
            style={{
              left: `${circle.x}%`,
              top: `${circle.y}%`,
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              backgroundColor: circle.color,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, Math.random() + 0.5, 1],
              rotate: [0, Math.random() * 360, 0],
            }}
            transition={{
              duration: circle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: circle.delay,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accentGreen}33, ${colors.warmNeutral}22)`,
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
          Technical Form Submission
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
            style={{ color: '#000000' }}
          >
            Project Title *
          </label>
          <input
            type="text"
            placeholder="Enter your project title"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#72B27D] hover:shadow-md"
            style={{
              borderColor: colors.lightGreen,
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
            <option>Other</option>
          </select>
          {projectCategory === "Other" && (
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
                Specify Category *
              </label>
              <input
                type="text"
                placeholder="Enter your project category"
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
                style={{
                  borderColor: colors.lightGreen,
                }}
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

        {/* Member #1 */}
        <motion.div
          className="space-y-4 pt-4"
          style={{ borderTop: `2px solid ${colors.lightGreen}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.h3
            className="text-xl font-semibold"
            style={{ color: colors.primary }}
            whileHover={{ x: 5 }}
          >
            Member #1
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
                value={member1Name}
                onChange={(e) => setMember1Name(e.target.value)}
                required
              />
              {errors.member1Name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.member1Name}
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
                value={member1Phone}
                onChange={(e) => setMember1Phone(e.target.value)}
                required
              />
              {errors.member1Phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.member1Phone}
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
                value={member1Email}
                onChange={(e) => setMember1Email(e.target.value)}
                required
              />
              {errors.member1Email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.member1Email}
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
                value={member1NationalId}
                onChange={(e) => setMember1NationalId(e.target.value)}
                required
              />
              {errors.member1NationalId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.member1NationalId}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: colors.darkNeutral }}
            >
              Additional for Member #1
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded hover:border-[#72B27D] hover:shadow-md"
                  style={{ color: colors.primary }}
                  checked={member1Accommodation}
                  onChange={(e) => setMember1Accommodation(e.target.checked)}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  Accommodation (free for 2 members)
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Supervisor */}
        <motion.div
          className="space-y-4 pt-4"
          style={{ borderTop: `2px solid ${colors.lightGreen}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
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
                  Accommodation (free for 2 members)
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Upload Excel Sheet */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Upload Excel Sheet for Additional Members *
          </label>
          <div
            className="flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 transition-all"
            style={{
              borderColor: colors.primary + "77",
              backgroundColor: colors.warmNeutral,
            }}
          >
            <input
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[transparent] file:text-[#72B27D] hover:file:bg-[#72B27D] hover:file:text-white transition-all"
              style={{
                color: colors.primary,
              }}
              accept=".xlsx, .xls"
              required
            />
          </div>
          <p className="mt-2 text-sm" style={{ color: colors.primary }}>
            Max 10 MB
          </p>
        </motion.div>

        {/* Contact Information - Supervisor */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
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
