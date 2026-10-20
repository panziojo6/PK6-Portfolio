import {
  SiPython, SiJavascript, SiCplusplus, SiC, SiOpenjdk, SiDocker, SiGooglecloud, SiKubernetes, SiApacheairflow,
  SiReact, SiVite, SiFramer, SiFastapi, SiPytorch, SiScikitlearn, SiRaspberrypi, SiEspressif, SiRos, SiPostgresql,
  SiGithubactions, SiLeaflet, SiQgis, SiNumpy, SiPandas, SiOpencv, SiTensorflow, SiGit, SiLinux,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { LuSatellite, LuRadar, LuMap, LuLeaf, LuCompass, LuTractor, LuBrain, LuChartLine, LuRadio, LuCrosshair, LuBinary, LuBoxes, LuCpu, LuLayers, LuCloud } from "react-icons/lu";

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

/* Each entry: icon = React component (react-icons), color = brand colour used on hover / in the orbit. */
export const techStack = [
  /* Machine Learning */
  { icon: SiPytorch, name: "PyTorch", color: "#EE4C2C", group: "ml" },
  { icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00", group: "ml" },
  { icon: SiScikitlearn, name: "scikit-learn", color: "#F7931E", group: "ml" },
  { icon: LuBrain, name: "Deep Learning", color: "#a78bfa", group: "ml" },
  { icon: LuChartLine, name: "Time-Series / LSTM", color: "#22d3ee", group: "ml" },
  { icon: SiNumpy, name: "NumPy", color: "#4DABCF", group: "ml" },
  { icon: SiPandas, name: "pandas", color: "#E70488", group: "ml" },
  { icon: SiOpencv, name: "OpenCV", color: "#5C3EE8", group: "ml" },
  /* Geo */
  { icon: LuSatellite, name: "Sentinel-2", color: "#22d3ee", group: "geo" },
  { icon: LuRadar, name: "InSAR", color: "#a78bfa", group: "geo" },
  { icon: SiQgis, name: "QGIS", color: "#589632", group: "geo" },
  { icon: LuMap, name: "Land-Use Mapping", color: "#4ade80", group: "geo" },
  { icon: LuLeaf, name: "Phenology", color: "#86efac", group: "geo" },
  { icon: LuTractor, name: "Crop Classification", color: "#fbbf24", group: "geo" },
  { icon: SiLeaflet, name: "Leaflet", color: "#199900", group: "geo" },
  /* GNSS */
  { icon: LuCrosshair, name: "GNSS RTK / PPP", color: "#fbbf24", group: "gnss" },
  { icon: LuRadio, name: "NTRIP Caster", color: "#fb7185", group: "gnss" },
  { icon: LuCompass, name: "u-blox ZED-F9P", color: "#22d3ee", group: "gnss" },
  { icon: LuBinary, name: "UBX / RTCM Parsing", color: "#a78bfa", group: "gnss" },
  /* Cloud / Infra */
  { icon: SiDocker, name: "Docker", color: "#2496ED", group: "cloud" },
  { icon: SiKubernetes, name: "Kubernetes", color: "#326CE5", group: "cloud" },
  { icon: FaAws, name: "AWS", color: "#FF9900", group: "cloud" },
  { icon: SiGooglecloud, name: "Google Cloud", color: "#4285F4", group: "cloud" },
  { icon: SiApacheairflow, name: "Apache Airflow", color: "#017CEE", group: "cloud" },
  { icon: SiGithubactions, name: "CI / CD", color: "#2088FF", group: "cloud" },
  { icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1", group: "cloud" },
  { icon: SiLinux, name: "Linux", color: "#FCC624", group: "cloud" },
  /* Web */
  { icon: SiReact, name: "React", color: "#61DAFB", group: "web" },
  { icon: SiVite, name: "Vite", color: "#646CFF", group: "web" },
  { icon: SiFramer, name: "Framer Motion", color: "#0055FF", group: "web" },
  { icon: SiFastapi, name: "FastAPI", color: "#009688", group: "web" },
  /* Languages / Hardware */
  { icon: SiPython, name: "Python", color: "#3776AB", group: "lang" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E", group: "lang" },
  { icon: SiCplusplus, name: "C++", color: "#00599C", group: "lang" },
  { icon: SiC, name: "C", color: "#A8B9CC", group: "lang" },
  { icon: SiOpenjdk, name: "Java", color: "#ED8B00", group: "lang" },
  { icon: SiGit, name: "Git", color: "#F05032", group: "lang" },
  { icon: SiRaspberrypi, name: "Raspberry Pi", color: "#A22846", group: "hw" },
  { icon: SiEspressif, name: "ESP32", color: "#E7352C", group: "hw" },
  { icon: SiRos, name: "ROS 2", color: "#5b8def", group: "hw" },
];

/* Icons for the three practice cards and the stack groups (used by Skills.jsx) */
export const practiceIcons = [LuLayers, LuSatellite, LuBrain];
export const groupIcons = { "Machine learning": LuBrain, "Remote sensing and GIS": LuSatellite, GNSS: LuCrosshair, "Data and cloud": LuCloud, Web: LuBoxes, "Languages and hardware": LuCpu };
