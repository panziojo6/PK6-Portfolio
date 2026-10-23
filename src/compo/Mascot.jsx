import { motion, useReducedMotion } from "framer-motion";

/*
  Orbi — PK6's satellite mascot. One SVG, drawn once, reused everywhere.
  props:
    size    – rendered width in px (height follows the 260x240 viewBox)
    prop    – "map" | "cap" | "headset" | "flag" | undefined
    mood    – "happy" (default) | "wink"
    float   – gentle bob (default true)
    delay   – animation phase offset in seconds
*/
export default function Mascot({ size = 260, prop, mood = "happy", float = true, delay = 0, className = "", style }) {
  const reduce = useReducedMotion();
  const uid = `orbi-${prop || "base"}-${mood}`;
  const anim = float && !reduce ? { y: [0, -12, 0], rotate: [0, -2, 0, 2, 0] } : {};

  return (
    <motion.svg
      className={`mascot ${className}`}
      style={{ width: size, height: (size * 240) / 260, ...style }}
      viewBox="0 0 260 240"
      role="img"
      aria-label="Orbi, the PK6 satellite mascot"
      animate={anim}
      transition={{ duration: 5.5, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dde1ff" />
        </linearGradient>
        <linearGradient id={`${uid}-wing`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6a78ff" />
          <stop offset="1" stopColor="#2f3bd8" />
        </linearGradient>
        <linearGradient id={`${uid}-wingShine`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".45" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${uid}-cheek`}>
          <stop offset="0" stopColor="#ff8fb1" stopOpacity=".9" />
          <stop offset="1" stopColor="#ff8fb1" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#121452" floodOpacity=".35" />
        </filter>
        <filter id={`${uid}-glow`}>
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <g filter={`url(#${uid}-shadow)`}>
        {/* antenna */}
        <rect x="127" y="22" width="6" height="40" rx="3" fill="#9aa3c7" />
        <circle cx="130" cy="20" r="9" fill="#ff6b6b" filter={`url(#${uid}-glow)`} opacity=".7" />
        <circle cx="130" cy="20" r="6" fill="#ff8a80" />
        <circle cx="128" cy="18" r="2" fill="#fff" />

        {/* wings */}
        <g>
          <rect x="4" y="88" width="66" height="54" rx="14" fill={`url(#${uid}-wing)`} />
          <rect x="4" y="88" width="66" height="54" rx="14" fill={`url(#${uid}-wingShine)`} />
          <g stroke="#ffffff" strokeOpacity=".35" strokeWidth="2">
            <line x1="26" y1="90" x2="26" y2="140" />
            <line x1="48" y1="90" x2="48" y2="140" />
            <line x1="6" y1="115" x2="68" y2="115" />
          </g>
          <rect x="66" y="108" width="14" height="14" rx="4" fill="#c7ccff" />
        </g>
        <g>
          <rect x="190" y="88" width="66" height="54" rx="14" fill={`url(#${uid}-wing)`} />
          <rect x="190" y="88" width="66" height="54" rx="14" fill={`url(#${uid}-wingShine)`} />
          <g stroke="#ffffff" strokeOpacity=".35" strokeWidth="2">
            <line x1="212" y1="90" x2="212" y2="140" />
            <line x1="234" y1="90" x2="234" y2="140" />
            <line x1="192" y1="115" x2="254" y2="115" />
          </g>
          <rect x="180" y="108" width="14" height="14" rx="4" fill="#c7ccff" />
        </g>

        {/* body */}
        <rect x="76" y="58" width="108" height="118" rx="34" fill={`url(#${uid}-body)`} />
        <rect x="84" y="64" width="92" height="40" rx="22" fill="#ffffff" opacity=".7" />

        {/* small dish on the right shoulder */}
        <ellipse cx="186" cy="74" rx="14" ry="9" fill="#c7ccff" transform="rotate(-25 186 74)" />
        <ellipse cx="186" cy="74" rx="9" ry="5" fill="#eef0ff" transform="rotate(-25 186 74)" />

        {/* face */}
        {mood === "wink" ? (
          <>
            <path d="M100 110 q10 -10 20 0" stroke="#1b1d3a" strokeWidth="6" strokeLinecap="round" fill="none" />
            <ellipse cx="150" cy="110" rx="11" ry="13" fill="#1b1d3a" />
            <circle cx="154" cy="104" r="4" fill="#fff" />
          </>
        ) : (
          <>
            <ellipse cx="110" cy="110" rx="11" ry="13" fill="#1b1d3a" />
            <ellipse cx="150" cy="110" rx="11" ry="13" fill="#1b1d3a" />
            <circle cx="114" cy="104" r="4" fill="#fff" />
            <circle cx="154" cy="104" r="4" fill="#fff" />
          </>
        )}
        <circle cx="94" cy="128" r="10" fill={`url(#${uid}-cheek)`} />
        <circle cx="166" cy="128" r="10" fill={`url(#${uid}-cheek)`} />
        <path d="M116 138 q14 14 28 0" stroke="#1b1d3a" strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* feet / thrusters */}
        <rect x="98" y="172" width="22" height="16" rx="8" fill="#9aa3c7" />
        <rect x="140" y="172" width="22" height="16" rx="8" fill="#9aa3c7" />
        <ellipse cx="109" cy="192" rx="8" ry="5" fill="#ffb347" opacity=".9" />
        <ellipse cx="151" cy="192" rx="8" ry="5" fill="#ffb347" opacity=".9" />

        {/* props */}
        {prop === "map" && (
          <g transform="translate(150 138) rotate(10)">
            <rect x="0" y="0" width="64" height="48" rx="8" fill="#fff6d6" stroke="#f0c36b" strokeWidth="3" />
            <path d="M8 36 L22 18 L34 30 L50 10" stroke="#3b46f1" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="10" r="5" fill="#ff6b6b" />
            <path d="M8 12 h18 M8 20 h10" stroke="#f0c36b" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}
        {prop === "cap" && (
          <g transform="translate(130 50)">
            <path d="M-52 -6 L0 -28 L52 -6 L0 16 Z" fill="#1b1d3a" />
            <path d="M-30 2 v18 q30 18 60 0 v-18" fill="#2a2d5a" />
            <path d="M52 -6 v22" stroke="#ffb347" strokeWidth="3" />
            <circle cx="52" cy="18" r="4" fill="#ffb347" />
          </g>
        )}
        {prop === "headset" && (
          <g>
            <path d="M84 100 q-14 -44 46 -50 q60 6 46 50" stroke="#1b1d3a" strokeWidth="7" fill="none" strokeLinecap="round" />
            <rect x="72" y="92" width="16" height="26" rx="7" fill="#1b1d3a" />
            <rect x="172" y="92" width="16" height="26" rx="7" fill="#1b1d3a" />
            <path d="M88 118 q10 26 36 26" stroke="#1b1d3a" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="124" cy="144" r="5" fill="#ff6b6b" />
          </g>
        )}
        {prop === "flag" && (
          <g transform="translate(196 118)">
            <rect x="0" y="-30" width="4" height="78" rx="2" fill="#9aa3c7" />
            <path d="M4 -30 h44 l-10 14 l10 14 h-44 z" fill="#ff6b6b" />
            <circle cx="22" cy="-16" r="5" fill="#fff" />
          </g>
        )}
      </g>
    </motion.svg>
  );
}
