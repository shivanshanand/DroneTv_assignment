import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const ProfileCard = ({ portfolio }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "NA"
    );
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Gradient Background Decoration */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 opacity-90"></div>

      {/* Floating Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg text-xs font-semibold text-indigo-600 border border-indigo-100">
          <Sparkles className="w-3 h-3" />
          <span>Pro</span>
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="relative pt-8 pb-4 flex justify-center">
        <div className="relative">
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 animate-pulse"></div>

          {/* Image Container */}
          <div className="relative w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            {!imageError && portfolio.hero.profileImage ? (
              <img
                src={portfolio.hero.profileImage}
                alt={portfolio.hero.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
                {getInitials(portfolio.hero.name)}
              </div>
            )}
          </div>

          {/* Status Indicator */}
          <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-white shadow-lg">
            <div className="w-full h-full bg-green-400 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 pb-6 space-y-4">
        {/* Name & Title */}
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {portfolio.hero.name}
          </h3>
          <p className="text-sm font-medium text-indigo-600 bg-indigo-50 inline-block px-3 py-1 rounded-full">
            {portfolio.hero.title}
          </p>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 text-center">
          {portfolio.about.bio}
        </p>

        {/* Skills Preview */}
        {portfolio.skills && portfolio.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {portfolio.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                {skill}
              </span>
            ))}
            {portfolio.skills.length > 3 && (
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg">
                +{portfolio.skills.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 pt-4"></div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-2">
          {portfolio.about.socials.linkedin && (
            <a
              href={portfolio.about.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-200"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {portfolio.about.socials.github && (
            <a
              href={portfolio.about.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-900 hover:text-white hover:scale-110 transition-all duration-200"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {portfolio.about.socials.twitter && (
            <a
              href={portfolio.about.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 rounded-lg hover:bg-sky-500 hover:text-white hover:scale-110 transition-all duration-200"
              title="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* View Portfolio Button */}
        <button
          onClick={() => navigate(`/portfolio/${portfolio._id}`)}
          className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
        >
          <span>View Portfolio</span>
          <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/10 to-indigo-400/10"></div>
      </div>
    </div>
  );
};

export default ProfileCard;
