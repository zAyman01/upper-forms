import React, { useState } from "react";
import { motion } from "framer-motion";

const colors = {
  primary: "#1A73E8",
  secondary: "#9C0D38",
  accent: "#FBBC05",
  error: "#EA4335",
  background: "#0A0F1F",
  text: "#FFFFFF",
  lightGray: "#E0E0E0",
  darkGray: "#2D2D2D",
};

const MemberForm = () => {
  const [teamName, setTeamName] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [leader, setLeader] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    nationalId: "",
    accommodation: false,
  });
  const [members, setMembers] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Team Name validation
    if (!teamName.trim()) newErrors.teamName = "Team Name is required.";
    else if (
      teamName.trim().length < 3 ||
      !/^[a-zA-Z0-9\s\-']+$/.test(teamName)
    ) {
      newErrors.teamName = "Invalid team name format.";
    }

    // University Name validation
    if (!universityName.trim())
      newErrors.universityName = "University Name is required.";
    else if (
      universityName.trim().length < 3 ||
      !/^[a-zA-Z0-9\s\-']+$/.test(universityName)
    ) {
      newErrors.universityName = "Invalid university name format.";
    }

    // Leader validation
    if (!leader.fullName.trim())
      newErrors.leaderFullName = "Leader's Full Name is required.";
    else if (
      leader.fullName.trim().length < 3 ||
      !/^[a-zA-Z\s\-']+$/.test(leader.fullName)
    ) {
      newErrors.leaderFullName =
        "Leader's Full Name should be at least 3 characters long.";
    }
    if (
      !leader.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leader.email)
    ) {
      newErrors.leaderEmail = "Invalid email format.";
    }
    if (
      !leader.whatsapp.trim() ||
      !/^01[0-2,5]{1}[0-9]{8}$/.test(leader.whatsapp)
    ) {
      newErrors.leaderWhatsapp = "Invalid Egyptian phone number.";
    }
    if (!leader.nationalId.trim() || !/^\d{14}$/.test(leader.nationalId)) {
      newErrors.leaderNationalId = "Invalid national ID.";
    }

    // Members validation
    members.forEach((member, index) => {
      if (!member.fullName.trim())
        newErrors[`member${index}FullName`] = "Member's Full Name is required.";
      else if (
        member.fullName.trim().length < 3 ||
        !/^[a-zA-Z\s\-']+$/.test(member.fullName)
      ) {
        newErrors[`member${index}FullName`] =
          "Member's Full Name should be at least 3 characters long.";
      }
      if (
        !member.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)
      ) {
        newErrors[`member${index}Email`] = "Invalid email format.";
      }
      if (
        !member.whatsapp.trim() ||
        !/^01[0-2,5]{1}[0-9]{8}$/.test(member.whatsapp)
      ) {
        newErrors[`member${index}Whatsapp`] = "Invalid Egyptian phone number.";
      }
      if (!member.nationalId.trim() || !/^\d{14}$/.test(member.nationalId)) {
        newErrors[`member${index}NationalId`] = "Invalid national ID.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const addMember = () => {
    if (members.length < 2) {
      setMembers([
        ...members,
        {
          fullName: "",
          email: "",
          whatsapp: "",
          nationalId: "",
          accommodation: false,
        },
      ]);
    }
  };

  const removeMember = (index) => {
    const updatedMembers = members.filter((_, i) => i !== index);
    setMembers(updatedMembers);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleAccommodationChange = (index, isLeader = false) => {
    const selectedCount =
      members.filter((m) => m.accommodation).length +
      (leader.accommodation ? 1 : 0);
    if (selectedCount >= 2 && !isLeader && !members[index].accommodation)
      return;
    if (isLeader) {
      setLeader({ ...leader, accommodation: !leader.accommodation });
    } else {
      handleMemberChange(index, "accommodation", !members[index].accommodation);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      setTeamName("");
      setUniversityName("");
      setLeader({
        fullName: "",
        email: "",
        whatsapp: "",
        nationalId: "",
        accommodation: false,
      });
      setMembers([]);
      setErrors({});
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: colors.background }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Cybersecurity-themed background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Binary code animation */}
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sm font-mono opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: colors.text,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}

        {/* Shield icon */}
        <motion.div
          className="absolute text-6xl opacity-20"
          style={{
            left: "10%",
            top: "20%",
            color: colors.primary,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🛡️
        </motion.div>

        {/* Lock icon */}
        <motion.div
          className="absolute text-6xl opacity-20"
          style={{
            right: "10%",
            bottom: "20%",
            color: colors.secondary,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🔒
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}22, ${colors.secondary}33, ${colors.background}22)`,
        }}
      ></div>

      <motion.form
        className="relative bg-[#1E1E1E] p-8 rounded-xl shadow-2xl space-y-6 z-10 my-12"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ borderTop: `5px solid ${colors.primary}` }}
        onSubmit={handleSubmit}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center"
          style={{ color: colors.text }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          CTF Team Registration
        </motion.h2>

        <motion.div
          className="h-1 w-24 mx-auto mb-8 rounded-xl"
          style={{
            background: colors.primary,
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
            style={{ color: colors.text }}
          >
            Team Name *
          </label>
          <input
            type="text"
            placeholder="Enter your team name"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
            style={{
              borderColor: colors.darkGray,
              background: colors.lightGray,
            }}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          {errors.teamName && (
            <p className="text-sm text-red-500 mt-1">{errors.teamName}</p>
          )}
        </motion.div>

        {/* University Name */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label
            className="block text-sm font-medium mb-1"
            style={{ color: colors.text }}
          >
            University Name *
          </label>
          <input
            type="text"
            placeholder="Enter your university name"
            className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
            style={{
              borderColor: colors.darkGray,
              background: colors.lightGray,
            }}
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
            required
          />
          {errors.universityName && (
            <p className="text-sm text-red-500 mt-1">{errors.universityName}</p>
          )}
        </motion.div>

        {/* Leader Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text }}
          >
            Leader Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.text }}
              >
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Enter leader's full name"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
                style={{
                  borderColor: colors.darkGray,
                  background: colors.lightGray,
                }}
                value={leader.fullName}
                onChange={(e) =>
                  setLeader({ ...leader, fullName: e.target.value })
                }
                required
              />
              {errors.leaderFullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.leaderFullName}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.text }}
              >
                Email *
              </label>
              <input
                type="email"
                placeholder="Enter leader's email"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
                style={{
                  borderColor: colors.darkGray,
                  background: colors.lightGray,
                }}
                value={leader.email}
                onChange={(e) =>
                  setLeader({ ...leader, email: e.target.value })
                }
                required
              />
              {errors.leaderEmail && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.leaderEmail}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.text }}
              >
                WhatsApp Number *
              </label>
              <input
                type="tel"
                placeholder="Enter leader's WhatsApp number"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
                style={{
                  borderColor: colors.darkGray,
                  background: colors.lightGray,
                }}
                value={leader.whatsapp}
                onChange={(e) =>
                  setLeader({ ...leader, whatsapp: e.target.value })
                }
                required
              />
              {errors.leaderWhatsapp && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.leaderWhatsapp}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: colors.text }}
              >
                National ID *
              </label>
              <input
                type="text"
                placeholder="Enter leader's national ID"
                className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
                style={{
                  borderColor: colors.darkGray,
                  background: colors.lightGray,
                }}
                value={leader.nationalId}
                onChange={(e) =>
                  setLeader({ ...leader, nationalId: e.target.value })
                }
                required
              />
              {errors.leaderNationalId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.leaderNationalId}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 rounded hover:border-[#1A73E8] hover:shadow-md"
                style={{ color: colors.primary }}
                checked={leader.accommodation}
                onChange={() => handleAccommodationChange(0, true)}
              />
              <span className="ml-2" style={{ color: colors.text }}>
                Accommodation (free for 2 members)
              </span>
            </label>
          </div>
        </motion.div>

        {/* Additional Members */}
        {members.map((member, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="space-y-4 pt-4"
            style={{ borderTop: `2px solid ${colors.lightGray}` }}
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text }}
            >
              Member {index + 1}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.text }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter member's full name"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
                  style={{
                    borderColor: colors.darkGray,
                    background: colors.lightGray,
                  }}
                  value={member.fullName}
                  onChange={(e) =>
                    handleMemberChange(index, "fullName", e.target.value)
                  }
                  required
                />
                {errors[`member${index}FullName`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`member${index}FullName`]}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.text }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter member's email"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
                  style={{
                    borderColor: colors.darkGray,
                    background: colors.lightGray,
                  }}
                  value={member.email}
                  onChange={(e) =>
                    handleMemberChange(index, "email", e.target.value)
                  }
                  required
                />
                {errors[`member${index}Email`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`member${index}Email`]}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.text }}
                >
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter member's WhatsApp number"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
                  style={{
                    borderColor: colors.darkGray,
                    background: colors.lightGray,
                  }}
                  value={member.whatsapp}
                  onChange={(e) =>
                    handleMemberChange(index, "whatsapp", e.target.value)
                  }
                  required
                />
                {errors[`member${index}Whatsapp`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`member${index}Whatsapp`]}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.text }}
                >
                  National ID *
                </label>
                <input
                  type="text"
                  placeholder="Enter member's national ID"
                  className="w-full px-4 py-2 border rounded-lg outline-none transition-all placeholder:text-gray-800 hover:border-[#1A73E8] hover:shadow-md"
                  style={{
                    borderColor: colors.darkGray,
                    background: colors.lightGray,
                  }}
                  value={member.nationalId}
                  onChange={(e) =>
                    handleMemberChange(index, "nationalId", e.target.value)
                  }
                  required
                />
                {errors[`member${index}NationalId`] && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors[`member${index}NationalId`]}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded hover:border-[#1A73E8] hover:shadow-md"
                  style={{ color: colors.primary }}
                  checked={member.accommodation}
                  onChange={() => handleAccommodationChange(index)}
                />
                <span className="ml-2" style={{ color: colors.text }}>
                  Accommodation (free for 2 members)
                </span>
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-red-500 hover:text-red-700"
              onClick={() => removeMember(index)}
            >
              Remove Member
            </button>
          </motion.div>
        ))}

        {/* Add Member Button */}
        {members.length < 2 && (
          <button
            type="button"
            className=" p-2 font-semibold rounded-lg transition-all bg-[#E0E0E0] text-[#2D2D2D] hover:bg-[transparent] hover:text-[#E0E0E0]"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              background: colors.primary, // Updated hover gradient
            }}
            onClick={addMember}
          >
            Add Member
          </button>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full py-3 text-white font-semibold rounded-lg transition-all"
          style={{
            background: colors.primary, // Updated gradient
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            background: "#0f4285", // Updated hover gradient
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

export default MemberForm;
