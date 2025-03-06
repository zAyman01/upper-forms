import React, { useState } from "react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";
import { FaBridge, FaScissors } from "react-icons/fa6";
import { PiBridgeBold } from "react-icons/pi";
import { FaHardHat } from "react-icons/fa";
// import { registerspaghetti } from "../../../../services/register.service";

// Floating Icons Component
const icons = [FaBridge, PiBridgeBold, FaScissors, FaHardHat];

const FloatingIcons = React.memo(() => {
  return (
    <>
      {Array.from({ length: 16 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const size = Math.random() * 60 + 40;
        const color = "#FFD700"; // Assuming primary color is #FFD700

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color,
            }}
            animate={{
              y: [0, -50, 0],
              rotate: [0, 10, -10, 0],
              filter: [
                "blur(0px) drop-shadow(0px 0px 0px rgba(255,255,255,0))",
                "blur(3px) drop-shadow(0px 4px 10px rgba(255,255,255,0.6))",
                "blur(0px) drop-shadow(0px 0px 0px rgba(255,255,255,0))",
              ],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
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
  "Other",
];

const colors = {
  primary: "#FFD700",
  darkYellow: "#CCAA00",
  lightYellow: "#FFE44D",
  warmNeutral: "#FFF8E1",
  accentYellow: "#FFC107",
  darkNeutral: "#4A3C2C",
};

const SpaghettiBridgeForm = () => {
  const [teamName, setTeamName] = useState("");
  const [university, setUniversity] = useState("");
  const [otherUniversity, setOtherUniversity] = useState("");
  const [faculty, setFaculty] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "",
      phone: "",
      email: "",
      nationalId: "",
      isLeader: true,
    },
  ]);
  const [howDidYouKnow, setHowDidYouKnow] = useState("");
  const [communityPartner, setCommunityPartner] = useState("");
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
        borderColor: colors.darkYellow,
      },
      error: {
        backgroundColor: "#f44336",
        borderColor: "#d32f2f",
      },
      loading: {
        backgroundColor: colors.primary,
        borderColor: colors.darkYellow,
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
          isLeader: false,
        },
      ]);
    }
  };

  const validateName = (name) => /^[A-Za-z ]{3,}$/.test(name.trim());
  const validateEgyptianPhoneNumber = (phone) =>
    /^01[0-2,5]{1}[0-9]{8}$/.test(phone);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateNationalId = (id) => /^\d{14}$/.test(id);

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

    // Team Name
    if (!teamName.trim()) {
      newErrors.teamName = "Team name is required.";
    } else if (teamName.trim().length < 3) {
      newErrors.teamName = "Team name must be at least 3 characters long.";
    }

    // University
    if (!university.trim()) {
      newErrors.university = "University is required.";
    } else if (university === "Other" && !otherUniversity.trim()) {
      newErrors.otherUniversity = "Please specify the university.";
    }

    // Faculty
    if (!faculty.trim()) {
      newErrors.faculty = "Faculty is required.";
    } else if (faculty.trim().length < 3) {
      newErrors.faculty = "Faculty must be at least 3 characters long.";
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

    // How Did You Know
    if (!howDidYouKnow.trim()) {
      newErrors.howDidYouKnow = "This field is required.";
    }

    // Community Partner
    if (howDidYouKnow === "Community Partner" && !communityPartner.trim()) {
      newErrors.communityPartner = "Please specify the community partner.";
    }

    // Set errors and check if the form is valid
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setTeamName("");
    setUniversity("");
    setOtherUniversity("");
    setFaculty("");
    setMembers([
      {
        id: 1,
        name: "",
        phone: "",
        email: "",
        nationalId: "",
        isLeader: true,
      },
    ]);
    setHowDidYouKnow("");
    setCommunityPartner("");
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

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(120deg, ${colors.primary}22, ${colors.accentYellow}33, ${colors.warmNeutral}22)`,
          backdropFilter: "blur(8px)",
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
          Spaghetti Bridge Competition
        </motion.h2>

        <motion.div
          className="h-1 w-24 mx-auto mb-8"
          style={{
            background: `linear-gradient(to right, ${colors.accentYellow}, ${colors.primary})`,
          }}
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ delay: 0.5, duration: 0.7 }}
        ></motion.div>

        {/* Team Name */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            Team Name *
          </label>
          <input
            type="text"
            placeholder="Enter your team name"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#FFD700] hover:shadow-md"
            style={{
              borderColor: colors.lightYellow,
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          {errors.teamName && (
            <p className="text-sm text-red-500 mt-1">{errors.teamName}</p>
          )}
        </motion.div>

        {/* University */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            University *
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#FFD700] hover:shadow-md"
            style={{
              borderColor: colors.lightYellow,
              color: colors.darkNeutral,
            }}
            value={university}
            onChange={(e) => {
              setUniversity(e.target.value);
              setOtherUniversity("");
            }}
            required
          >
            <option value="">Select University</option>
            {universities.map((uni, index) => (
              <option key={index}>{uni}</option>
            ))}
          </select>
          {university === "Other" && (
            <motion.div
              className="mt-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Specify university"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#FFD700] hover:shadow-md"
                style={{ borderColor: colors.lightYellow }}
                value={otherUniversity}
                onChange={(e) => setOtherUniversity(e.target.value)}
                required
              />
              {errors.otherUniversity && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.otherUniversity}
                </p>
              )}
            </motion.div>
          )}
          {errors.university && (
            <p className="text-sm text-red-500 mt-1">{errors.university}</p>
          )}
        </motion.div>

        {/* Faculty */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
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
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#FFD700] hover:shadow-md"
            style={{ borderColor: colors.lightYellow }}
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            required
          />
          {errors.faculty && (
            <p className="text-sm text-red-500 mt-1">{errors.faculty}</p>
          )}
        </motion.div>

        {/* Red Note */}
        <motion.div
          className="text-center text-sm text-red-500 pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            borderTop: `2px solid ${colors.lightYellow}`,
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
                color: index % 2 === 0 ? colors.primary : colors.accentYellow,
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#FFD700] hover:shadow-md"
                  style={{ borderColor: colors.lightYellow }}
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#FFD700] hover:shadow-md"
                  style={{ borderColor: colors.lightYellow }}
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#FFD700] hover:shadow-md"
                  style={{ borderColor: colors.lightYellow }}
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
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#FFD700] hover:shadow-md"
                  style={{ borderColor: colors.lightYellow }}
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
                {index === 0
                  ? "Additional for Leader"
                  : `Additional for Member #${index + 1}`}
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 rounded hover:border-[#8FB24C] hover:shadow-md"
                    style={{ color: colors.primary }}
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
                    className="form-checkbox h-5 w-5 rounded hover:border-[#8FB24C] hover:shadow-md"
                    style={{ color: colors.primary }}
                    checked={member.lunch}
                    onChange={(e) => handleLunchChange(index, e.target.checked)}
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
                background: `linear-gradient(to right, ${colors.primary}, ${colors.accentYellow})`,
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddMember}
            >
              Add Member
            </button>
          </motion.div>
        )}

        {/* How Did You Know */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.darkNeutral }}
          >
            How did you know about us? *
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all hover:border-[#FFD700] hover:shadow-md"
            style={{
              borderColor: colors.lightYellow,
              color: colors.darkNeutral,
            }}
            value={howDidYouKnow}
            onChange={(e) => {
              setHowDidYouKnow(e.target.value);
              setCommunityPartner("");
            }}
            required
          >
            <option value="">Select an option</option>
            <option>Facebook</option>
            <option>Instagram</option>
            <option>LinkedIn</option>
            <option>Community Partner</option>
            <option>Others</option>
          </select>
          {errors.howDidYouKnow && (
            <p className="text-sm text-red-500 mt-1">{errors.howDidYouKnow}</p>
          )}
          {howDidYouKnow === "Community Partner" && (
            <motion.div
              className="mt-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Please mention the community partner"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-300 hover:border-[#FFD700] hover:shadow-md"
                style={{ borderColor: colors.lightYellow }}
                value={communityPartner}
                onChange={(e) => setCommunityPartner(e.target.value)}
                required
              />
              {errors.communityPartner && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.communityPartner}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-lg transition-all"
          style={{
            background: `linear-gradient(to right, ${colors.primary}, ${colors.accentYellow})`,
            cursor: "pointer",
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            background: `linear-gradient(to right, ${colors.accentYellow}, ${colors.primary})`,
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

export default SpaghettiBridgeForm;
