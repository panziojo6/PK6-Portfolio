const base = import.meta.env.BASE_URL;

export const projects = [
  {
    id: "sugarcane-classification",
    title: "Satellite-based Sugarcane & Rice Classification",
    shortTitle: "Sugarcane & Rice Phenotyping",
    category: "Satellite Intelligence",
    topRank: 1,
    featured: true,
    match: "99% Match",
    year: "2025–2026",
    rating: "Ph.D. Bound",
    badge: "ULTRA 4K · SPATIAL AI",
    duration: "Sentinel-2 Pipeline",
    description:
      "A breakthrough phenotype-based classification framework using Sentinel-2 multi-temporal satellite imagery. It fits seasonal vegetative curves (sinusoidal modeling) combined with dual One-Class Support Vector Machines (OCSVM) to accurately classify sugarcane and rice across large geographical areas without heavy negative labeling.",
    longDescription:
      "Agricultural land classification in Southeast Asia faces severe cloud contamination and smallholder field fragmentation. This system resolves these bottlenecks by extracting multi-year Sentinel-2 NDVI/EVI time series, applying temporal Fourier/sinusoidal curve fitting to capture distinct crop phenology stages, and running boundary-sensitive One-Class SVMs. Accepted for presentation at both IEEE ICSEC 2025 and MIIGAiK International Scientific Conference in Moscow.",
    tags: ["Sentinel-2", "Python", "OCSVM", "GIS", "Phenology", "GeoTIFF"],
    role: "Lead Researcher · Algorithm · End-to-End Pipeline",
    image: `${base}img/cane.png`,
    specs: {
      sensors: "Sentinel-2 MSI (10m Resolution)",
      algorithm: "Sinusoidal Phenology + One-Class SVM",
      runtime: "Distributed Python / Rasterio / GDAL",
      acclaim: "IEEE ICSEC 2025 & MIIGAiK Moscow Accepted",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Multi-Temporal Satellite Extraction",
        time: "10m Res",
        desc: "Ingestion of Sentinel-2 Level-2A surface reflectance scenes with cloud masking using SCL layer and vegetation index calculation.",
      },
      {
        ep: "EP 2",
        title: "Sinusoidal Phenology Modeling",
        time: "Seasonal Fit",
        desc: "Fitting harmonic curves to irregular temporal NDVI profiles to extract phenological metrics like greenup, peak, and senescence.",
      },
      {
        ep: "EP 3",
        title: "Dual One-Class SVM Classification",
        time: "High Precision",
        desc: "Boundary estimation that isolates sugarcane from paddy rice without requiring balanced negative background training sets.",
      },
      {
        ep: "EP 4",
        title: "Geospatial Vectorization & Reporting",
        time: "Production Map",
        desc: "Post-processing morphological filtering, vector export to GeoPackage/Shapefile, and regional harvest area verification.",
      },
    ],
  },
  {
    id: "gnss-rtk-caster",
    title: "GNSS RTK, PPP, and NTRIP Caster System",
    shortTitle: "RTK / NTRIP Real-Time Caster",
    category: "GNSS & Robotics",
    topRank: 2,
    featured: true,
    match: "98% Match",
    year: "2025",
    rating: "Live Hardware",
    badge: "LIVE DEMO VIDEO",
    duration: "Centimeter Accuracy",
    description:
      "An end-to-end real-time GNSS positioning infrastructure featuring a custom rooftop base station, high-throughput NTRIP caster, FastAPI streaming backend, ESP32 mobile rover, and interactive live geospatial map.",
    longDescription:
      "Engineered from ground-up to provide centimeter-level accuracy using low-cost hardware. Raw UBX multi-band carrier phase observations are acquired by a rooftop antenna, fed into an RTCM3 NTRIP caster engine, and dispatched to mobile rovers over 4G/WiFi. The web dashboard visualizes rover trajectories, satellite constellations (GPS, GLONASS, Galileo, BeiDou), SNR, DOP, and fix status in real time via WebSockets.",
    tags: ["GNSS", "FastAPI", "RTK", "WebSocket", "Raspberry Pi", "ESP32", "NTRIP"],
    role: "Full-Stack Engineer · Embedded Systems Architect",
    image: `${base}img/IMG_1949.jpeg`,
    video: `${base}video/IMG_9253.MOV`,
    specs: {
      hardware: "u-blox ZED-F9P + Raspberry Pi 4 + ESP32",
      protocols: "RTCM 3.3, NMEA-0183, UBX, NTRIP 2.0",
      accuracy: "Centimeter-level (RTK Fixed: < 2 cm)",
      frontend: "React + Leaflet + WebSocket Real-time Feed",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Base Station Setup & Survey-In",
        time: "Rooftop Antenna",
        desc: "Mounting survey-grade multi-band antenna, configuring raw UBX binary streams, and autonomous survey-in positioning.",
      },
      {
        ep: "EP 2",
        title: "High-Throughput NTRIP Caster",
        time: "Low Latency",
        desc: "Building a Python/C++ NTRIP server that packages RTCM 1005, 1077, 1087, 1097 messages and broadcasts to concurrent rovers.",
      },
      {
        ep: "EP 3",
        title: "FastAPI & WebSocket Gateway",
        time: "60 FPS Stream",
        desc: "Asynchronous backend parsing incoming NMEA GGA sentences, logging trajectories into PostgreSQL/TimescaleDB, and broadcasting.",
      },
      {
        ep: "EP 4",
        title: "Interactive Live Mission Dashboard",
        time: "WebGL Map",
        desc: "Cockpit UI showing live rover location, satellite skyplot, DOP metrics, and RTK fix/float/single state indicators.",
      },
    ],
  },
  {
    id: "ros2-lidar",
    title: "ROS2 LiDAR Autonomous Navigation",
    shortTitle: "LiDAR Autonomous Rover",
    category: "GNSS & Robotics",
    topRank: 3,
    featured: true,
    match: "97% Match",
    year: "2024–2025",
    rating: "Autonomous Systems",
    badge: "ROBOTICS · ROS2",
    duration: "Real-time SLAM",
    description:
      "A complete low-cost autonomous vehicle system integrating 2D LiDAR scanning, ROS2 Humble navigation stack, costmap generation, and customized A* global path planning running locally on a Raspberry Pi.",
    longDescription:
      "Designed and fabricated an autonomous mobile robot platform. Equipped with 360-degree LiDAR, wheel encoders, and an IMU. Utilizes Cartographer SLAM for 2D spatial mapping and Nav2 behavior trees for dynamic collision avoidance. Overcame microcomputer compute constraints through optimized C++ node pipelines.",
    tags: ["LiDAR", "ROS2", "A* Algorithm", "Autonomous Vehicle", "Raspberry Pi", "C++"],
    role: "Robotics Engineer · Embedded Firmware Developer",
    image: `${base}img/Lidar.png`,
    specs: {
      middleware: "ROS2 Humble / Nav2 Stack",
      sensor: "360° RPLiDAR + 9-DOF IMU + Optical Encoders",
      planning: "A* Global Path Planning + DWB Local Controller",
      hardware: "Raspberry Pi 4 (Ubuntu Server 22.04)",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Chassis & Sensor Integration",
        time: "Hardware Fab",
        desc: "Motor driver circuitry, wheel odometry calibration, and hardware time synchronization.",
      },
      {
        ep: "EP 2",
        title: "Cartographer 2D SLAM Mapping",
        time: "Real-Time Map",
        desc: "Laser scan matcher node producing occupancy grid maps of indoor and campus environments.",
      },
      {
        ep: "EP 3",
        title: "Path Planning & Obstacle Avoidance",
        time: "A* & DWB",
        desc: "Custom costmap inflation layers with dynamic local trajectory generation avoiding moving obstacles.",
      },
    ],
  },
  {
    id: "ieee-icsec-2025",
    title: "IEEE ICSEC 2025 – Phenotype-Based Crop Classification (One-Class SVM)",
    shortTitle: "IEEE ICSEC 2025 Research Paper",
    category: "Publications & Symposia",
    topRank: 4,
    featured: true,
    match: "99% Match",
    year: "November 2025",
    rating: "Peer-Reviewed",
    badge: "IEEE ACCEPTED",
    duration: "Full Paper Presentation",
    description:
      "Official certificate and paper accepted at the 29th International Computer Science and Engineering Conference (IEEE ICSEC 2025) in Chiang Mai, Thailand.",
    longDescription:
      "Authored and delivered an IEEE-indexed research presentation presenting our novel two-stage crop phenotyping system. Demonstrates superior F1-scores over traditional Random Forest baselines in distinguishing overlapping seasonal vegetation signatures in tropical agriculture.",
    tags: ["IEEE Paper", "Satellite Analytics", "OCSVM", "Agriculture", "Peer-Reviewed"],
    role: "First Author · Research Presenter",
    image: `${base}img/IMG_1133.jpeg`,
    specs: {
      conference: "29th IEEE ICSEC 2025, Chiang Mai",
      publisher: "IEEE Xplore Digital Library",
      topic: "Phenotype-Based Crop Classification via Sentinel-2 & OCSVM",
      status: "Published & Certificate of Presentation Awarded",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Peer-Review & Manuscript Acceptance",
        time: "IEEE Standard",
        desc: "Rigorous technical review process evaluating mathematical proofs and ground-truth validation data.",
      },
      {
        ep: "EP 2",
        title: "Oral Presentation in Chiang Mai",
        time: "International Audience",
        desc: "Live podium presentation defending the methodology to international computer science and remote sensing researchers.",
      },
    ],
  },
  {
    id: "roof-detection",
    title: "Russian Satellite High-Resolution Roof Detection",
    shortTitle: "High-Res Roof Detection",
    category: "Satellite Intelligence",
    topRank: 5,
    featured: true,
    match: "96% Match",
    year: "2025",
    rating: "Deep Learning",
    badge: "COMPUTER VISION",
    duration: "Sub-Meter Imagery",
    description:
      "A deep learning computer vision pipeline leveraging sub-meter Russian Earth observation satellite imagery to automatically segment and detect building rooftops for rapid urban expansion mapping and solar potential analysis.",
    longDescription:
      "Engineered an automated tiling, augmentation, and neural inference system. Utilizes fine-tuned YOLO/U-Net architectures trained on high-resolution orthorectified imagery. Employs polygon regularization post-processing to convert messy raster masks into crisp GIS building footprints.",
    tags: ["Object Detection", "Satellite Imagery", "Computer Vision", "Remote Sensing", "PyTorch"],
    role: "Deep Learning Engineer · Geospatial Pipeline Developer",
    image: `${base}img/roof_detection.png`,
    specs: {
      resolution: "Sub-meter high-res satellite imagery",
      models: "YOLOv8 + Mask R-CNN with Polygon Regularization",
      output: "GIS Shapefiles & GeoJSON Vector Layers",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Large-Scale Ortho Image Tiling",
        time: "Preprocessing",
        desc: "Multi-gigabyte GeoTIFF slicing with overlapping boundary windows and radiometric normalization.",
      },
      {
        ep: "EP 2",
        title: "Instance Segmentation Training",
        time: "Deep Learning",
        desc: "Training with mixed precision on GPU clusters using data augmentation for varied sun angles and shadows.",
      },
      {
        ep: "EP 3",
        title: "Douglas-Peucker Vector Smoothing",
        time: "GIS Pipeline",
        desc: "Transforming pixel predictions into CAD/GIS-ready vector boundaries with metadata tagging.",
      },
    ],
  },
  {
    id: "ublox-pi-rover",
    title: "Low-Cost u-blox GNSS with RTK/PPP on Raspberry Pi",
    shortTitle: "u-blox GNSS RTK/PPP Rover",
    category: "GNSS & Robotics",
    topRank: 6,
    featured: false,
    match: "98% Match",
    year: "2025",
    rating: "Embedded Edge",
    badge: "UBX STREAMING",
    duration: "Real-time Edge Compute",
    description:
      "Compact field rover combining u-blox ZED-F9P multi-band receiver with Raspberry Pi over UART/USB, running on-device UBX parsing, NTRIP correction ingestion, and WebSocket broadcast.",
    longDescription:
      "Designed for portable survey teams. Features custom systemd services that auto-connect to NTRIP correction streams, compute centimeter PPP/RTK solutions on the fly, and serve an offline-capable web GUI accessible over the rover's local WiFi hotspot.",
    tags: ["GNSS", "u-blox", "Raspberry Pi", "PPP", "RTK", "FastAPI", "Python"],
    role: "Embedded Systems Architect · Software Developer",
    image: `${base}img/ublox.JPG`,
    specs: {
      gnssModule: "u-blox ZED-F9P Multi-Band",
      compute: "Raspberry Pi Zero 2W / Pi 4",
      connectivity: "WiFi Hotspot + 4G LTE Dongle",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "High-Speed UBX Binary Protocol Parsing",
        time: "10 Hz Stream",
        desc: "Custom zero-copy binary parser unpacking NAV-PVT, NAV-HPPOSLLH, and RXM-RAWX packets with checksum validation.",
      },
      {
        ep: "EP 2",
        title: "Autonomous Rover Hotspot & Field Web UI",
        time: "Responsive UI",
        desc: "Serving an onboard React web app allowing field technicians to calibrate and record ground control points (GCPs).",
      },
    ],
  },
  {
    id: "airflow-etl",
    title: "Airflow-Based Geospatial ETL Pipeline",
    shortTitle: "Airflow Disaster ETL Pipeline",
    category: "Data Pipelines & AI",
    topRank: 7,
    featured: false,
    match: "95% Match",
    year: "2025",
    rating: "Cloud & Data",
    badge: "APACHE AIRFLOW",
    duration: "Automated DAGs",
    description:
      "Production-grade automated ETL pipeline orchestrated with Apache Airflow to ingest time-series rainfall, soil moisture, and satellite datasets for multi-hazard disaster monitoring.",
    longDescription:
      "Automates scheduled DAGs that query meteorological REST APIs, download Sentinel-1/2 products, execute raster analytics, and insert structured time-series metrics into analytical databases for downstream prediction models.",
    tags: ["Airflow", "Disaster Analytics", "Python", "Docker", "PostgreSQL", "ETL"],
    role: "Data Engineer · Cloud Pipeline Architect",
    image: `${base}img/Airflow.png`,
    specs: {
      orchestrator: "Apache Airflow 2.8 on Docker",
      storage: "MinIO S3 Object Storage + PostGIS",
      monitoring: "Prometheus & Grafana Alerting",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "API Ingestion & Rate-Limited Polling",
        time: "Daily DAG",
        desc: "Fault-tolerant sensor polling with automatic retries, backoff strategies, and data integrity checks.",
      },
      {
        ep: "EP 2",
        title: "Raster Algebra & Regional Aggregation",
        time: "GDAL / NumPy",
        desc: "Zonal statistics calculation producing tabular time-series ready for machine learning models.",
      },
    ],
  },
  {
    id: "miigaik-conference",
    title: "MIIGAiK Moscow Conference: Crop Classification via One-Class SVM",
    shortTitle: "MIIGAiK Moscow Keynote Presentation",
    category: "Publications & Symposia",
    topRank: 8,
    featured: true,
    match: "99% Match",
    year: "May 2026",
    rating: "International Symposium",
    badge: "MOSCOW CONFERENCE",
    duration: "Keynote Symposium",
    description:
      "Selected and presented at the renowned MIIGAiK International Scientific Conference (Spatial Data: Science and Technology) in Moscow, Russia.",
    longDescription:
      "Showcased large-scale agricultural crop classification methodologies using Sentinel-2 time series to Russian space geodesy and cartography researchers. Tied directly to Ph.D. research fellowship at Moscow State University under the Russian Government Scholarship.",
    tags: ["International Symposium", "Machine Learning", "MIIGAiK", "Moscow", "Spatial Data"],
    role: "Lead Speaker · Researcher",
    image: `${base}img/Presentation_Russia2026.png`,
    specs: {
      venue: "MIIGAiK International Scientific Conference, Moscow",
      fellowship: "Russian Government Full Scholarship (Ph.D. Space Engineering)",
      focus: "Space Geodesy, Satellite Phenology, Earth Observation",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Scientific Committee Selection",
        time: "International Review",
        desc: "Paper review and acceptance by Russian Academy of Sciences and MIIGAiK faculty.",
      },
      {
        ep: "EP 2",
        title: "International Symposium Address",
        time: "Academic Forum",
        desc: "Defending time-series harmonic modeling to international space engineering specialists in Moscow.",
      },
    ],
  },
  {
    id: "flood-prediction",
    title: "Flood Level Prediction & Early Warning System",
    shortTitle: "Flood Prediction & Warning",
    category: "Data Pipelines & AI",
    topRank: 9,
    featured: false,
    match: "94% Match",
    year: "2024–2025",
    rating: "AI Analytics",
    badge: "TIME-SERIES ML",
    duration: "Predictive System",
    description:
      "Real-time flood depth prediction system combining upstream rainfall radar gauges, river basin hydrologic modeling, and LSTM neural networks with interactive visualization.",
    longDescription:
      "Integrates telemetry stations with multi-step-ahead regression models to predict flood inundation peak 6 to 24 hours in advance, providing civic authorities with actionable early warning alerts.",
    tags: ["Flood", "Landslide", "Time-Series", "Regression", "LSTM", "Visualization"],
    role: "Backend Architect · ML Developer",
    image: `${base}img/model_rain.jpg`,
    specs: {
      mlModel: "LSTM Recurrent Neural Network + Multi-variable Regression",
      leadTime: "6 to 24 Hour Advance Warning",
      stack: "FastAPI + React Dashboard + Leaflet",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Telemetry Data Cleaning & Lag Feature Engineering",
        time: "Preprocessing",
        desc: "Rolling averages, precipitation cumulative lags, and river runoff feature synthesis.",
      },
      {
        ep: "EP 2",
        title: "Forecasting Engine & Alert Webhook",
        time: "Inference Engine",
        desc: "Automated alert dispatch when projected river stage surpasses safety thresholds.",
      },
    ],
  },
  {
    id: "pm25-optimization",
    title: "PM2.5 Genetic Algorithm Optimization",
    shortTitle: "PM2.5 Genetic Algorithm",
    category: "Data Pipelines & AI",
    topRank: 10,
    featured: false,
    match: "93% Match",
    year: "2024",
    rating: "Genetic Optimization",
    badge: "ALGORITHMS",
    duration: "Feature Selection Engine",
    description:
      "An advanced data analytics framework applying genetic algorithms alongside Pearson and Spearman correlation matrices to select optimal atmospheric factors for air pollution forecasting.",
    longDescription:
      "Tackles the high dimensionality of meteorological, traffic, and satellite aerosol optical depth (AOD) data by evolving feature subsets through crossover and mutation operators, minimizing RMSE on validation folds.",
    tags: ["PM2.5", "Genetic Algorithm", "Pearson Correlation", "Spearman Correlation", "Optimization"],
    role: "Algorithm Engineer · Data Analyst",
    image: `${base}img/pm25.png`,
    specs: {
      optimization: "Evolutionary Genetic Algorithm (GA)",
      correlation: "Pearson & Spearman Rank Coefficients",
      reduction: "Reduced 40+ raw features to 8 dominant predictors",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Chromosome Encoding & Fitness Function",
        time: "Evolution Setup",
        desc: "Binary encoding of feature flags evaluated against cross-validated regression loss.",
      },
      {
        ep: "EP 2",
        title: "Convergence Analysis & Evaluation",
        time: "Genetic Search",
        desc: "Tracking fitness score over 100 generations with early stopping and hyperparameter tuning.",
      },
    ],
  },
  {
    id: "tamroypao-burn-area",
    title: "Tamroypao Burn Area Detection",
    shortTitle: "Tamroypao Fire & Burn Area",
    category: "Satellite Intelligence",
    featured: false,
    match: "96% Match",
    year: "2024–2025",
    rating: "Environmental AI",
    badge: "SPECTRAL INDICES",
    duration: "Sentinel-2 Indices",
    description:
      "Time-series wildfire and post-harvest agricultural burning detection utilizing Sentinel-2 NBR and SAVI spectral indices, coupled with an interactive web analytics dashboard.",
    longDescription:
      "Detects abrupt drops in Normalized Burn Ratio (NBR) and Soil Adjusted Vegetation Index (SAVI) to pinpoint fire scars and burn severity levels across Thai agricultural zones.",
    tags: ["Sentinel-2", "SAVI & NBR", "Burn Area", "Analytics Dashboard", "Python"],
    role: "Backend & UI Developer · Remote Sensing Specialist",
    image: `${base}img/tamroupao.png`,
    specs: {
      indices: "NBR (NIR - SWIR) & SAVI (Soil Adjusted)",
      detection: "Differenced NBR (dNBR) Thresholding",
      frontend: "Interactive Time-Series Charting & GeoJSON Layers",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Pre/Post Fire Spectral Differential",
        time: "Spectral Math",
        desc: "Calculating dNBR layers to categorize burn severity from unburned to high severity.",
      },
      {
        ep: "EP 2",
        title: "Interactive Analytics Dashboard",
        time: "Web Interface",
        desc: "Allowing users to draw polygons on an interactive map and view temporal burn curves.",
      },
    ],
  },
  {
    id: "insar-viewer",
    title: "InSAR Ground Deformation Explorer",
    shortTitle: "InSAR Deformation Explorer",
    category: "Satellite Intelligence",
    featured: false,
    match: "95% Match",
    year: "2024–2025",
    rating: "Radar Geodesy",
    badge: "RADAR / InSAR",
    duration: "Millimeter Velocity",
    description:
      "Web-based radar interferometry explorer visualizing land subsidence and tectonic deformation rates derived from Sentinel-1 Synthetic Aperture Radar (SAR) time series.",
    longDescription:
      "Processes Persistent Scatterer Interferometry (PSI) point clouds to extract millimeter-precision ground movement over Bangkok and coastal zones, complete with multi-linear trend fitting.",
    tags: ["InSAR", "FastAPI", "Sentinel-1", "Radar", "Subsidence", "Charts"],
    role: "Full-Stack Engineer · Radar Data Analyst",
    image: `${base}img/insar.png`,
    specs: {
      sensor: "Sentinel-1 C-Band SAR",
      precision: "Millimeter per year (Line-of-Sight velocity)",
      backend: "FastAPI + High-speed Spatial Index (R-Tree / PostGIS)",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "PSI Point Cloud Parsing & Indexing",
        time: "Spatial DB",
        desc: "Indexing millions of measurement points with R-Tree for sub-second spatial querying.",
      },
      {
        ep: "EP 2",
        title: "Temporal Displacement Curves",
        time: "Time-Series",
        desc: "Interactive chart plotting seasonal ground heave versus long-term subsidence trends.",
      },
    ],
  },
  {
    id: "cane-yield-dashboard",
    title: "Cane Yield Estimation Dashboard",
    shortTitle: "Cane Yield Regional Analytics",
    category: "Satellite Intelligence",
    featured: false,
    match: "94% Match",
    year: "2024",
    rating: "AgriTech",
    badge: "AGRI ANALYTICS",
    duration: "Regional Raster Analytics",
    description:
      "Interactive enterprise dashboard estimating agricultural sugarcane tonnage per rai across mill catchment zones using remote sensing vegetation proxies and SQL spatial models.",
    longDescription:
      "Bridges the gap between raw satellite raster calculations and sugar mill operational logistics. Computes cumulative biomass models and visualizes yield distribution by zoning.",
    tags: ["Python", "SQL", "Data Viz", "Modeling", "Geospatial"],
    role: "Geo-Analytics Specialist · Frontend Architect",
    image: `${base}img/Yield.jpg`,
    specs: {
      resolution: "Regional Plot Level",
      models: "Integrated Biomass Accumulation Index",
      database: "PostgreSQL + PostGIS",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Field Boundary Zonal Math",
        time: "SQL Pipeline",
        desc: "Intersecting satellite biomass rasters with parcel polygons via PostGIS raster functions.",
      },
      {
        ep: "EP 2",
        title: "Sugar Mill Logistics Dashboard",
        time: "React Frontend",
        desc: "Interactive filtering by mill radius, delivery schedule, and expected tonnage.",
      },
    ],
  },
  {
    id: "farmrak-system",
    title: "FarmRak Farmer Mobile & Web Platform",
    shortTitle: "FarmRak Smart Farming Platform",
    category: "Data Pipelines & AI",
    featured: false,
    match: "96% Match",
    year: "2024",
    rating: "Smart Farming",
    badge: "MOBILE & WEB",
    duration: "Farmer-Centric System",
    description:
      "Comprehensive platform providing smallholder farmers with satellite-derived crop health diagnostics, soil moisture estimates, and weather advisories in an intuitive mobile UX.",
    longDescription:
      "Translates complex remote sensing algorithms into actionable agricultural advice (color-coded crop vitality, irrigation reminders, fertilizer timing) tailored for farmers on mobile devices.",
    tags: ["Satellite Analytics", "Yield Estimation", "Farmer App", "Geospatial", "React"],
    role: "Full-Stack Developer · UI/UX Designer",
    image: `${base}img/Framrak.png`,
    specs: {
      target: "Smallholder Farmers & Agricultural Officers",
      mobile: "Progressive Web App (PWA) / Responsive Mobile First",
      analytics: "Normalized Difference Vegetation Index (NDVI) Simplified",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Parcel Mapping & Geofencing",
        time: "Mobile GPS",
        desc: "Farmer self-service plot drawing with GPS boundary capture and cadastral validation.",
      },
      {
        ep: "EP 2",
        title: "Actionable Satellite Advisory Feed",
        time: "Push Updates",
        desc: "Weekly advisory cards showing water stress, vegetative vigour, and weather risks.",
      },
    ],
  },
  {
    id: "truck-detection-tracking",
    title: "Truck Movement Pattern & Tracking System",
    shortTitle: "Truck Trajectory Clustering",
    category: "GNSS & Robotics",
    featured: false,
    match: "93% Match",
    year: "2024",
    rating: "Trajectory Analytics",
    badge: "UNSUPERVISED ML",
    duration: "Spatio-Temporal Mining",
    description:
      "Unsupervised spatio-temporal clustering system analyzing millions of GPS fleet breadcrumbs to uncover transportation bottlenecks, unauthorized detours, and dwell-time anomalies.",
    longDescription:
      "Applies DBSCAN spatio-temporal clustering and graph network models to clean raw GPS trajectories, reconstruct freight corridors, and detect anomalous stops without labeled ground truth.",
    tags: ["Unsupervised Learning", "Clustering", "Trajectory Analysis", "Graph Theory", "Python"],
    role: "Algorithm Engineer · Geospatial Analyst",
    image: `${base}img/Cluster.png`,
    specs: {
      algorithm: "ST-DBSCAN + Directed Graph Corridor Reconstruction",
      scale: "Over 500,000 GPS trajectory points analyzed",
      metrics: "Dwell time, corridor adherence, velocity variance",
    },
    episodes: [
      {
        ep: "EP 1",
        title: "Trajectory Map Matching & Noise Filtering",
        time: "Data Cleaning",
        desc: "Kalman filtering GPS drift and snapping trajectories to transport network graphs.",
      },
      {
        ep: "EP 2",
        title: "Density-Based Stop & Corridor Clustering",
        time: "ST-DBSCAN",
        desc: "Detecting unofficial rest stops, transit bottlenecks, and fuel stop anomalies.",
      },
    ],
  },
];

// Curated collections for Netflix UI rows:
export const featuredProjects = projects.filter((p) => p.featured);
export const top10Projects = [...projects]
  .filter((p) => p.topRank)
  .sort((a, b) => a.topRank - b.topRank);

export const satelliteProjects = projects.filter(
  (p) => p.category === "Satellite Intelligence"
);

export const gnssRoboticsProjects = projects.filter(
  (p) => p.category === "GNSS & Robotics"
);

export const dataPipelinesProjects = projects.filter(
  (p) => p.category === "Data Pipelines & AI"
);

export const publicationProjects = projects.filter(
  (p) => p.category === "Publications & Symposia"
);
