import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  AlertCircle,
  RefreshCw,
  Home,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { getPortfolioById } from "../services/api";
import Template1 from "../components/Template1";
import Template2 from "../components/Template2";

const PortfolioPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (id && id !== "undefined") {
      fetchPortfolio();
    } else {
      setError({
        message: "Invalid portfolio ID provided",
        type: "not-found",
      });
      setLoading(false);
    }
  }, [id]);

  const fetchPortfolio = async () => {
    if (!id || id === "undefined") {
      return; // Early return if validation fails
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getPortfolioById(id);
      setPortfolio(data);
    } catch (err) {
      setError({
        message: err.message || "Failed to load portfolio. Please try again.",
        type: err.status === 404 ? "not-found" : "error",
      });
      console.error("Portfolio fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    fetchPortfolio();
  };

  // Loading State with Modern Spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Loading Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Animated Loader */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <Loader2 className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
            </div>

            {/* Loading Text */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Loading Portfolio
            </h3>
            <p className="text-gray-600 mb-6">Fetching the amazing work...</p>

            {/* Progress Dots */}
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

          {/* Loading Stats */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              This usually takes just a few seconds
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error State with Different Types
  if (error || !portfolio) {
    const isNotFound = error?.type === "not-found";

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          {/* Error Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Error Header with Icon */}
            <div
              className={`p-8 text-center ${
                isNotFound
                  ? "bg-gradient-to-br from-orange-50 to-red-50"
                  : "bg-gradient-to-br from-red-50 to-pink-50"
              }`}
            >
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  isNotFound ? "bg-orange-100" : "bg-red-100"
                }`}
              >
                {isNotFound ? (
                  <AlertCircle className="w-10 h-10 text-orange-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600" />
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isNotFound
                  ? "Portfolio Not Found"
                  : "Oops! Something Went Wrong"}
              </h2>
              <p className="text-gray-600">
                {error?.message || "Portfolio not found"}
              </p>
            </div>

            {/* Error Actions */}
            <div className="p-8 space-y-3">
              {!isNotFound && (
                <button
                  onClick={handleRetry}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                >
                  <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Try Again</span>
                </button>
              )}

              <button
                onClick={() => navigate("/browse")}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Go Home</span>
              </button>
            </div>

            {/* Retry Counter */}
            {retryCount > 0 && !isNotFound && (
              <div className="px-8 pb-6">
                <div className="text-center text-sm text-gray-500">
                  Attempt {retryCount + 1}
                </div>
              </div>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              {isNotFound
                ? "This portfolio may have been removed or doesn't exist."
                : "If the problem persists, please contact support."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Template Renderer
  const renderTemplate = () => {
    switch (portfolio.templateId) {
      case 1:
        return <Template1 data={portfolio} />;
      case 2:
        return <Template2 data={portfolio} />;
      default:
        return <Template1 data={portfolio} />;
    }
  };

  // Success State - Portfolio Display
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <button
              onClick={() => navigate("/browse")}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back</span>
            </button>

            {/* Portfolio Info Badge */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                {portfolio.hero?.name}'s Portfolio
              </span>
            </div>

            {/* Template Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-blue-700">
                Template {portfolio.templateId}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Content */}
      <div className="portfolio-content">{renderTemplate()}</div>

      {/* Scroll to Top Button (appears on scroll) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group opacity-0 hover:opacity-100 focus:opacity-100"
        style={{
          opacity:
            typeof window !== "undefined" && window.scrollY > 300 ? 1 : 0,
          pointerEvents:
            typeof window !== "undefined" && window.scrollY > 300
              ? "auto"
              : "none",
        }}
        aria-label="Scroll to top"
      >
        <ArrowLeft className="w-5 h-5 rotate-90 group-hover:-translate-y-1 transition-transform" />
      </button>

      <style>{`
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

export default PortfolioPage;
