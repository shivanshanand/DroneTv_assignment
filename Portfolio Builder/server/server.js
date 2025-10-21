import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Portfolio Schema
const portfolioSchema = new mongoose.Schema(
  {
    templateId: Number,
    hero: {
      name: String,
      title: String,
      tagline: String,
      profileImage: String,
    },
    about: {
      bio: String,
      email: String,
      phone: String,
      location: String,
      socials: {
        linkedin: String,
        github: String,
        twitter: String,
      },
    },
    skills: [String],
    services: [
      {
        title: String,
        description: String,
      },
    ],
    portfolio: [
      {
        title: String,
        image: String,
        description: String,
      },
    ],
    testimonials: [
      {
        name: String,
        quote: String,
        company: String,
      },
    ],
    blog: {
      title: String,
      summary: String,
    },
    contact: {
      message: String,
      email: String,
      phone: String,
    },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// Routes
app.get("/api/portfolios", async (req, res) => {
  try {
    const portfolios = await Portfolio.find();
    res.json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/portfolios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid portfolio ID format" });
    }
    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/portfolios", async (req, res) => {
  try {
    const portfolio = new Portfolio(req.body);
    const savedPortfolio = await portfolio.save();
    res.status(201).json(savedPortfolio);
  } catch (error) {
    console.error("Error creating portfolio:", error);
    res.status(400).json({ message: error.message });
  }
});

app.put("/api/portfolios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid portfolio ID format" });
    }
    const portfolio = await Portfolio.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }
    res.json(portfolio);
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
