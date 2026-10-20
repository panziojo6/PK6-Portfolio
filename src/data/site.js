// Content for the redesigned portfolio.
// Projects still live in projectsData.js.

export const profile = {
  name: ["Punnawit", "Kotosri"],
  role: "Geospatial engineer",
  location: "Bangkok, Thailand",
  email: "punnawit.kot@ku.th",
  linkedin: "https://www.linkedin.com/in/punnawit-kotosri-475406306",
  intro:
    "I work where satellite data meets software: classifying crops from Sentinel-2 time series, building real-time GNSS systems on low-cost hardware, and turning the results into tools people outside the lab can use.",
};

export const education = [
  {
    when: "2024",
    degree: "Bachelor of Engineering",
    school: "Kasetsart University, Bangkok",
  },
  {
    when: "2026",
    degree: "Master of Engineering",
    school: "Kasetsart University, Bangkok",
  },
  {
    when: "Next",
    degree: "PhD, Space Engineering",
    school: "Moscow State University, Russian Government Scholarship",
  },
];

export const stackGroups = [
  {
    group: "Machine learning",
    items: ["Machine learning", "Deep learning", "LSTM", "Time-series modelling"],
  },
  {
    group: "Remote sensing and GIS",
    items: ["Sentinel-2", "InSAR", "Land use", "Phenology", "Geo-analytics", "Crop classification"],
  },
  {
    group: "GNSS",
    items: ["RTK", "PPP", "NTRIP", "u-blox ZED-F9P", "UBX parsing"],
  },
  {
    group: "Data and cloud",
    items: ["Airflow", "Docker", "Kubernetes", "AWS", "GCP", "CI/CD", "SQL"],
  },
  {
    group: "Web",
    items: ["React", "Vite", "FastAPI", "WebSocket", "Framer Motion"],
  },
  {
    group: "Languages and hardware",
    items: ["Python", "JavaScript", "C++", "C", "Java", "Raspberry Pi", "ESP32", "ROS2"],
  },
];

export const recognition = [
  {
    id: "miigaik",
    title: "Spatial Data: Science and Technology",
    where: "MIIGAiK International Scientific Conference, Moscow",
    when: "May 2026",
    note: "Presented “Phenotype-Based Classification of Sugarcane and Rice Fields Using One-Class SVM from Satellite Imagery”.",
    img: "img/Russia_Conf.png",
  },
  {
    id: "icsec",
    title: "ICSEC 2025",
    where: "29th International Computer Science and Engineering Conference (IEEE), Chiang Mai",
    when: "November 2025",
    note: "Certificate of presentation for the same paper, accepted by IEEE.",
    img: "img/ICSEC.png",
  },
];

export const interests = [
  "Geospatial and remote sensing applications",
  "GNSS, RTK and NTRIP systems",
  "Dashboards and APIs for spatial data",
  "Research collaborations and prototypes",
];
