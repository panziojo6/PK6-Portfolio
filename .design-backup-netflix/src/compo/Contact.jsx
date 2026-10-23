import { motion } from "framer-motion";
import { profile, interests } from "../data/site";
import { Reveal, Magnetic, Icon, useToast, VelocityTicker } from "./ui.jsx";
import { LuSend, LuMail, LuCopy, LuLinkedin, LuArrowUp, LuMapPin, LuSatellite, LuSparkles } from "react-icons/lu";

export default function Contact() {
  const [toast, toastNode] = useToast();
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); toast("Email copied"); }
    catch { toast(profile.email); }
  };

  return (
    <footer id="contact" data-section className="contact">
      <VelocityTicker baseVelocity={-3} className="ticker-outline">Let&apos;s talk <LuSatellite /> Satellites <LuSparkles /> GNSS <LuSatellite /> Machine learning <LuSparkles /> </VelocityTicker>
      <div className="wrap">
        <Reveal className="contact-card glow">
          <span className="contact-orb a" aria-hidden="true" /><span className="contact-orb b" aria-hidden="true" />
          <span className="eyebrow" style={{ justifyContent: "center" }}><LuSend size={14} /> Contact</span>
          <h2 className="contact-title">Working on something spatial?<br />Let&apos;s talk.</h2>
          <p className="contact-sub">Research collaborations, GNSS prototypes, dashboards for spatial data — or just a good conversation about satellites.</p>
          <div className="contact-actions">
            <Magnetic><a className="btn btn-solid" href={`mailto:${profile.email}`}><LuMail size={18} /> <span className="contact-email">{profile.email}</span></a></Magnetic>
            <Magnetic><button type="button" className="btn btn-line" onClick={copy}><LuCopy size={18} /> Copy</button></Magnetic>
            <Magnetic><a className="btn btn-line" href={profile.linkedin} target="_blank" rel="noreferrer"><LuLinkedin size={18} /> LinkedIn</a></Magnetic>
          </div>
          <div className="interest-row">{interests.map((i) => <motion.span className="tag" key={i} whileHover={{ y: -3 }}>{i}</motion.span>)}</div>
        </Reveal>

        <div className="footer">
          <span><LuMapPin size={13} /> © {new Date().getFullYear()} Punnawit Kotosri · {profile.location} · open to remote work</span>
          <div className="footer-links">
            <a href="#top"><LuArrowUp size={14} /> Top</a>
            <a href="#projects">Projects</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer"><LuLinkedin size={14} /> LinkedIn</a>
          </div>
        </div>
      </div>
      {toastNode}
    </footer>
  );
}
