import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  X,
  Users,
  Briefcase,
  Code,
  Loader2,
  RefreshCw,
  AlertCircle,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";
import ProfileCard from "../components/ProfileCard";
import { getAllPortfolios } from "../services/api";

const ProfessionalsList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState("");
  const [filterSkill, setFilterSkill] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  useEffect(() => {
    // Update active filters count
    const count = [filterRole, filterSkill].filter(Boolean).length;
    setActiveFiltersCount(count);

    // Apply filters whenever they change
    applyFilters();
  }, [filterRole, filterSkill, portfolios]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPortfolios();

      // Debug: Check if portfolios have IDs
      console.log(
        "Portfolio IDs:",
        data.map((p) => p.id || p._id)
      );

      setPortfolios(data);
      setFilteredPortfolios(data);
    } catch (err) {
      setError({
        message: err.message || "Failed to load portfolios. Please try again.",
        canRetry: true,
      });
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...portfolios];

    // Filter by role
    if (filterRole.trim()) {
      filtered = filtered.filter((portfolio) =>
        portfolio.hero.title.toLowerCase().includes(filterRole.toLowerCase())
      );
    }

    // Filter by skill
    if (filterSkill.trim()) {
      filtered = filtered.filter((portfolio) =>
        portfolio.skills.some((skill) =>
          skill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      );
    }

    setFilteredPortfolios(filtered);
  };

  const clearFilters = () => {
    setFilterRole("");
    setFilterSkill("");
    setFilteredPortfolios(portfolios);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <Users className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Loading Portfolios
            </h3>
            <p className="text-gray-600 mb-6">
              Discovering talented professionals...
            </p>

            <div className="flex justify-center gap-2">
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 text-center bg-gradient-to-br from-red-50 to-pink-50">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center bg-red-100">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Unable to Load Portfolios
              </h2>
              <p className="text-gray-600">{error.message}</p>
            </div>

            <div className="p-8 space-y-3">
              {error.canRetry && (
                <button
                  onClick={fetchPortfolios}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Try Again</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              {portfolios.length}+ Talented Professionals
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Portfolio Showcases
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through creative portfolios from talented professionals
            around the world
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          {/* Filter Toggle Button (Mobile) */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full px-4 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-between font-semibold text-gray-700 border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <span className="text-gray-400">{showFilters ? "▲" : "▼"}</span>
            </button>
          </div>

          {/* Filter Inputs */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block`}>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Role Filter */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Filter by Role
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., Developer, Designer"
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                    {filterRole && (
                      <button
                        onClick={() => setFilterRole("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Skill Filter */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Filter by Skill
                  </label>
                  <div className="relative">
                    <Code className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., React, Python"
                      value={filterSkill}
                      onChange={(e) => setFilterSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    />
                    {filterSkill && (
                      <button
                        onClick={() => setFilterSkill("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="flex items-end">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Clear All Filters</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filters */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-500" />
            <p className="text-gray-700 font-medium">
              Showing{" "}
              <span className="font-bold text-blue-600">
                {filteredPortfolios.length}
              </span>{" "}
              portfolio{filteredPortfolios.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Active Filter Pills */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {filterRole && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  <Briefcase className="w-3 h-3" />
                  {filterRole}
                  <button
                    onClick={() => setFilterRole("")}
                    className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterSkill && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                  <Code className="w-3 h-3" />
                  {filterSkill}
                  <button
                    onClick={() => setFilterSkill("")}
                    className="ml-1 hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Portfolios Grid */}
        {filteredPortfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredPortfolios.map((portfolio, index) => (
              <div
                key={portfolio._id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProfileCard portfolio={portfolio} />
              </div>
            ))}
          </div>
        ) : (
          // No Results State
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Portfolios Found
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any portfolios matching your filters. Try
                adjusting your search criteria.
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-0.5rem);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfessionalsList;
