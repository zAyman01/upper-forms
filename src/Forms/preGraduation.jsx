import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { registerpregradproject } from "../../../../services/register.service";
import ClipLoader from "react-spinners/ClipLoader";

// Floating Icons Component
const FloatingIcons = React.memo(() => {
  return (
    <>
      {/* Floating Abstract Shapes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const size = Math.random() * 80 + 50;
        const color = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.3})`;

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4,
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
            <div
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                borderRadius: "50%",
              }}
            ></div>
          </motion.div>
        );
      })}
    </>
  );
});

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
  const [projectProposal, setProjectProposal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [university, setUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [year, setYear] = useState("");
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "",
      phone: "",
      email: "",
      nationalId: "",
      accommodation: false,
      lunch: false,
      isLeader: true, // First member is the leader
    },
    {
      id: 2,
      name: "",
      phone: "",
      email: "",
      nationalId: "",
      accommodation: false,
      lunch: false,
      isLeader: false,
    },
  ]);
  const [teamLeaderEmail, setTeamLeaderEmail] = useState("");
  const [teamLeaderWhatsApp, setTeamLeaderWhatsApp] = useState("");
  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({
    visible: false,
    type: "success",
    message: "",
  });

  // Popup Component
  const Popup = ({ type, message, onClose, isLoading }) => {
    const popupStyles = {
      success: {
        backgroundColor: colors.primary,
        borderColor: colors.darkerBlue,
      },
      error: {
        backgroundColor: "#f44336",
        borderColor: "#d32f2f",
      },
      loading: {
        backgroundColor: colors.primary,
        borderColor: colors.darkerBlue,
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
        {isLoading ? (
          <div className="flex items-center gap-2">
            <ClipLoader color={"#fff"} size={18} />
            <span>{message}</span>
          </div>
        ) : (
          <span>{message}</span>
        )}
        {!isLoading && (
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200"
          >
            &times;
          </button>
        )}
      </motion.div>
    );
  };

  // Validation functions
  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name.trim());
  const validateEgyptianPhoneNumber = (phone) =>
    /^01[0-2,5]{1}[0-9]{8}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNationalId = (id) => /^\d{14}$/.test(id);

  const handleAddMember = () => {
    if (members.length < 7) {
      setMembers([
        ...members,
        {
          id: members.length + 1,
          name: "",
          phone: "",
          email: "",
          nationalId: "",
          accommodation: false,
          lunch: false,
          isLeader: false,
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

  const handleLunchChange = (index) => {
    const updatedMembers = [...members];
    const currentLunchCount = updatedMembers.filter(
      (member) => member.lunch
    ).length;

    if (currentLunchCount < 2 || updatedMembers[index].lunch) {
      updatedMembers[index].lunch = !updatedMembers[index].lunch;
      setMembers(updatedMembers);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Project Title
    if (!projectTitle.trim()) {
      newErrors.projectTitle = "Project title is required.";
    }

    if (!projectProposal)
      newErrors.projectProposal = "Project proposal is required.";

    // Check mime type
    if (
      projectProposal &&
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(projectProposal.type)
    ) {
      newErrors.projectProposal =
        "Invalid file type. Please upload a PDF, DOC, or DOCX file.";
    }

    // Check file size
    if (projectProposal && projectProposal.size > 25 * 1024 * 1024) {
      newErrors.projectProposal = "File size exceeds 25 MB.";
    }

    // Project Category
    if (!projectCategory) {
      newErrors.projectCategory = "Project category is required.";
    } else if (projectCategory === "Other" && !otherCategory.trim()) {
      newErrors.otherCategory = "Please specify the category.";
    }

    // Project Track
    if (
      projectCategory !== "Civil Engineering" &&
      projectCategory !== "Architecture Engineering" &&
      !projectTrack
    ) {
      newErrors.projectTrack = "Project track is required.";
    } else if (projectTrack === "Other" && !otherTrack.trim()) {
      newErrors.otherTrack = "Please specify the track.";
    }

    // Prototype Dimensions
    if (showPrototypeInput && !prototypeDimensions.trim())
      newErrors.prototypeDimensions = "Prototype dimensions are required.";

    // Project Abstract
    if (!projectAbstract.trim()) {
      newErrors.projectAbstract = "Project abstract is required.";
    } else if (projectAbstract.length < 5) {
      newErrors.projectAbstract =
        "Project abstract must be at least 5 characters long.";
    }

    // University
    if (!university.trim()) newErrors.university = "University is required.";

    // Faculty
    if (!faculty.trim()) newErrors.faculty = "Faculty is required.";

    if (!year) newErrors.year = "Year is required."

    // Members Validation
    members.forEach((member, index) => {
      if (!validateName(member.name))
        newErrors[`member${index + 1}Name`] = `Member ${
          index + 1
        } name must be at least 3 characters long.`;
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setProjectProposal(null);
    setUniversity("");
    setFaculty("");
    setYear("");
    setMembers([
      {
        id: 1,
        name: "",
        phone: "",
        email: "",
        nationalId: "",
        accommodation: false,
        lunch: false,
        isLeader: true,
      },
      {
        id: 2,
        name: "",
        phone: "",
        email: "",
        nationalId: "",
        accommodation: false,
        lunch: false,
        isLeader: false,
      },
    ]);
    setTeamLeaderEmail("");
    setTeamLeaderWhatsApp("");
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (validateForm()) {
      // Simulate API call
      setPopup({
        visible: true,
        type: "loading",
        message: "Submitting form...",
      });

      setTimeout(() => {
        setPopup({
          visible: true,
          type: "success",
          message: "Form submitted successfully!",
        });
        resetForm();
        setIsSubmitting(false);

        setTimeout(() => {
          setPopup({ visible: false, type: "", message: "" });
        }, 5000);
      }, 2000);

      // do not pass id with members
      // const membersNew = members.map(({ id, ...rest }) => rest);

      // const data = {
      //   projTitle: projectTitle,
      //   projCategory: projectCategory,
      //   projOtherCategory: otherCategory,
      //   projTrack: projectTrack,
      //   projOtherTrack: otherTrack,
      //   projPrototype: showPrototypeInput,
      //   projPrototypeDim: prototypeDimensions,
      //   projAbstract: projectAbstract,
      //   MembersInfo: membersNew,
      //   University: university,
      //   Faculty: faculty,
      //   Year: year,
      //   LeaderEmail: teamLeaderEmail,
      //   LeaderPhone: teamLeaderWhatsApp,
      // };

      // const formData = new FormData();
      // formData.append("projProposal", projectProposal);
      // formData.append("data", JSON.stringify(data));

      // registerpregradproject(formData).then((res) => {
      //   console.log(res);
      // alert("Form submitted successfully!");
      // setIsSubmitting(false);
      // }).catch((err) => {
      //   console.log(err);
      //   setIsSubmitting(false);
      //   alert("An error occurred. Please try again later.");
      // });

      // resetForm();
    } else {
      setIsSubmitting(false);
      console.log(errors);
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
      {/* Floating Icons */}
      <FloatingIcons />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}22, ${colors.lighterBlue}33, ${colors.darkNeutral}22)`,
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
              setOtherCategory("");
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
        {projectCategory !== "Civil Engineering" &&
          projectCategory !== "Architecture Engineering" && (
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
                  setOtherTrack("");
                }}
                required
              >
                <option value="">Select Track</option>
                {/* Dynamic Track Options Based on Category */}
                {projectCategory ===
                  "Information and Communications Technology" && (
                  <>
                    <option>Communication</option>
                    <option>Software Engineering</option>
                    <option>Computer Vision</option>
                    <option>Embedded Systems</option>
                    <option>IoT</option>
                  </>
                )}
                {projectCategory === "Power and Green Environment" && (
                  <>
                    <option>Power Technologies</option>
                    <option>Green Energy</option>
                    <option>Water Treatment Solutions</option>
                    <option>Sustainable Cities</option>
                    <option>Food Security</option>
                  </>
                )}
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
                    <p className="text-sm text-red-500 mt-1">
                      {errors.otherTrack}
                    </p>
                  )}
                </motion.div>
              )}
              {errors.projectTrack && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.projectTrack}
                </p>
              )}
            </motion.div>
          )}

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
              onChange={(e) => {
                setShowPrototypeInput(e.target.checked);
                setPrototypeDimensions("");
              }}
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
              onChange={(e) => setProjectProposal(e.target.files[0])}
              accept=".pdf, .doc, .docx"
              required
            />
          </div>
          <p className="mt-2 text-sm" style={{ color: colors.darkNeutral }}>
            Max 25 MB
          </p>
          {errors.projectProposal && (
            <p className="text-sm text-red-500 mt-1">
              {errors.projectProposal}
            </p>
          )}
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
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          >
            <option value="">Select university</option>
            {universities.map((uni, index) => (
              <option key={index} value={uni}>
                {uni}
              </option>
            ))}
          </select>
          {errors.university && (
            <p className="text-sm text-red-500 mt-1">{errors.university}</p>
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

        {/* Red Note */}
        <motion.div
          className="text-center text-sm text-red-500 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            borderTop: `2px solid ${colors.lighterBlue}`,
            textAlign: "left",
          }}
        >
          All Team members transportation are covered.
          <br />
          If you are not studying at Aswan University: Only 2 members will have
          accommodation.
        </motion.div>

        {/* Members Details */}
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 + index * 0.1 }}
          >
            <motion.h3
              className="text-xl font-semibold"
              style={{
                color: index % 2 === 0 ? colors.primary : colors.accentBlue,
              }}
              whileHover={{ x: 5 }}
            >
              {member.isLeader ? "Leader" : `Member #${index + 1}`}
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                  style={{ borderColor: colors.lighterBlue }}
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                  style={{ borderColor: colors.lighterBlue }}
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#58B3DC] hover:shadow-md"
                  style={{ borderColor: colors.lighterBlue }}
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

            {/* Additional for Leader/Member */}
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                {member.isLeader
                  ? "Additional for Leader"
                  : `Additional for Member #${index + 1}`}
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 rounded hover:border-[#58B3DC] hover:shadow-md"
                    style={{ color: colors.lighterBlue }}
                    checked={member.accommodation}
                    onChange={() => handleAccommodationChange(index)}
                    disabled={
                      !member.accommodation &&
                      members.filter((m) => m.accommodation).length >= 2
                    }
                  />
                  <span className="ml-2" style={{ color: colors.darkNeutral }}>
                    Accommodation
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 rounded hover:border-[#58B3DC] hover:shadow-md"
                    style={{ color: colors.lighterBlue }}
                    checked={member.lunch}
                    onChange={() => handleLunchChange(index)}
                    disabled={
                      !member.lunch &&
                      members.filter((m) => m.lunch).length >= 2
                    }
                  />
                  <span className="ml-2" style={{ color: colors.darkNeutral }}>
                    Lunch
                  </span>
                </label>
              </div>
            </div>

            {/* Remove Member Button */}
            {index >= 2 && (
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
        {members.length < 7 && (
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
                background: `linear-gradient(to right, ${colors.primary}, ${colors.accentBlue})`,
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddMember}
            >
              Add Member
            </button>
          </motion.div>
        )}

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
          {isSubmitting ? <ClipLoader color={"#fff"} size={18} /> : "Submit"}
        </motion.button>
      </motion.form>

      {/* Popup */}
      {popup.visible && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ visible: false, type: "", message: "" })}
          isLoading={popup.type === "loading"}
        />
      )}
    </motion.div>
  );
};

export default ProjectSubmissionForm;