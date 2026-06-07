const base = import.meta.env.BASE_URL;

export const projects = [
  {
    title: "Satellite-based Sugarcane & Rice Classification",
    description:
      "Phenotype-based classification using Sentinel-2 time-series, sinusoidal fitting, One-Class SVM, and geospatial post-processing.",
    tags: ["Sentinel-2", "Python", "OCSVM", "GIS"],
    role: "Research / Algorithm / Pipeline",
    image: `${base}img/cane.png`,
  },
  {
    title:
      "IEEE ICSEC 2025 – Phenotype-Based Crop Classification (One-Class SVM)",
    description:
      "IEEE-accepted phenotype-based crop mapping system using Sentinel-2 and dual One-Class SVM for sugarcane & rice.",
    tags: ["IEEE Paper", "Satellite Analytics", "OCSVM", "Agriculture"],
    role: "Research / Author",
    image: `${base}img/IMG_1133.jpeg`,
  },
  {
    title: "IEEE Presentation: Crop Classification via One-Class SVM",
    description:
      "Showcased an agricultural mapping system in Russia. The methodology leverages Sentinel-2 time-series and phenotype-based OCSVM models for large-scale crop identification.",
    tags: ["International Symposium", "Machine Learning"],
    role: "Lead Researcher & Speaker",
    image: `${base}img/Presentation_Russia2026.png`,
  },
  {
    title: "Cane Yield Estimation Dashboard",
    description:
      "Regional-scale yield estimation using raster analytics, SQL math models, and interactive web visualization.",
    tags: ["Python", "SQL", "Data Viz", "Modeling"],
    role: "Geo-Analytics / Frontend",
    image: `${base}img/Yield.jpg`,
  },
  {
    title: "GNSS RTK, PPP, and NTRIP Caster System",
    description:
      "Real-time GNSS + RTK monitoring with FastAPI backend, NTRIP caster, ESP32 rover, and live geospatial map dashboard.",
    tags: ["GNSS", "FastAPI", "RTK", "WebSocket", "Raspberry Pi"],
    role: "Full-Stack / Systems",
    image: `${base}img/IMG_1949.jpeg`,
    video: `${base}video/IMG_9253.MOV`,
  },
  {
    title: "Low-Cost u-blox GNSS with RTK/PPP on Raspberry Pi",
    description:
      "A real-time GNSS system combining low-cost u-blox modules with Raspberry Pi for RTK, PPP, NTRIP casting, and live geospatial visualization over WebSocket.",
    tags: ["GNSS", "u-blox", "Raspberry Pi", "PPP", "RTK", "FastAPI"],
    role: "Full-Stack / Embedded Systems",
    image: `${base}img/ublox.JPG`,
  },
  {
    title: "ROS2 LiDAR Autonomous Navigation",
    description:
      "Low-cost autonomous vehicle system using LiDAR, ROS2, and A* path planning on Raspberry Pi.",
    tags: ["LiDAR", "ROS2", "A*", "Autonomous Vehicle", "Raspberry Pi"],
    role: "Embedded / Robotics",
    image: `${base}img/Lidar.png`,
  },
  {
    title: "Truck Detection & Tracking System",
    description:
      "Unsupervised analysis of truck movement patterns using clustering-based algorithms, with trajectory tracking, anomaly detection, and geospatial behavior insights.",
    tags: [
      "Unsupervised Learning",
      "Clustering",
      "Trajectory Analysis",
      "Graph Theory",
    ],
    role: "Algorithm",
    image: `${base}img/Cluster.png`,
  },
  {
    title: "Tamroypao Burn Area Detection",
    description:
      "Time-series Sentinel-2 burn area analytics with SAVI/NBR indices, API-based profile extraction, regression fitting, and interactive charts.",
    tags: ["Sentinel-2", "SAVI & NBR", "Burn Area", "Analytics Dashboard"],
    role: "Backend & UI Development",
    image: `${base}img/tamroupao.png`,
  },
  {
    title: "Russian Satellite Roof Detection",
    description:
      "An object detection pipeline that uses high-resolution Russian satellite imagery to automatically detect building rooftops for urban mapping, exposure analysis, and infrastructure planning.",
    tags: [
      "Object Detection",
      "Satellite Imagery",
      "Computer Vision",
      "Remote Sensing",
    ],
    role: "Deep Learning / Geospatial",
    image: `${base}img/roof_detection.png`,
  },
  {
    title: "Airflow-Based Geospatial ETL Pipeline",
    description:
      "End-to-end time-series Disaster processing with Airflow, API profile extraction, regression modeling, and interactive chart visualizations.",
    tags: ["Flood", "Land Slide", "Regression", "Visualization"],
    role: "Backend / UI",
    image: `${base}img/Airflow.png`,
  },
  {
    title: "Flood Level Prediction System",
    description:
      "An end-to-end time-series disaster analytics pipeline using Airflow, real-time API ingestion, regression modeling, and interactive visual dashboards.",
    tags: ["Flood", "Landslide", "Time-Series", "Regression", "Visualization"],
    role: "Backend / Data Pipeline / UI",
    image: `${base}img/model_rain.jpg`,
  },
  {
    title: "FarmRak System",
    description:
      "A mobile and web platform that allows farmers to view their own field data, including satellite-derived yield estimates and real-time geospatial analytics.",
    tags: [
      "Satellite Analytics",
      "Yield Estimation",
      "Farmer App",
      "Geospatial",
    ],
    role: "Backend / Frontend",
    image: `${base}img/Framrak.png`,
  },
  {
    title: "PM2.5 Genetic Algorithm Optimization",
    description:
      "A data analytics system that applies genetic algorithms together with Pearson and Spearman correlation to select key factors and optimize PM2.5 prediction models.",
    tags: [
      "PM2.5",
      "Genetic Algorithm",
      "Pearson Correlation",
      "Spearman Correlation",
    ],
    role: "Algorithm / Backend",
    image: `${base}img/pm25.png`,
  },
  {
    title: "InSAR Deformation Viewer",
    description:
      "Time-series InSAR deformation explorer with API profile extraction, regression fitting, and interactive charts.",
    tags: ["InSAR", "Fast API", "Multiple Linear", "Charts"],
    role: "Backend / UI",
    image: `${base}img/insar.png`,
  },
];
