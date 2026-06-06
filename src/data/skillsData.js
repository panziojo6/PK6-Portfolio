export const categories = [
  {
    title: "Full-Stack Engineering",
    achievements: [
      "Designed scalable React + FastAPI architectures",
      "Built real-time GNSS dashboard with live map & data streams",
      "Created full-stack authentication systems",
      "Developed reusable design-system components",
    ],
  },
  {
    title: "Geospatial Intelligence",
    achievements: [
      "Automated Sentinel-2 SAVI/MNDWI pipelines",
      "Developed InSAR time-series profile API",
      "Built UBX parser & real-time NTRIP caster system",
      "GNSS→ESP32→TCP→Python→Web pipeline",
    ],
  },
  {
    title: "Machine Learning & Remote Sensing",
    achievements: [
      "Implemented sinusoidal phenology models",
      "Designed two-stage OCSVM classification pipeline",
      "Built crop classification ML system (rice/sugarcane)",
      "Migrated Random Forest → LSTM time-series model",
    ],
  },
];

export const metrics = [
  { label: "Satellite Pipelines", value: "12+" },
  { label: "Full-Stack Projects", value: "10+" },
  { label: "Years of Coding", value: "3+" },
  { label: "GNSS/NTRIP Systems", value: "6+" },
  { label: "Research Systems", value: "4" },
  { label: "IEEE Papers", value: "2" },
];

export const techStack = [
  /* Machine Learning */
  { icon: "🤖", name: "Machine Learning" }, { icon: "🧠", name: "Deep Learning" }, { icon: "🔮", name: "LSTM" }, { icon: "📈", name: "Time-Series" },
  /* GeoAI */
  { icon: "🛰️", name: "Sentinel-2" }, { icon: "📡", name: "InSAR" }, { icon: "🗺️", name: "Land-Use" }, { icon: "🌤️", name: "Phenology" }, { icon: "🧭", name: "Geo-Analytics" }, { icon: "🚜", name: "Crop Class." },
  /* GNSS */
  { icon: "📡", name: "GNSS" }, { icon: "🧭", name: "ZED-F9P" }, { icon: "📟", name: "UBX Parsing" },
  /* Cloud/Infra */
  { icon: "🐳", name: "Docker" }, { icon: "☁️", name: "AWS" }, { icon: "🚀", name: "GCP" }, { icon: "🔧", name: "CI/CD" }, { icon: "📦", name: "Kubernetes" }, { icon: "⏳", name: "Airflow ETL" },
  /* Frontend */
  { icon: "⚛️", name: "React" }, { icon: "⚡", name: "Vite" }, { icon: "🎨", name: "Framer" }, { icon: "🧩", name: "Design System" },
  /* Embedded/Langs */
  { icon: "⚙️", name: "IoT" }, { icon: "🐍", name: "Python" }, { icon: "🟨", name: "JavaScript" }, { icon: "📘", name: "C++" }, { icon: "🔵", name: "C" }, { icon: "☕", name: "Java" }, { icon: "🗄️", name: "SQL" },
];