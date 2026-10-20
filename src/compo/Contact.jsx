import { profile, interests } from "../data/site";
import { Reveal, Magnetic, Icon, useToast } from "./ui.jsx";

export default function Contact() {
  const [toast, toastNode] = useToast();
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); toast("Email copied ✓"); }
    catch { toast(profile.email); }
  };

  return (
    <footer id="contact" data-section className="contact">
      <div className="wrap">
        <Reveal className="contact-card">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Contact</span>
          <h2 className="contact-title">Working on something spatial?<br />Let&apos;s talk.</h2>
          <p className="contact-sub">Research collaborations, GNSS prototypes, dashboards for spatial data — or just a good conversation about satellites.</p>
          <div className="contact-actions">
            <Magnetic><a className="btn btn-solid" href={`mailto:${profile.email}`}><Icon.Mail /> <span className="contact-email">{profile.email}</span></a></Magnetic>
            <Magnetic><button type="button" className="btn btn-line" onClick={copy}><Icon.Copy /> Copy</button></Magnetic>
            <Magnetic><a className="btn btn-line" href={profile.linkedin} target="_blank" rel="noreferrer"><Icon.Linkedin /> LinkedIn</a></Magnetic>
          </div>
          <div className="interest-row">{interests.map((i) => <span className="tag" key={i}>{i}</span>)}</div>
        </Reveal>

        <div className="footer">
          <span>© {new Date().getFullYear()} Punnawit Kotosri · {profile.location} · open to remote work</span>
          <div className="footer-links">
            <a href="#top">Top</a>
            <a href="#projects">Projects</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
      {toastNode}
    </footer>
  );
}
