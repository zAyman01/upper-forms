import React, { useState } from "react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
// import { registerschoolsproject } from "../../../../services/register.service";
import {
  FaGraduationCap,
  FaSchool,
  FaChalkboardTeacher,
  FaBook,
  FaPencilRuler,
  FaGlobe,
} from "react-icons/fa";

// Floating Icons Component
const icons = [
  FaSchool,
  FaChalkboardTeacher,
  FaBook,
  FaPencilRuler,
  FaGlobe,
  FaGraduationCap,
];

const FloatingIcons = React.memo(() => {
  return (
    <>
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
              opacity: 0.8,
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
    </>
  );
});

// Main Form Component
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

const colors = {
  primary: "#937DB2",
  darkerPurple: "#6A5A7E",
  lighterPurple: "#B9A8D1",
  warmNeutral: "#F0EAF5",
  accentPurple: "#A88FC7",
  darkNeutral: "#3E3648",
};

const SchoolProjectForm = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  const [otherCategory, setOtherCategory] = useState("");
  const [showPrototypeInput, setShowPrototypeInput] = useState(false);
  const [projectProposal, setProjectProposal] = useState(null);
  const [prototypeDimensions, setPrototypeDimensions] = useState("");
  const [projectAbstract, setProjectAbstract] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [educationalLevel, setEducationalLevel] = useState("");
  const [educationalAdministration, setEducationalAdministration] =
    useState("");
  const [schoolName, setSchoolName] = useState("");
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "",
      phone: "",
      email: "",
      nationalId: "",
      accommodation: false,
      lunch: false,
    },
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

  // Validation functions
  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name.trim());
  const validateEgyptianPhoneNumber = (phone) =>
    /^01[0-2,5]{1}[0-9]{8}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNationalId = (id) => /^\d{14}$/.test(id);

  const handleFileChange = (e) => {
    setProjectProposal(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};

    // Project Title
    if (!projectTitle.trim()) {
      newErrors.projectTitle = "Project title is required.";
    } else if (!validateName(projectTitle)) {
      newErrors.projectTitle =
        "Project title must be at least 3 letters from A-Z.";
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
    if (!schoolName.trim()) {
      newErrors.schoolName = "School name is required.";
    }

    // Members Validation
    members.forEach((member, index) => {
      if (!validateName(member.name)) {
        newErrors[`member${index + 1}Name`] = `Member ${
          index + 1
        } name must be 3 characters long.`;
      }
      if (!validateEgyptianPhoneNumber(member.phone)) {
        newErrors[
          `member${index + 1}Phone`
        ] = `Invalid phone number for member ${index + 1}.`;
      }
      if (!validateEmail(member.email)) {
        newErrors[
          `member${index + 1}Email`
        ] = `Invalid email format for member ${index + 1}.`;
      }
      if (!validateNationalId(member.nationalId)) {
        newErrors[
          `member${index + 1}NationalId`
        ] = `Invalid national ID for member ${index + 1}.`;
      }
    });

    // Supervisor Validation
    if (!validateName(supervisorName)) {
      newErrors.supervisorName = "Supervisor name must be 3 characters long.";
    }
    if (!validateEgyptianPhoneNumber(supervisorPhone)) {
      newErrors.supervisorPhone = "Invalid phone number for supervisor.";
    }
    if (!validateEmail(supervisorEmail)) {
      newErrors.supervisorEmail = "Invalid email format for supervisor.";
    }
    if (!validateNationalId(supervisorNationalId)) {
      newErrors.supervisorNationalId = "Invalid national ID for supervisor.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const resetForm = () => {
    setProjectTitle("");
    setProjectCategory("");
    setShowOtherCategory(false);
    setOtherCategory("");
    setShowPrototypeInput(false);
    setProjectProposal(null);
    setPrototypeDimensions("");
    setProjectAbstract("");
    setEducationalLevel("");
    setEducationalAdministration("");
    setSchoolName("");
    setMembers([
      {
        id: 1,
        name: "",
        phone: "",
        email: "",
        nationalId: "",
        accommodation: false,
        lunch: false,
      },
    ]);
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
        {
          id: members.length + 1,
          name: "",
          phone: "",
          email: "",
          nationalId: "",
          accommodation: false,
          lunch: false,
        },
      ]);
    }
  };

  const removeMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const totalSelectedAccommodation = () => {
    let total = 0;
    members.forEach((member) => {
      if (member.accommodation) total++;
    });
    if (supervisorAccommodation) total++;
    return total;
  };

  const totalSelectedLunch = () => {
    let total = 0;
    members.forEach((member) => {
      if (member.lunch) total++;
    });
    if (supervisorLunch) total++;
    return total;
  };

  const handleAccommodationChange = (index) => {
    const updatedMembers = [...members];
    const currentTotal = totalSelectedAccommodation();

    // Allow toggling if the total is less than 2 or if the current option is already selected
    if (currentTotal < 2 || updatedMembers[index].accommodation) {
      updatedMembers[index].accommodation =
        !updatedMembers[index].accommodation;
      setMembers(updatedMembers);
    }
  };

  const handleLunchChange = (index) => {
    const updatedMembers = [...members];
    const currentTotal = totalSelectedLunch();

    // Allow toggling if the total is less than 2 or if the current option is already selected
    if (currentTotal < 2 || updatedMembers[index].lunch) {
      updatedMembers[index].lunch = !updatedMembers[index].lunch;
      setMembers(updatedMembers);
    }
  };

  const handleSupervisorAccommodationChange = (e) => {
    const currentTotal = totalSelectedAccommodation();

    // Allow toggling if the total is less than 2 or if the current option is already selected
    if (currentTotal < 2 || supervisorAccommodation) {
      setSupervisorAccommodation(e.target.checked);
    }
  };

  const handleSupervisorLunchChange = (e) => {
    const currentTotal = totalSelectedLunch();

    // Allow toggling if the total is less than 2 or if the current option is already selected
    if (currentTotal < 2 || supervisorLunch) {
      setSupervisorLunch(e.target.checked);
    }
  };

  // Popup Component
  const Popup = ({ type, message, onClose, isLoading }) => {
    const popupStyles = {
      success: {
        backgroundColor: colors.primary,
        borderColor: colors.darkerPurple,
      },
      error: {
        backgroundColor: "#f44336",
        borderColor: "#d32f2f",
      },
      loading: {
        backgroundColor: colors.primary,
        borderColor: colors.darkerPurple,
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

      {/* Gradient Overlay */}
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
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accentPurple})`,
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#937DB2] hover:shadow-md"
            style={{
              borderColor: colors.lighterPurple,
              color: colors.darkNeutral,
            }}
            value={projectCategory}
            onChange={(e) => {
              setProjectCategory(e.target.value);
              setShowOtherCategory(e.target.value === "Other");
              if (e.target.value !== "Other") setOtherCategory("");
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
              className="form-checkbox h-5 w-5 rounded hover:border-[#937DB2] hover:shadow-md"
              style={{ color: colors.lighterPurple }}
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
              backgroundColor: colors.warmNeutral,
            }}
          >
            <input
              type="file"
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[transparent] file:text-[#937DB2] hover:file:bg-[#937DB2] hover:file:text-white transition-all"
              style={{
                color: colors.lighterPurple,
              }}
              accept=".pdf, .doc, .docx"
              onChange={handleFileChange}
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#937DB2] hover:shadow-md"
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#937DB2] hover:shadow-md"
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
            style={{ borderColor: colors.lighterPurple }}
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
          {errors.schoolName && (
            <p className="text-sm text-red-500 mt-1">{errors.schoolName}</p>
          )}
        </motion.div>

        {/* Red Note */}
        <motion.div
          className="text-center text-sm text-red-500 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            borderTop: `2px solid ${colors.lighterPurple}`,
            textAlign: "left",
          }}
        >
          All Team members transportation are covered.
          <br />
          If you are not studying at Aswan University: Only 2 members will have
          accommodation.
        </motion.div>

        {/* Members */}
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            className="space-y-4"
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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

            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.darkNeutral }}
              >
                Additional for Member
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 rounded hover:border-[#937DB2] hover:shadow-md"
                    style={{ color: colors.lighterPurple }}
                    checked={member.accommodation}
                    onChange={() => handleAccommodationChange(index)}
                    disabled={
                      !member.accommodation && totalSelectedAccommodation() >= 2
                    }
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
                    checked={member.lunch}
                    onChange={() => handleLunchChange(index)}
                    disabled={!member.lunch && totalSelectedLunch() >= 2}
                  />
                  <span className="ml-2" style={{ color: colors.darkNeutral }}>
                    Lunch - الغذاء
                  </span>
                </label>
              </div>
            </div>

            {members.length > 1 && (
              <button
                type="button"
                className="text-sm text-red-500 hover:text-red-700"
                onClick={() => removeMember(member.id)}
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
              background: `linear-gradient(to right, ${colors.primary}, ${colors.accentPurple})`,
              color: "white",
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#937DB2] hover:shadow-md"
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
                  onChange={handleSupervisorAccommodationChange}
                  disabled={
                    !supervisorAccommodation &&
                    totalSelectedAccommodation() >= 2
                  }
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
                  onChange={handleSupervisorLunchChange}
                  disabled={!supervisorLunch && totalSelectedLunch() >= 2}
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

export default SchoolProjectForm;
