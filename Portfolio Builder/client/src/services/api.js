import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// POST: Create a new portfolio
export const createPortfolio = async (portfolioData) => {
  try {
    const response = await api.post("/portfolios", portfolioData);
    return response.data;
  } catch (error) {
    console.error("Error creating portfolio:", error);
    throw error;
  }
};

// GET: Fetch all portfolios
export const getAllPortfolios = async () => {
  try {
    const response = await api.get("/portfolios");
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    throw error;
  }
};

// GET: Fetch a single portfolio by ID
export const getPortfolioById = async (id) => {
  try {
    // Validate ID before making request
    if (!id || id === "undefined") {
      throw new Error("Invalid portfolio ID");
    }
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    throw error;
  }
};

// PUT: Update a portfolio
export const updatePortfolio = async (id, portfolioData) => {
  try {
    if (!id || id === "undefined") {
      throw new Error("Invalid portfolio ID");
    }
    const response = await api.put(`/portfolios/${id}`, portfolioData);
    return response.data;
  } catch (error) {
    console.error("Error updating portfolio:", error);
    throw error;
  }
};

// GET: Filter portfolios by skills
export const filterPortfoliosBySkills = async (skills) => {
  try {
    const response = await api.get("/portfolios", {
      params: { skills: skills.join(",") },
    });
    return response.data;
  } catch (error) {
    console.error("Error filtering portfolios:", error);
    throw error;
  }
};

// GET: Filter portfolios by role
export const filterPortfoliosByRole = async (role) => {
  try {
    const response = await api.get("/portfolios", {
      params: { role },
    });
    return response.data;
  } catch (error) {
    console.error("Error filtering portfolios:", error);
    throw error;
  }
};

export default api;
