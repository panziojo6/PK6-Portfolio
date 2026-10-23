import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Emoji-style 3D objects from PK6's world. Each is a small gradient SVG. */
const shapes = {
  dish: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#b9c0ff" />
        </linearGradient>
      </defs>
      <path d="M22 78 l30 -30" stroke="#5a63a8" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="60" cy="40" rx="34" ry="24" fill={`url(#${id}-a)`} transform="rotate(-35 60 40)" />
      <ellipse cx="60" cy="40" rx="20" ry="13" fill="#eef0ff" transform="rotate(-35 60 40)" />
      <circle cx="78" cy="22" r="7" fill="#ff6b6b" />
      <rect x="10" y="74" width="44" height="12" rx="6" fill="#5a63a8" />
    </>
  ),
  pin: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff8a80" />
          <stop offset="1" stopColor="#e2432f" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="90" rx="22" ry="7" fill="#000" opacity=".15" />
      <path d="M50 92 C28 60 18 48 18 36 a32 32 0 0 1 64 0 c0 12 -10 24 -32 56z" fill={`url(#${id}-a)`} />
      <circle cx="50" cy="36" r="13" fill="#fff" />
      <circle cx="42" cy="22" r="5" fill="#fff" opacity=".6" />
    </>
  ),
  chip: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4ade80" />
          <stop offset="1" stopColor="#15803d" />
        </linearGradient>
      </defs>
      <g stroke="#9aa3c7" strokeWidth="6" strokeLinecap="round">
        <path d="M30 14 v-8 M50 14 v-8 M70 14 v-8 M30 86 v8 M50 86 v8 M70 86 v8 M14 30 h-8 M14 50 h-8 M14 70 h-8 M86 30 h8 M86 50 h8 M86 70 h8" />
      </g>
      <rect x="14" y="14" width="72" height="72" rx="14" fill={`url(#${id}-a)`} />
      <rect x="30" y="30" width="40" height="40" rx="8" fill="#0b3d1f" />
      <rect x="36" y="36" width="14" height="10" rx="2" fill="#86efac" opacity=".8" />
    </>
  ),
  leaf: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bef264" />
          <stop offset="1" stopColor="#4d7c0f" />
        </linearGradient>
      </defs>
      <path d="M18 84 C18 40 44 14 88 12 C90 56 64 86 18 84z" fill={`url(#${id}-a)`} />
      <path d="M22 80 C40 56 58 40 84 16" stroke="#365314" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="40" r="6" fill="#fff" opacity=".5" />
    </>
  ),
  globe: (id) => (
    <>
      <defs>
        <radialGradient id={`${id}-a`} cx=".35" cy=".3">
          <stop offset="0" stopColor="#9fd2ff" />
          <stop offset="1" stopColor="#1d4ed8" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill={`url(#${id}-a)`} />
      <path d="M30 30 q12 6 8 20 q-4 14 10 18 q12 2 8 16" stroke="#4ade80" strokeWidth="9" fill="none" strokeLinecap="round" opacity=".9" />
      <path d="M62 22 q14 8 6 22" stroke="#4ade80" strokeWidth="8" fill="none" strokeLinecap="round" opacity=".9" />
      <ellipse cx="50" cy="50" rx="52" ry="12" stroke="#fff" strokeWidth="4" fill="none" transform="rotate(-20 50 50)" opacity=".8" />
    </>
  ),
  rocket: (id) => (
    <>
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c7ccff" />
        </linearGradient>
      </defs>
      <path d="M50 6 C70 24 72 58 62 76 H38 C28 58 30 24 50 6z" fill={`url(#${id}-a)`} />
      <circle cx="50" cy="40" r="9" fill="#3b46f1" />
      <circle cx="50" cy="40" r="5" fill="#bfe3ff" />
      <path d="M38 60 L22 78 L40 76z M62 60 L78 78 L60 76z" fill="#ff6b6b" />
      <path d="M42 78 h16 l-8 16z" fill="#ffb347" />
    </>
  ),
  star: () => (
    <path d="M50 8 l12 28 30 3 -23 20 7 30 -26 -16 -26 16 7 -30 -23 -20 30 -3z" fill="#ffd166" stroke="#f59e0b" strokeWidth="3" strokeLinejoin="round" />
  ),
};

export default function Floaty({ kind = "pin", size = 96, tilt = 0, delay = 0, duration = 6, className = "", style }) {
  const reduce = useReducedMotion();
  const id = `fl${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const anim = reduce ? {} : { y: [0, -14, 0], rotate: [tilt, tilt + 4, tilt] };
  return (
    <motion.svg
      className={`floaty ${className}`}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      style={{ rotate: tilt, ...style }}
      aria-hidden="true"
      animate={anim}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {shapes[kind](id)}
    </motion.svg>
  );
}
