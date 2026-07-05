import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
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

dotenv.config();

const seed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log("Connecting to Database to seed default data...");
    await mongoose.connect(mongoUri);
    console.log("Connected successfully!");

    // 1. Clear existing collections
    console.log("Cleaning existing database collections...");
    await Promise.all([
      User.deleteMany({}),
      Hero.deleteMany({}),
      About.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
      ExperienceStat.deleteMany({}),
      ArchitectureNode.deleteMany({}),
      Education.deleteMany({}),
      Certificate.deleteMany({}),
      AchievementStat.deleteMany({}),
      Honor.deleteMany({}),
      Resume.deleteMany({}),
      Contact.deleteMany({}),
      Social.deleteMany({}),
    ]);
    console.log("Database cleared!");

    // 2. Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword123";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({
      username: adminUsername,
      password: hashedPassword,
    });
    console.log(`Admin user created: "${adminUsername}"`);

    // 3. Seed Hero Section
    await Hero.create({
      name: "Chitranshu Yadav",
      subtitle: "Java Full Stack Developer | AI & Backend Engineer",
      description: "Passionate software engineer focused on scalable backend architecture, AI-powered applications, and modern full-stack development. Building production-ready, distributed SaaS platforms.",
      profileImage: "", // starts empty, user can upload via CMS
      phrases: [
        "Building scalable AI SaaS platforms",
        "Developing distributed backend systems",
        "Engineering modern full-stack experiences",
        "Integrating AI into real-world products"
      ]
    });
    console.log("Hero section seeded!");

    // 4. Seed About Section
    await About.create({
      storyTitle: "Engineering & Foundations",
      storyBody: "Currently pursuing my degree in Computer Science Engineering. My academic foundation is deeply intertwined with practical, real-world development, focusing on backend efficiency and robust full-stack pipelines.\n\nI have a strong affinity for distributed systems, database optimization, and cloud scalability. I build code that holds up under pressure—testing microservices and building platforms meant to serve real traffic.",
      storySubTitle: "Global Ambitions",
      storySubBody: "With a strong command of modern backend frameworks and cloud architectures, I am actively targeting international remote engineering roles, product-based tech firms, and high-growth AI startups.",
      storyTags: ["Remote Teams", "AI Startups", "Global Scale"],
      highlights: [
        {
          title: "Java Full Stack",
          desc: "Robust experience building end-to-end applications combining Java backends with modern React frontend setups.",
          icon: "Cpu",
          color: "border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/10"
        },
        {
          title: "Spring Boot",
          desc: "Advanced backend engineering including Spring MVC, Spring Security (JWT), Spring Data JPA, and RESTful web services.",
          icon: "Server",
          color: "border-cyan-500/20 hover:border-cyan-500/50 hover:shadow-cyan-500/10"
        },
        {
          title: "AI Systems",
          desc: "Integrating Large Language Models using Spring AI, LangChain, RAG frameworks, OpenAI, and Gemini APIs.",
          icon: "Brain",
          color: "border-pink-500/20 hover:border-pink-500/50 hover:shadow-pink-500/10"
        },
        {
          title: "Kubernetes & Cloud",
          desc: "Deploying microservices to Kubernetes clusters, containerizing with Docker, and setting up autoscaling architecture.",
          icon: "Network",
          color: "border-blue-500/20 hover:border-blue-500/50 hover:shadow-blue-500/10"
        },
        {
          title: "Cloud-native Development",
          desc: "Building highly available, resilient, and fault-tolerant cloud systems utilizing CI/CD pipelines (GitHub Actions).",
          icon: "Cloud",
          color: "border-teal-500/20 hover:border-teal-500/50 hover:shadow-teal-500/10"
        },
        {
          title: "SaaS Architecture",
          desc: "Engineering multi-tenant database architectures, payment integrations (Razorpay), and scalable transaction logs.",
          icon: "Layers",
          color: "border-amber-500/20 hover:border-amber-500/50 hover:shadow-amber-500/10"
        }
      ]
    });
    console.log("About section seeded!");

    // 5. Seed Skills Section
    await Skill.create([
      {
        category: "Backend Architecture",
        icon: "Server",
        skills: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "JWT", "REST APIs", "Microservices"],
        accent: "rgba(170, 59, 255, 0.4)",
        glow: "shadow-[0_0_20px_rgba(170,59,255,0.15)]"
      },
      {
        category: "Frontend Development",
        icon: "Code",
        skills: ["React.js", "Redux Toolkit", "Tailwind CSS", "JavaScript (ES6+)", "HTML5", "CSS3"],
        accent: "rgba(6, 182, 212, 0.4)",
        glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]"
      },
      {
        category: "Databases & Storage",
        icon: "Database",
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Spring Data JPA", "SQL Tuning"],
        accent: "rgba(16, 185, 129, 0.4)",
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]"
      },
      {
        category: "Cloud & DevOps",
        icon: "Cloud",
        skills: ["Docker", "Kubernetes", "CI/CD Pipelines", "GitHub Actions", "Nginx"],
        accent: "rgba(59, 130, 246, 0.4)",
        glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]"
      },
      {
        category: "AI & Integrations",
        icon: "Brain",
        skills: ["OpenAI API", "Gemini API", "LangChain", "RAG Framework", "Twilio API", "Razorpay Payment", "Cloudinary"],
        accent: "rgba(236, 72, 153, 0.4)",
        glow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]"
      },
      {
        category: "Tools & Workflow",
        icon: "Terminal",
        skills: ["Git", "GitHub", "Postman", "Swagger UI", "IntelliJ IDEA", "VS Code", "Grafana", "Maven"],
        accent: "rgba(245, 158, 11, 0.4)",
        glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]"
      }
    ]);
    console.log("Skills seeded!");

    // 6. Seed Experience Section
    await Experience.create({
      title: "Full Stack Developer",
      company: "Fakhri IT Services Pvt. Ltd.",
      duration: "2024 - Present",
      achievements: [
        "Engineered and deployed a multi-tenant e-commerce SaaS architecture using Spring Boot and React.",
        "Designed and developed highly secure JWT-based stateless authentication filters and permission hierarchies.",
        "Optimized PostgreSQL queries, indexing patterns, and connection pools, reducing data retrieval latency by 35%.",
        "Integrated Razorpay gateway with secure webhook processing and automated reconciliation pipelines.",
        "Containerized application components with Docker and established automated staging deployments using GitHub Actions.",
        "Integrated Spring AI to power a travel destination recommendation engine and customer support chatbot."
      ]
    });

    await ExperienceStat.create([
      { label: "API Latency Red.", end: 35, suffix: "%", desc: "PostgreSQL query tuning & caching" },
      { label: "SaaS Tenants", end: 10, suffix: "+", desc: "Multi-tenant database schema isolation" },
      { label: "AI Recommendations", end: 98, suffix: "%", desc: "Accuracy on user profiling queries" },
      { label: "Deployment Speed", end: 3, suffix: "x", desc: "Automated GitHub Actions pipelines" }
    ]);

    await ArchitectureNode.create([
      { id: 1, label: "React Frontend", type: "front", desc: "Client SPA with state management", details: ["SPA created with React and styled with Tailwind CSS.", "Uses global context and Axios hooks for API requests.", "Optimized bundle size & lazy loading."] },
      { id: 2, label: "JWT Gatekeeper", type: "sec", desc: "Stateless security & token validation", details: ["Security filter verifying incoming headers for signed JWTs.", "Role-based request interceptors with CORS protection.", "Handles authentication state stateless-ly."] },
      { id: 3, label: "Spring Boot App", type: "back", desc: "Scalable REST APIs & MVC Logic", details: ["Built with Spring Boot 3.x and MVC router schemas.", "Implements transaction boundaries and custom exceptions.", "Dockerized for scalable orchestrations."] },
      { id: 4, label: "PostgreSQL Db", type: "db", desc: "Optimized relational multi-tenant schemas", details: ["Multi-tenant tenant schema resolver using custom connection pools.", "Database indexing, vacuuming, and transaction isolation levels.", "Reduced complex query times by 35%."] },
      { id: 5, label: "Spring AI Core", type: "ai", desc: "OpenAI/Gemini LLM Orchestrator", details: ["Uses Spring AI framework to orchestrate LLM integrations.", "Implements Retrieval-Augmented Generation (RAG) vector stores.", "Streams response text using SSE protocols."] }
    ]);
    console.log("Experience section seeded!");

    // 7. Seed Projects Section
    await Project.create([
      {
        title: "AI Code Generation SaaS",
        category: "AI & Distributed Systems",
        tech: ["Spring Boot", "Spring AI", "React.js", "Kubernetes", "Docker", "SSE Streaming"],
        desc: "A multi-tenant SaaS platform that generates fully operational backend/frontend files in real-time, capable of autoscaling under heavy request volumes.",
        architecture: "React SPA client -> Kubernetes Ingress -> Spring Boot Backend running Spring AI -> OpenAI/Gemini APIs. PostgreSQL stores tenants' context. Kubernetes Horizontal Pod Autoscaler handles peaks.",
        achievements: [
          "Engineered real-time server-sent events (SSE) to stream generated code tokens dynamically.",
          "Optimized Docker container sizes and startup time, enabling Kubernetes pod replication in under 4 seconds.",
          "Tested architecture to sustain 50,000+ code requests/day with multi-tenant rate limits."
        ],
        github: "https://github.com/Chitranshu2411/CodeNova-AI",
        live: "",
        glowColor: "hover:border-purple-500/50 hover:shadow-purple-500/10"
      },
      {
        title: "Dr. Jivika — AI Healthcare",
        category: "Healthcare & AI Assistant",
        tech: ["React.js", "Spring Boot", "MySQL", "Tailwind CSS", "OpenAI Chat API"],
        desc: "An intelligent healthcare coordinator system that processes symptoms, maps consultations, and automates patient dashboard operations.",
        architecture: "React Client -> REST Controller -> Spring Security -> Chatbot Symptom Analysis Service -> MySQL DB for booking and medical records.",
        achievements: [
          "Designed an AI-powered diagnostic chatbot using OpenAI models to parse natural language health symptoms.",
          "Developed a real-time doctor appointment scheduler with conflict resolution rules and email templates.",
          "Implemented a secure medicine inventory ordering system with instant checkout."
        ],
        github: "https://github.com/Chitranshu2411/Dr.-Jivika-",
        live: "",
        glowColor: "hover:border-cyan-500/50 hover:shadow-cyan-500/10"
      },
      {
        title: "SkillSensei — AI Career & Learning Platform",
        category: "EdTech & Career Guidance",
        tech: ["React.js", "Spring Boot", "Spring AI", "PostgreSQL", "Spring Security", "JWT", "TailwindCSS"],
        desc: "An AI-powered career guidance and learning platform that helps students discover career paths, generate personalized learning roadmaps, analyze resumes, and prepare for interviews through intelligent recommendations.",
        architecture: "React Frontend -> JWT Authentication -> Spring Boot REST APIs -> Spring AI Service Layer -> PostgreSQL Database -> Gemini/OpenAI LLMs.",
        achievements: [
          "Built an AI-powered career assistant providing personalized career recommendations, skill-gap analysis, and roadmap generation.",
          "Integrated LLM-based chatbot capabilities for resume feedback, interview preparation, and learning guidance using Spring AI.",
          "Developed secure JWT authentication, role-based access control, and scalable REST APIs with Spring Boot and PostgreSQL.",
          "Designed responsive dashboards and learning modules with React.js and TailwindCSS, delivering a modern user experience."
        ],
        github: "https://github.com/Chitranshu2411/SKILL-SENSEI-PROJECT",
        live: "",
        glowColor: "hover:border-pink-500/50 hover:shadow-pink-500/10"
      },
      {
        title: "YatraAI — Smart Travel Planner",
        category: "AI Travel Engine",
        tech: ["React.js", "Spring Boot", "PostgreSQL", "Tailwind CSS", "Spring AI"],
        desc: "A smart itinerary generator that processes budgets, travel timelines, and preferences to draft custom, interactive maps.",
        architecture: "React Dashboard -> Spring Boot Web MVC Client -> Gemini Model Endpoint -> PostgreSQL Geolocation index.",
        achievements: [
          "Designed a responsive dashboard featuring weather data widgets and destination maps.",
          "Programmed structured Prompt Templates in Spring AI to ensure output conforms to standard JSON maps.",
          "Optimized itinerary calculation times by caching frequent routes inside PostgreSQL memory stores."
        ],
        github: "",
        live: "",
        glowColor: "hover:border-amber-500/50 hover:shadow-amber-500/10"
      }
    ]);
    console.log("Projects seeded!");

    // 8. Seed Education Section
    await Education.create({
      school: "Bhopal Engineering College",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      duration: "2022 - 2026",
      details: "Pursuing degree with focus on algorithm design, cloud computing, and database management. Actively participating in national hackathons and coding societies."
    });
    console.log("Education seeded!");

    // 9. Seed Certificates Section
    await Certificate.create([
      {
        name: "Java SE Developer Certification",
        issuer: "Oracle",
        date: "2023",
        image: "",
        link: ""
      },
      {
        name: "Spring Boot Microservices Framework",
        issuer: "Udemy",
        date: "2024",
        image: "",
        link: ""
      }
    ]);
    console.log("Certificates seeded!");

    // 10. Seed Achievements & Stats
    await AchievementStat.create([
      {
        title: "DSA Solved",
        end: 300,
        suffix: "+",
        icon: "Code2",
        desc: "Problems solved across LeetCode & GFG platforms.",
        colors: ["#aa3bff", "#8b5cf6"]
      },
      {
        title: "LeetCode Streak",
        end: 100,
        suffix: "+ Days",
        icon: "Flame",
        desc: "Daily consistent code submissions.",
        colors: ["#ea580c", "#f97316"]
      },
      {
        title: "GitHub Commits",
        end: 2700,
        suffix: "+",
        icon: "GitCommit",
        desc: "Version controller contribution updates.",
        colors: ["#06b6d4", "#3b82f6"]
      },
      {
        title: "Repositories",
        end: 45,
        suffix: "+",
        icon: "FolderGit",
        desc: "Public and private codebase repositories.",
        colors: ["#10b981", "#059669"]
      },
      {
        title: "Pull Requests",
        end: 200,
        suffix: "+",
        icon: "GitPullRequest",
        desc: "Merged contributions and features.",
        colors: ["#ec4899", "#f43f5e"]
      }
    ]);

    await Honor.create([
      {
        title: "Smart India Hackathon (SIH) Finalist",
        desc: "Ranked amongst the nation's top candidates. Selected for final stages of India's biggest digital product hackathon solving real government problem statements.",
        badge: "National Finalist",
        color: "from-purple-500/10 to-indigo-500/5 border-purple-500/20 text-purple-400"
      },
      {
        title: "IIT Bombay Techfest Selection",
        desc: "Selected to participate in competitive programming hacks and technical challenges held at the prestigious Indian Institute of Technology Bombay.",
        badge: "Selected Competitor",
        color: "from-cyan-500/10 to-blue-500/5 border-cyan-500/20 text-cyan-400"
      }
    ]);
    console.log("Achievements section honors seeded!");

    // 11. Seed Resume
    await Resume.create({
      url: "#"
    });
    console.log("Resume link seeded!");

    // 12. Seed Contact Info
    await Contact.create({
      email: "chitranshu2411@gmail.com",
      location: "Bhopal, Madhya Pradesh, India",
    });
    console.log("Contact details seeded!");

    // 13. Seed Socials Links
    await Social.create([
      { platform: "GitHub", url: "https://github.com/Chitranshu2411" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/chitranshu-yadav/" },
      { platform: "LeetCode", url: "https://leetcode.com/u/Chitranshu2411/" },
      { platform: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/profile/chitranshu07" }
    ]);
    console.log("Social networks seeded!");

    console.log("================================================");
    console.log("DATABASE SEEDING COMPLETED SUCCESSFULLY!");
    console.log("================================================");
    process.exit(0);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  }
};

seed();
