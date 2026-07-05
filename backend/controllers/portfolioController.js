import Hero from "../models/Hero.js";
import About from "../models/About.js";
import Project from "../models/Project.js";
import Skill from "../models/Skill.js";
import Experience from "../models/Experience.js";
import ExperienceStat from "../models/ExperienceStat.js";
import ArchitectureNode from "../models/ArchitectureNode.js";
import Education from "../models/Education.js";
import Certificate from "../models/Certificate.js";
import AchievementStat from "../models/AchievementStat.js";
import Honor from "../models/Honor.js";
import Resume from "../models/Resume.js";
import Contact from "../models/Contact.js";
import Social from "../models/Social.js";

// Helper for single document upsert
const getSingleDoc = async (Model, defaultData = {}) => {
  let doc = await Model.findOne();
  if (!doc) {
    doc = await Model.create(defaultData);
  }
  return doc;
};

// Unified Portfolio Data API
export const getPortfolioData = async (req, res) => {
  try {
    const [
      hero,
      about,
      projects,
      skills,
      experience,
      experienceStats,
      architectureNodes,
      education,
      certificates,
      achievementStats,
      honors,
      resume,
      contact,
      socials,
    ] = await Promise.all([
      getSingleDoc(Hero),
      getSingleDoc(About),
      Project.find().sort({ createdAt: -1 }),
      Skill.find(),
      Experience.find().sort({ createdAt: 1 }),
      ExperienceStat.find(),
      ArchitectureNode.find().sort({ id: 1 }),
      Education.find().sort({ createdAt: -1 }),
      Certificate.find().sort({ createdAt: -1 }),
      AchievementStat.find(),
      Honor.find(),
      getSingleDoc(Resume, { url: "#" }),
      getSingleDoc(Contact, { email: "email@example.com", location: "Location, Earth" }),
      Social.find(),
    ]);

    res.json({
      hero,
      about,
      projects,
      skills,
      experience,
      experienceStats,
      architectureNodes,
      education,
      certificates,
      achievementStats,
      honors,
      resume,
      contact,
      socials,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio data", error: error.message });
  }
};

// --- CRUD Controllers Generic Generator ---
const makeSingleDocController = (Model) => ({
  get: async (req, res) => {
    try {
      const doc = await getSingleDoc(Model);
      res.json(doc);
    } catch (error) {
      res.status(500).json({ message: "Error fetching item", error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const doc = await Model.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(doc);
    } catch (error) {
      res.status(500).json({ message: "Error updating item", error: error.message });
    }
  }
});

const makeListController = (Model) => ({
  getAll: async (req, res) => {
    try {
      const items = await Model.find().sort({ createdAt: -1 });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error fetching item", error: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const item = await Model.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ message: "Error creating item", error: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const item = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Error updating item", error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const item = await Model.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ message: "Item not found" });
      res.json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error: error.message });
    }
  }
});

// Export controllers
export const heroController = makeSingleDocController(Hero);
export const aboutController = makeSingleDocController(About);
export const resumeController = makeSingleDocController(Resume);
export const contactController = makeSingleDocController(Contact);

export const projectController = makeListController(Project);
export const skillController = makeListController(Skill);
export const experienceController = makeListController(Experience);
export const experienceStatController = makeListController(ExperienceStat);
export const architectureNodeController = makeListController(ArchitectureNode);
export const educationController = makeListController(Education);
export const certificateController = makeListController(Certificate);
export const achievementStatController = makeListController(AchievementStat);
export const honorController = makeListController(Honor);
export const socialsController = makeListController(Social);
