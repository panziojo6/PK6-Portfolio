import { useEffect } from "react";
import Lenis from "lenis";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Projects from "./Projects.jsx";
import Certificates from "./Certificates.jsx";
import Contact from "./Contact.jsx";
import Splash from "./Splash.jsx";
import { CursorGlow, CursorRing, BackToTop, VelocityTicker, useIsTouch } from "./ui.jsx";
import { LuSatellite, LuCrosshair, LuBrain, LuGlobe } from "react-icons/lu";

/* Buttery smooth scrolling (Lenis) + anchor links routed through it. */
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -60, duration: 1.4, easing: (x) => 1 - Math.pow(1 - x, 4) });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    const stop = () => lenis.stop(), start = () => lenis.start();
    window.addEventListener("pk6:lock", stop); window.addEventListener("pk6:unlock", start);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); document.removeEventListener("click", onClick); window.removeEventListener("pk6:lock", stop); window.removeEventListener("pk6:unlock", start); };
  }, []);
}

export default function App() {
  useSmoothScroll();
  const touch = useIsTouch();
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <CursorGlow />
      {!touch && <CursorRing />}
      <Splash />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <VelocityTicker baseVelocity={2} className="ticker-outline">
          Sentinel-2 <LuSatellite /> GNSS RTK <LuCrosshair /> Deep learning <LuBrain /> Remote sensing <LuGlobe />{" "}
        </VelocityTicker>
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
