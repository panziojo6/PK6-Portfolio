import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Projects from "./Projects.jsx";
import Certificates from "./Certificates.jsx";
import Contact from "./Contact.jsx";
import Splash from "./Splash.jsx";
import { CursorGlow, CursorRing, BackToTop } from "./ui.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <CursorGlow />
      <CursorRing />
      <Splash />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <div className="wrap"><div className="divider" /></div>
        <Projects />
        <Skills />
        <div className="wrap"><div className="divider" /></div>
        <Certificates />
      </main>
      <Contact />
      <BackToTop />
    </>
  );
}
