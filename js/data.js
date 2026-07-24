/* Static data for the portfolio — edit freely, no build step. */

window.PORTFOLIO_DATA = {
  skills: [
    { name: "Python", value: 95 },
    { name: "FastAPI / Flask", value: 88 },
    { name: "PostgreSQL / SQLite", value: 85 },
    { name: "Firebase", value: 78 },
    { name: "JWT / Auth Systems", value: 83 },
    { name: "AI Dev Workflows", value: 88 },
  ],

  tools: [
    "Python", "FastAPI", "Flask", "PostgreSQL", "SQLite", "Firebase",
    "SQLAlchemy", "Pydantic", "Alembic", "JWT", "Gemini API",
    "Cursor", "Claude AI", "Copilot CLI", "Git", "Render",
  ],

  projects: [
    {
      title: "OmniSensus Medical",
      tag: "Clinical Backend",
      desc: "Production async REST API with FastAPI & Neon PostgreSQL. JWT auth, RBAC, 9 clinical domain routers, and an ML proxy for AI diagnostics and readmission risk scoring. Deployed on Render.",
      tech: ["FastAPI", "PostgreSQL", "JWT"],
      accent: "#ff0028",
      icon: "./assets/images/omnisensus.png",
      githubUrl: "https://github.com/itsparth-victor/OmniSensus-Backend",
    },
    {
      title: "AI Powered Chat-Bot",
      tag: "Full-Stack App",
      desc: "Full-stack chatbot with Flask backend and vanilla JS frontend. Real-time token streaming via Server-Sent Events (SSE), persistent SQLite chat history, and Google Gemini API integration.",
      tech: ["Flask", "SQLite", "Gemini API"],
      accent: "#c0c0ff",
      icon: "./assets/images/ai-chatbot-icon.png",
      githubUrl: "https://github.com/itsparth-victor/chat-bot",
    },
    {
      title: "Restaurant POS",
      tag: "Analytics System",
      desc: "Point of Sale system with admin login and product management. Sales analytics dashboard with trend visualization, automated PDF invoice generation, and structured CSV export.",
      tech: ["Python", "PDF Gen", "CSV"],
      accent: "#ff0028",
      icon: "./assets/images/restaurant-pos-icon.png",
      githubUrl: "https://github.com/itsparth-victor/Restaurant-POS-Analytics-Dashboard",
    },
  ],

  // Smaller subset for the info-grid "Projects" card.
  infoProjects: [
    { title: "OmniSensus Medical", desc: "Clinical Decision Support Backend with FastAPI", accent: "#ff0028", icon: "./assets/images/omnisensus.png", githubUrl: "https://github.com/itsparth-victor/OmniSensus-Backend" },
    { title: "AI Powered Chat-Bot", desc: "Real-time streaming chatbot with Gemini API",     accent: "#ffffff", icon: "./assets/images/ai-chatbot-icon.png", githubUrl: "https://github.com/itsparth-victor/chat-bot" },
    { title: "Restaurant POS",      desc: "POS system with analytics & PDF generation",     accent: "#ff0028", icon: "./assets/images/restaurant-pos-icon.png", githubUrl: "https://github.com/itsparth-victor/Restaurant-POS-Analytics-Dashboard" },
  ],
};
