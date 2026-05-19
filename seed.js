require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("../models/Project");

const projects = [
  {
    title: "Kisan Mitra",
    description: "AI-powered crop advisory system helping farmers with smart agriculture decisions. Built as an IoT prototype.",
    techStack: ["Python", "AI/ML", "IoT", "Vercel"],
    category: "ml",
    liveUrl: "https://kisan-mitra-gdg.vercel.app",
    githubUrl: "",
    featured: true,
    order: 1,
  },
  {
    title: "Multimodal Emotion Recognition",
    description: "Web-based interface that detects facial emotions in real time using webcam input and a deep learning model.",
    techStack: ["Python", "PyTorch", "OpenCV", "Streamlit", "Librosa"],
    category: "ml",
    liveUrl: "",
    githubUrl: "https://github.com/kadagalasandeep",
    featured: true,
    order: 2,
  },
  {
    title: "E-Commerce Website",
    description: "Responsive e-commerce platform for product browsing and online purchasing with cart and smooth UI.",
    techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
    category: "web",
    liveUrl: "https://framegifts.netlify.app/",
    githubUrl: "",
    featured: true,
    order: 3,
  },
  {
    title: "Golden Black Café Website",
    description: "Local business platform for a café — featuring menu, location, and contact details with a clean design.",
    techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
    category: "web",
    liveUrl: "https://goldenblackcafe.netlify.app/",
    githubUrl: "",
    featured: false,
    order: 4,
  },
  {
    title: "IoT Education Guide",
    description: "Student resource website covering IoT concepts, tutorials, and project ideas for beginners.",
    techStack: ["HTML", "CSS", "JavaScript", "Netlify"],
    category: "web",
    liveUrl: "https://iotkingguide.netlify.app/",
    githubUrl: "",
    featured: false,
    order: 5,
  },
  {
    title: "Smart Agriculture Monitoring System",
    description: "IoT-based system to track soil moisture, temperature, and humidity for real-time smart farming.",
    techStack: ["IoT Sensors", "Microcontroller", "Embedded C"],
    category: "iot",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 6,
  },
  {
    title: "Smart Irrigation System",
    description: "Automated irrigation that waters crops based on soil moisture levels — reducing water wastage.",
    techStack: ["Soil Moisture Sensor", "IoT Modules", "Microcontroller"],
    category: "iot",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 7,
  },
  {
    title: "RFID Smart Identification System",
    description: "RFID-based access and identification system for incubation center with secure tracking.",
    techStack: ["RFID Module", "Microcontroller", "Embedded Programming"],
    category: "iot",
    liveUrl: "",
    githubUrl: "",
    featured: false,
    order: 8,
  },
  {
    title: "Fire Fighting Robot",
    description: "Autonomous robot that detects and extinguishes small fires using flame sensors and motor control.",
    techStack: ["Arduino", "Flame Sensors", "Motor Drivers"],
    category: "iot",
    liveUrl: "",
    githubUrl: "https://github.com/kadagalasandeep",
    featured: false,
    order: 9,
  },
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/sandeep-portfolio"
    );
    console.log("✅ Connected to MongoDB");

    await Project.deleteMany({});
    console.log("🗑️  Cleared old projects");

    const created = await Project.insertMany(projects);
    console.log(`🌱 Seeded ${created.length} projects for Kadagala Sandeep`);

    await mongoose.disconnect();
    console.log("✅ Done! Now run: npm run dev");
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();