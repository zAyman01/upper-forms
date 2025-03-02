import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const universities = [
  "Aswan University",
  "AAST Aswan",
  "Luxor University",
  "South Valley University",
  "Azhar University",
  "Sohag University",
  "Assiut University",
  "Minia University",
  "Beni Suef University",
  "Nahda University in Beni Suef",
  "Sphinx University in Assiut",
  "Deraya University in minia",
  "Al-Tod Institute of Engineering",
  "Sohag Institute of Engineering",
];

const colors = {
  primary: "#58B3DC",
  darkerBlue: "#3A7A9E",
  lighterBlue: "#9BD4E8",
  warmNeutral: "#E6F4F9",
  accentBlue: "#7AC6E2",
  darkNeutral: "#2C3E4A",
};

const ProjectSubmissionForm = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [otherCategory, setOtherCategory] = useState("");
  const [projectTrack, setProjectTrack] = useState("");
  const [showOtherTrack, setShowOtherTrack] = useState(false);
  const [otherTrack, setOtherTrack] = useState("");
  const [showPrototypeInput, setShowPrototypeInput] = useState(false);
  const [prototypeDimensions, setPrototypeDimensions] = useState("");
  const [projectAbstract, setProjectAbstract] = useState("");
  const [educationalAdministration, setEducationalAdministration] =
    useState("");
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [year, setYear] = useState("");
  const [teamMembers, setTeamMembers] = useState(2);
  const [member1Name, setMember1Name] = useState("");
  const [member1Phone, setMember1Phone] = useState("");
  const [member1Email, setMember1Email] = useState("");
  const [member1NationalId, setMember1NationalId] = useState("");
  const [member1Accommodation, setMember1Accommodation] = useState(false);
  const [member2Name, setMember2Name] = useState("");
  const [member2Phone, setMember2Phone] = useState("");
  const [member2Email, setMember2Email] = useState("");
  const [member2NationalId, setMember2NationalId] = useState("");
  const [member2Accommodation, setMember2Accommodation] = useState(false);
  const [teamLeaderEmail, setTeamLeaderEmail] = useState("");
  const [teamLeaderWhatsApp, setTeamLeaderWhatsApp] = useState("");
  const [errors, setErrors] = useState({});
  const [floatingCircles, setFloatingCircles] = useState([]);

  useEffect(() => {
    const generateCircles = () => {
      const circles = [];
      const circleColors = [
        colors.primary,
        colors.accentBlue,
        colors.darkerBlue,
        colors.darkNeutral,
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
    if (!projectCategory) {
      newErrors.projectCategory = "Project category is required.";
    } else if (projectCategory === "Other" && !otherCategory.trim()) {
      newErrors.otherCategory = "Please specify the category.";
    }

    // Project Track
    if (!projectTrack) {
      newErrors.projectTrack = "Project track is required.";
    } else if (projectTrack === "Other" && !otherTrack.trim()) {
      newErrors.otherTrack = "Please specify the track.";
    }

    // Prototype Dimensions
    if (showPrototypeInput && !prototypeDimensions.trim()) {
      newErrors.prototypeDimensions = "Prototype dimensions are required.";
    }

    // Project Abstract
    if (!projectAbstract.trim()) {
      newErrors.projectAbstract = "Project abstract is required.";
    } else if (projectAbstract.length < 5) {
      newErrors.projectAbstract = "Project abstract must be at least 5 characters long.";
    }

    // University
    if (!educationalAdministration) {
      newErrors.educationalAdministration = "University is required.";
    }

    // Faculty
    if (!faculty.trim()) {
      newErrors.faculty = "Faculty is required.";
    }

    // Year
    if (!year) {
      newErrors.year = "Year is required.";
    }

    // Team Members
    if (teamMembers < 2 || teamMembers > 7) {
      newErrors.teamMembers = "Team members must be between 2 and 7.";
    }

    // Member 1
    if (!member1Name.trim()) {
      newErrors.member1Name = "Member 1 name is required.";
    } else if (!validateName(member1Name)) {
      newErrors.member1Name = "Member 1 name must be at least 3 letters.";
    }
    if (!validateEgyptianPhoneNumber(member1Phone)) {
      newErrors.member1Phone = "Invalid Egyptian phone number.";
    }
    if (!validateEmail(member1Email)) {
      newErrors.member1Email = "Invalid email format.";
    }
    if (!validateNationalId(member1NationalId)) {
      newErrors.member1NationalId = "Invalid national ID.";
    }

    // Member 2 (if applicable)
    if (teamMembers >= 2) {
      if (!member2Name.trim()) {
        newErrors.member2Name = "Member 2 name is required.";
      } else if (!validateName(member2Name)) {
        newErrors.member2Name = "Member 2 name must be at least 3 letters.";
      }
      if (!validateEgyptianPhoneNumber(member2Phone)) {
        newErrors.member2Phone = "Invalid Egyptian phone number.";
      }
      if (!validateEmail(member2Email)) {
        newErrors.member2Email = "Invalid email format.";
      }
      if (!validateNationalId(member2NationalId)) {
        newErrors.member2NationalId = "Invalid national ID.";
      }
    }

    // Team Leader
    if (!validateEmail(teamLeaderEmail)) {
      newErrors.teamLeaderEmail = "Invalid email format.";
    }
    if (!validateEgyptianPhoneNumber(teamLeaderWhatsApp)) {
      newErrors.teamLeaderWhatsApp = "Invalid WhatsApp number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      alert("Form submitted successfully!");
      resetForm();
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  const resetForm = () => {
    setProjectTitle("");
    setProjectCategory("");
    setShowOtherCategory(false);
    setOtherCategory("");
    setProjectTrack("");
    setShowOtherTrack(false);
    setOtherTrack("");
    setShowPrototypeInput(false);
    setPrototypeDimensions("");
    setProjectAbstract("");
    setEducationalAdministration("");
    setUniversity("");
    setFaculty("");
    setYear("");
    setTeamMembers(2);
    setMember1Name("");
    setMember1Phone("");
    setMember1Email("");
    setMember1NationalId("");
    setMember1Accommodation(false);
    setMember2Name("");
    setMember2Phone("");
    setMember2Email("");
    setMember2NationalId("");
    setMember2Accommodation(false);
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
          background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accentBlue}33, ${colors.warmNeutral}22)`,
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
          Pre Graduation Project Form
        </motion.h2>

        <motion.div
          className="h-1 w-24 mx-auto mb-8"
          style={{
            background: `linear-gradient(to right, ${colors.darkerBlue}, ${colors.primary})`,
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
            style={{ borderColor: colors.lighterBlue }}
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#58B3DC] hover:shadow-md"
            style={{
              borderColor: colors.lighterBlue,
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
            <option>Civil Engineering</option>
            <option>Architecture Engineering</option>
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
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

        {/* Project Track */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Project Track *
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#58B3DC] hover:shadow-md"
            style={{
              borderColor: colors.lighterBlue,
              color: colors.darkNeutral,
            }}
            value={projectTrack}
            onChange={(e) => {
              setProjectTrack(e.target.value);
              setShowOtherTrack(e.target.value === "Other");
            }}
            required
          >
            <option value="">Select Track</option>
            <option>Power Technologies</option>
            <option>Green Energy</option>
            <option>Water Treatment Solutions</option>
            <option>Sustainable Cities</option>
            <option>Food Security</option>
            <option value="Other">Other</option>
          </select>
          {showOtherTrack && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <input
                type="text"
                placeholder="Specify track"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
                value={otherTrack}
                onChange={(e) => setOtherTrack(e.target.value)}
                required
              />
              {errors.otherTrack && (
                <p className="text-sm text-red-500 mt-1">{errors.otherTrack}</p>
              )}
            </motion.div>
          )}
          {errors.projectTrack && (
            <p className="text-sm text-red-500 mt-1">{errors.projectTrack}</p>
          )}
        </motion.div>

        {/* Prototype Dimensions */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Prototype Dimensions (if applicable)
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 rounded hover:border-[#58B3DC] hover:shadow-md"
              style={{ color: colors.lighterBlue }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
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
          transition={{ delay: 0.6 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Project Abstract *
          </label>
          <textarea
            placeholder="Describe your project"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
            style={{ borderColor: colors.lighterBlue }}
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
          transition={{ delay: 0.7 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Upload Project Proposal *
          </label>
          <div
            className="flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 transition-all"
            style={{
              borderColor: colors.lighterBlue + "77",
              backgroundColor: colors.warmNeutral,
            }}
          >
            <input
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[transparent] file:text-[#58B3DC] hover:file:bg-[#58B3DC] hover:file:text-white transition-all"
              style={{
                color: colors.lighterBlue,
              }}
              accept=".pdf, .doc, .docx"
              required
            />
          </div>
          <p className="mt-2 text-sm" style={{ color: colors.darkNeutral }}>
            Max 100 MB
          </p>
        </motion.div>

        {/* University */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            University *
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#58B3DC] hover:shadow-md"
            style={{
              borderColor: colors.lighterBlue,
              color: colors.darkNeutral,
            }}
            value={educationalAdministration}
            onChange={(e) => setEducationalAdministration(e.target.value)}
            required
          >
            <option value="">Select university</option>
            {universities.map((admin, index) => (
              <option key={index}>{admin}</option>
            ))}
          </select>
          {errors.educationalAdministration && (
            <p className="text-sm text-red-500 mt-1">
              {errors.educationalAdministration}
            </p>
          )}
        </motion.div>

        {/* Faculty */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Faculty *
          </label>
          <input
            type="text"
            placeholder="Enter your faculty"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
            style={{ borderColor: colors.lighterBlue }}
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            required
          />
          {errors.faculty && (
            <p className="text-sm text-red-500 mt-1">{errors.faculty}</p>
          )}
        </motion.div>

        {/* Year */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Year *
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#58B3DC] hover:shadow-md"
            style={{
              borderColor: colors.lighterBlue,
              color: colors.darkNeutral,
            }}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          >
            <option value="">Select Year</option>
            <option>Prep</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          {errors.year && (
            <p className="text-sm text-red-500 mt-1">{errors.year}</p>
          )}
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Number of Team Members *
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#58B3DC] hover:shadow-md"
            style={{
              borderColor: colors.lighterBlue,
              color: colors.darkNeutral,
            }}
            value={teamMembers}
            onChange={(e) => setTeamMembers(Number(e.target.value))}
            required
          >
            {[2, 3, 4, 5, 6, 7].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {errors.teamMembers && (
            <p className="text-sm text-red-500 mt-1">{errors.teamMembers}</p>
          )}
        </motion.div>

        {/* Member #1 */}
        <motion.div
          className="space-y-4 pt-4"
          style={{ borderTop: `2px solid ${colors.lighterBlue}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <motion.h3
            className="text-xl font-semibold"
            style={{ color: colors.darkNeutral }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
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
                  className="form-checkbox h-5 w-5 rounded hover:border-[#58B3DC] hover:shadow-md"
                  style={{ color: colors.lighterBlue }}
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

        {/* Member #2 (if applicable) */}
        {teamMembers >= 2 && (
          <motion.div
            className="space-y-4 pt-4"
            style={{ borderTop: `2px solid ${colors.lighterBlue}` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <motion.h3
              className="text-xl font-semibold"
              style={{ color: colors.darkNeutral }}
              whileHover={{ x: 5 }}
            >
              Member #2
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                  style={{ borderColor: colors.lighterBlue }}
                  value={member2Name}
                  onChange={(e) => setMember2Name(e.target.value)}
                  required
                />
                {errors.member2Name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.member2Name}
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                  style={{ borderColor: colors.lighterBlue }}
                  value={member2Phone}
                  onChange={(e) => setMember2Phone(e.target.value)}
                  required
                />
                {errors.member2Phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.member2Phone}
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
                  placeholder="Enter member's email"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                  style={{ borderColor: colors.lighterBlue }}
                  value={member2Email}
                  onChange={(e) => setMember2Email(e.target.value)}
                />
                {errors.member2Email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.member2Email}
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                  style={{ borderColor: colors.lighterBlue }}
                  value={member2NationalId}
                  onChange={(e) => setMember2NationalId(e.target.value)}
                  required
                />
                {errors.member2NationalId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.member2NationalId}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                Additional for Member #2
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 rounded hover:border-[#58B3DC] hover:shadow-md"
                    style={{ color: colors.lighterBlue }}
                    checked={member2Accommodation}
                    onChange={(e) => setMember2Accommodation(e.target.checked)}
                  />
                  <span className="ml-2" style={{ color: colors.darkNeutral }}>
                    Accommodation (free for 2 members)
                  </span>
                </label>
              </div>
            </div>
          </motion.div>
        )}

        {/* Upload Excel Sheet */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Upload Excel Sheet for Additional Members
          </label>
          <div
            className="flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 transition-all"
            style={{
              borderColor: colors.lighterBlue + "77",
              backgroundColor: colors.warmNeutral,
            }}
          >
            <input
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[transparent] file:text-[#58B3DC] hover:file:bg-[#58B3DC] hover:file:text-white transition-all"
              style={{
                color: colors.lighterBlue,
              }}
              accept=".xlsx, .xls"
            />
          </div>
          <p className="mt-2 text-sm" style={{ color: colors.darkNeutral }}>
            Max 10 MB
          </p>
        </motion.div>

        {/* Contact Information - Team Leader */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="p-4 rounded-lg"
          style={{ backgroundColor: colors.warmNeutral }}
        >
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: colors.darkNeutral }}
          >
            Contact Information - Team Leader
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                style={{ borderColor: colors.lighterBlue }}
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
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accentBlue})`,
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            background: `linear-gradient(to right, ${colors.accentBlue}, ${colors.primary})`,
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

export default ProjectSubmissionForm;
