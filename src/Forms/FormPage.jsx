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
  primary: "#8FB24C",
  darkGreen: "#5A8039",
  lightGreen: "#B8D68F",
  warmNeutral: "#E6F0D6",
  accentGreen: "#A3C46F",
  darkNeutral: "#2C3E2A",
};

const FormPage = () => {
  const [teamMembers, setTeamMembers] = useState(2);
  const [hasPrototype, setHasPrototype] = useState(false);
  const [projectCategory, setProjectCategory] = useState("");
  const [projectTrack, setProjectTrack] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [otherTrack, setOtherTrack] = useState("");
  const [floatingCircles, setFloatingCircles] = useState([]);
  const [errors, setErrors] = useState({});

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

  const handleAddMember = (e) => {
    setTeamMembers(Number(e.target.value));
  };

  const validateName = (name) => {
    return name.trim().length >= 3;
  };

  const validateEgyptianNationalId = (id) => {
    const regex = /^\d{14}$/;
    return regex.test(id);
  };

  const validateEgyptianPhoneNumber = (phone) => {
    const regex = /^01[0-2,5]{1}[0-9]{8}$/;
    return regex.test(phone);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // Project Title
    const projectTitle = document.querySelector(
      'input[placeholder="Enter your project title"]'
    ).value;
    if (showPrototypeInput && !prototypeDimensions.trim()) {
      newErrors.prototypeDimensions = "Prototype dimensions are required.";
    }

    // Project Category
    if (!projectCategory)
      newErrors.projectCategory = "Project category is required.";
    if (projectCategory === "Other" && !otherCategory.trim())
      newErrors.otherCategory = "Please specify the category.";

    // Project Track
    if (!projectTrack) {
      newErrors.projectTrack = "Project track is required.";
    } else if (projectTrack === "Other" && !otherTrack.trim()) {
      newErrors.otherTrack = "Please specify the track.";
    }

    // Member 1 Details
    const member1Name = document.querySelector(
      'input[placeholder="Enter member\'s name"]'
    ).value;
    const member1Phone = document.querySelector(
      'input[placeholder="Enter member\'s phone number"]'
    ).value;
    const member1Email = document.querySelector(
      'input[placeholder="Enter member\'s email"]'
    ).value;
    const member1NationalId = document.querySelector(
      'input[placeholder="Enter member\'s national ID"]'
    ).value;

    if (!validateName(member1Name))
      newErrors.member1Name = "Member 1 name is required.";
    if (!validateEgyptianPhoneNumber(member1Phone))
      newErrors.member1Phone = "Invalid phone number.";
    if (!validateEmail(member1Email))
      newErrors.member1Email = "Invalid email format.";
    if (!validateEgyptianNationalId(member1NationalId))
      newErrors.member1NationalId = "Invalid national ID.";

    // Member 2 Details
    const member2Name = document.querySelectorAll(
      'input[placeholder="Enter member\'s name"]'
    )[1].value;
    const member2Phone = document.querySelectorAll(
      'input[placeholder="Enter member\'s phone number"]'
    )[1].value;
    const member2Email = document.querySelectorAll(
      'input[placeholder="Enter member\'s email"]'
    )[1].value;
    const member2NationalId = document.querySelectorAll(
      'input[placeholder="Enter member\'s national ID"]'
    )[1].value;

    if (!validateName(member2Name))
      newErrors.member2Name = "Member 2 name is required.";
    if (!validateEgyptianPhoneNumber(member2Phone))
      newErrors.member2Phone = "Invalid phone number.";
    if (!validateEmail(member2Email))
      newErrors.member2Email = "Invalid email format.";
    if (!validateEgyptianNationalId(member2NationalId))
      newErrors.member2NationalId = "Invalid national ID.";

    // Team Leader Details
    const teamLeaderEmail = document.querySelector(
      'input[placeholder="Team leader\'s email"]'
    ).value;
    const teamLeaderPhone = document.querySelector(
      'input[placeholder="Team leader\'s WhatsApp"]'
    ).value;

    if (!validateEmail(teamLeaderEmail))
      newErrors.teamLeaderEmail = "Invalid email format.";
    if (!validateEgyptianPhoneNumber(teamLeaderPhone))
      newErrors.teamLeaderPhone = "Invalid Egyptian phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setTeamMembers(2);
    setHasPrototype(false);
    setProjectCategory("");
    setProjectTrack("");
    setOtherCategory("");
    setOtherTrack("");
    setErrors({});

    const form = document.querySelector("form");
    form.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      resetForm();
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
          Graduation Projects Form
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
            style={{
              borderColor: colors.lightGreen,
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#8FB24C] hover:shadow-md"
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
            <option>Civil Engineering</option>
            <option>Architecture Engineering</option>
            <option>Information and Communications Technology</option>
            <option>Other</option>
          </select>
          {errors.projectCategory && (
            <p className="text-sm text-red-500 mt-1">
              {errors.projectCategory}
            </p>
          )}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
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
        </motion.div>

        {/* Project Track */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#8FB24C] hover:shadow-md"
            style={{
              borderColor: colors.lightGreen,
              color: colors.darkNeutral,
            }}
            value={projectTrack}
            onChange={(e) => setProjectTrack(e.target.value)}
            required
          >
            <option value="">Select Track</option>
            <option>Communication</option>
            <option>Software Engineering</option>
            <option>Computer Vision</option>
            <option>Embedded Systems</option>
            <option>IoT</option>
            <option>Other</option>
          </select>
          {errors.projectTrack && (
            <p className="text-sm text-red-500 mt-1">{errors.projectTrack}</p>
          )}
          {projectTrack === "Other" && (
            <motion.div
              className="mt-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Specify track"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
                value={otherTrack}
                onChange={(e) => setOtherTrack(e.target.value)}
                required
              />
              {errors.otherTrack && (
                <p className="text-sm text-red-500 mt-1">{errors.otherTrack}</p>
              )}
            </motion.div>
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
            Does the project have a prototype?
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 rounded hover:border-[#8FB24C] hover:shadow-md"
                style={{ color: colors.primary }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
              />
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
            style={{ borderColor: colors.lightGreen }}
            rows="4"
            required
          ></textarea>
        </motion.div>

        {/* Upload Project Proposal */}
        <motion.div>
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Upload Project Proposal *
          </label>
          <div
            className="flex items-center justify-center w-full border-2 border-dashed rounded-lg p-6 transition-all delay-150 duration-300"
            style={{
              borderColor: colors.primary + "77",
              backgroundColor: colors.warmNeutral,
            }}
            whileHover={{
              borderColor: colors.primary,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <input
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#EBEDF0] file:text-[#8FB24C] hover:file:bg-[#8FB24C] hover:file:text-white transition-all delay-150 duration-300"
              style={{
                color: colors.primary,
              }}
              accept=".pdf, .docx, .doc"
              required
            />
          </div>
          <p className="mt-2 text-sm" style={{ color: colors.primary }}>
            Max 10 MB
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#8FB24C] hover:shadow-md"
            style={{
              borderColor: colors.lightGreen,
              color: colors.darkNeutral,
            }}
            required
          >
            {universities.map((uni, index) => (
              <option key={index}>{uni}</option>
            ))}
          </select>
        </motion.div>

        {/* Faculty */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Faculty *
          </label>
          <input
            type="text"
            placeholder="Enter your faculty name"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
            style={{ borderColor: colors.lightGreen }}
            required
          />
        </motion.div>

        {/* Team Members */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Number of Team Members *
          </label>
          <div className="flex items-center space-x-4 flex-wrap">
            {[2, 3, 4, 5, 6, 7].map((num) => (
              <label key={num} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="teamMembers"
                  value={num}
                  checked={teamMembers === num}
                  onChange={handleAddMember}
                  className="form-radio h-5 w-5 hover:border-[#8FB24C] hover:shadow-md"
                  style={{ color: colors.primary }}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  {num}
                </span>
              </label>
            ))}
          </div>
          {errors.teamMembers && (
            <p className="text-sm text-red-500 mt-1">{errors.teamMembers}</p>
          )}
        </motion.div>

        {/* Member 1 */}
        <motion.div
          className="space-y-4 pt-4"
          style={{ borderTop: `2px solid ${colors.lightGreen}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                  className="form-checkbox h-5 w-5 rounded hover:border-[#8FB24C] hover:shadow-md"
                  style={{ color: colors.primary }}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  Accommodation (free for 2 members)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded hover:border-[#8FB24C] hover:shadow-md"
                  style={{ color: colors.primary }}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  Lunch (free for 2 members)
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Member 2 */}
        <motion.div
          className="space-y-4 pt-4"
          style={{ borderTop: `2px solid ${colors.lightGreen}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.h3
            className="text-xl font-semibold"
            style={{ color: colors.accentGreen }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                Email *
              </label>
              <input
                type="email"
                placeholder="Enter member's email"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
                required
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                  className="form-checkbox h-5 w-5 rounded hover:border-[#8FB24C] hover:shadow-md"
                  style={{ color: colors.primary }}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  Accommodation (free for 2 members)
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded hover:border-[#8FB24C] hover:shadow-md"
                  style={{ color: colors.primary }}
                />
                <span className="ml-2" style={{ color: colors.darkNeutral }}>
                  Lunch (free for 2 members)
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Upload Excel Sheet for Additional Members */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.5 }}
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
            whileHover={{
              borderColor: colors.primary,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <input
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#EBEDF0] file:text-[#8FB24C] hover:file:bg-[#8FB24C] hover:file:text-white transition-all"
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

        {/* Contact Information - Team Leader */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="p-4 rounded-lg"
          style={{ backgroundColor: colors.warmNeutral }}
        >
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: colors.primary }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:colors.darkNeutral hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:colors.darkNeutral hover:border-[#8FB24C] hover:shadow-md"
                style={{ borderColor: colors.lightGreen }}
                required
              />
              {errors.teamLeaderPhone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.teamLeaderPhone}
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

export default FormPage;
