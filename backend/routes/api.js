import express from "express";
import auth from "../middleware/auth.js";
import { login, verify } from "../controllers/authController.js";
import {
  getPortfolioData,
  heroController,
  aboutController,
  projectController,
  skillController,
  experienceController,
  experienceStatController,
  architectureNodeController,
  educationController,
  certificateController,
  achievementStatController,
  honorController,
  resumeController,
  contactController,
  socialsController,
} from "../controllers/portfolioController.js";

const router = express.Router();

// Auth Routes
router.post("/auth/login", login);
router.get("/auth/verify", auth, verify);

// Public Consolidated Data
router.get("/portfolio", getPortfolioData);

// Hero Routes
router.get("/hero", heroController.get);
router.put("/hero", auth, heroController.update);

// About Routes
router.get("/about", aboutController.get);
router.put("/about", auth, aboutController.update);

// Projects Routes
router.get("/projects", projectController.getAll);
router.get("/projects/:id", projectController.getOne);
router.post("/projects", auth, projectController.create);
router.put("/projects/:id", auth, projectController.update);
router.delete("/projects/:id", auth, projectController.delete);

// Skills Routes
router.get("/skills", skillController.getAll);
router.get("/skills/:id", skillController.getOne);
router.post("/skills", auth, skillController.create);
router.put("/skills/:id", auth, skillController.update);
router.delete("/skills/:id", auth, skillController.delete);

// Experience Routes
router.get("/experience", experienceController.getAll);
router.get("/experience/:id", experienceController.getOne);
router.post("/experience", auth, experienceController.create);
router.put("/experience/:id", auth, experienceController.update);
router.delete("/experience/:id", auth, experienceController.delete);

// Experience Stats Routes
router.get("/experience-stats", experienceStatController.getAll);
router.get("/experience-stats/:id", experienceStatController.getOne);
router.post("/experience-stats", auth, experienceStatController.create);
router.put("/experience-stats/:id", auth, experienceStatController.update);
router.delete("/experience-stats/:id", auth, experienceStatController.delete);

// Architecture Nodes Routes
router.get("/architecture-nodes", architectureNodeController.getAll);
router.get("/architecture-nodes/:id", architectureNodeController.getOne);
router.post("/architecture-nodes", auth, architectureNodeController.create);
router.put("/architecture-nodes/:id", auth, architectureNodeController.update);
router.delete("/architecture-nodes/:id", auth, architectureNodeController.delete);

// Education Routes
router.get("/education", educationController.getAll);
router.get("/education/:id", educationController.getOne);
router.post("/education", auth, educationController.create);
router.put("/education/:id", auth, educationController.update);
router.delete("/education/:id", auth, educationController.delete);

// Certificates Routes
router.get("/certificates", certificateController.getAll);
router.get("/certificates/:id", certificateController.getOne);
router.post("/certificates", auth, certificateController.create);
router.put("/certificates/:id", auth, certificateController.update);
router.delete("/certificates/:id", auth, certificateController.delete);

// Achievement Stats Routes
router.get("/achievement-stats", achievementStatController.getAll);
router.get("/achievement-stats/:id", achievementStatController.getOne);
router.post("/achievement-stats", auth, achievementStatController.create);
router.put("/achievement-stats/:id", auth, achievementStatController.update);
router.delete("/achievement-stats/:id", auth, achievementStatController.delete);

// Honors Routes
router.get("/honors", honorController.getAll);
router.get("/honors/:id", honorController.getOne);
router.post("/honors", auth, honorController.create);
router.put("/honors/:id", auth, honorController.update);
router.delete("/honors/:id", auth, honorController.delete);

// Resume Routes
router.get("/resume", resumeController.get);
router.put("/resume", auth, resumeController.update);

// Contact Routes
router.get("/contact", contactController.get);
router.put("/contact", auth, contactController.update);

// Socials Routes
router.get("/socials", socialsController.getAll);
router.get("/socials/:id", socialsController.getOne);
router.post("/socials", auth, socialsController.create);
router.put("/socials/:id", auth, socialsController.update);
router.delete("/socials/:id", auth, socialsController.delete);

export default router;
