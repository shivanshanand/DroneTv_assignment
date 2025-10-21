import React, { useState } from "react";
import { Check, Sparkles, Palette, Zap, Star, ArrowRight } from "lucide-react";

const TemplateSelection = ({ selectedTemplate, onTemplateSelect }) => {
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and professional design with smooth animations",
      features: ["Minimalist Layout", "Dark Mode", "Responsive"],
      color: "blue",
      gradient: "from-blue-500 to-indigo-600",
      icon: Zap,
      popular: true,
      preview: {
        header: "bg-gradient-to-r from-blue-500 to-indigo-500",
        sections: ["bg-blue-100 h-16", "bg-blue-50 h-10", "bg-blue-50 h-10"],
      },
    },
    {
      id: 2,
      name: "Creative Portfolio",
      description:
        "Bold and colorful design perfect for creative professionals",
      features: ["Vibrant Colors", "Animated", "Unique Layout"],
      color: "purple",
      gradient: "from-purple-500 to-pink-600",
      icon: Palette,
      popular: false,
      preview: {
        header: "bg-gradient-to-r from-purple-500 to-pink-500",
        sections: ["bg-purple-100 h-20", "bg-pink-50 h-8", "bg-pink-50 h-8"],
      },
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-4">
          <Star className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-600">
            Choose Your Style
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Select Your Perfect Template
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pick a stunning design that matches your personality. You can
          customize everything later.
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;
          const isHovered = hoveredTemplate === template.id;

          return (
            <div
              key={template.id}
              onClick={() => onTemplateSelect(template.id)}
              onMouseEnter={() => setHoveredTemplate(template.id)}
              onMouseLeave={() => setHoveredTemplate(null)}
              className={`
                relative cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden
                ${
                  isSelected
                    ? `border-${template.color}-500 shadow-2xl scale-[1.02]`
                    : "border-gray-200 hover:border-gray-300 hover:shadow-xl hover:scale-[1.01]"
                }
              `}
            >
              {/* Popular Badge */}
              {template.popular && (
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full shadow-lg text-xs font-bold">
                    <Sparkles className="w-3 h-3" />
                    <span>POPULAR</span>
                  </div>
                </div>
              )}

              {/* Selection Checkmark */}
              {isSelected && (
                <div className="absolute top-4 left-4 z-20">
                  <div
                    className={`flex items-center justify-center w-8 h-8 bg-gradient-to-br ${template.gradient} rounded-full shadow-lg animate-scale-in`}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  </div>
                </div>
              )}

              {/* Template Preview */}
              <div
                className={`
                relative bg-white p-6 transition-all duration-300
                ${isHovered ? "transform -translate-y-1" : ""}
              `}
              >
                {/* Preview Container */}
                <div className="relative bg-gray-50 rounded-xl overflow-hidden shadow-inner border border-gray-200">
                  {/* Preview Header */}
                  <div
                    className={`${template.preview.header} p-4 flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                      <div className="w-2 h-2 bg-white/70 rounded-full"></div>
                    </div>
                    <Icon className="w-5 h-5 text-white/90" />
                  </div>

                  {/* Preview Content */}
                  <div className="p-4 space-y-3">
                    {template.preview.sections.map((sectionClass, idx) => (
                      <div
                        key={idx}
                        className={`${sectionClass} rounded-lg animate-pulse`}
                        style={{ animationDelay: `${idx * 150}ms` }}
                      ></div>
                    ))}
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`
                    absolute inset-0 bg-gradient-to-br ${
                      template.gradient
                    } opacity-0 transition-opacity duration-300
                    ${isHovered ? "opacity-10" : ""}
                  `}
                  ></div>
                </div>

                {/* Template Info */}
                <div className="mt-6 space-y-4">
                  {/* Title & Icon */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className={`
                          px-3 py-1 text-xs font-medium rounded-full transition-all duration-200
                          ${
                            isSelected
                              ? `bg-gradient-to-r ${template.gradient} text-white shadow-md`
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }
                        `}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Select Button */}
                  <button
                    className={`
                      w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group
                      ${
                        isSelected
                          ? `bg-gradient-to-r ${template.gradient} text-white shadow-lg`
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    <span>{isSelected ? "Selected" : "Select Template"}</span>
                    {!isSelected && (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </div>

              {/* Selected Border Glow */}
              {isSelected && (
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${template.gradient} opacity-20 blur-xl -z-10 animate-pulse`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Text */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          Not sure which one to choose? You can always switch templates later!
        </p>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default TemplateSelection;
