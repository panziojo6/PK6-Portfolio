import { useState } from 'react';
import { Layout, ConfigProvider, theme } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import HeaderBar from './Header.jsx';
import Hero from './Hero.jsx';
import About from './About.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';
import ParticlesBackground from './ParticlesBackground.jsx';
import CosmicEntities from './CosmicEntities.jsx';
import SplashScreen from './SplashScreen.jsx';
import '../css/App.css';

const { Content, Footer } = Layout;

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgBase: '#02010a',
          colorBgLayout: 'transparent',
          colorTextBase: '#f5f5f5',
          colorPrimary: '#00f0ff',
          colorInfo: '#a855f7',
          borderRadius: 12,
        },
      }}
    >
      <AnimatePresence>
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Layout className="app-layout" style={{ background: 'transparent' }}>
            <ParticlesBackground />
            <CosmicEntities />
            <div className="floating-orb orb-purple"></div>
            <div className="floating-orb orb-cyan"></div>
            <HeaderBar />

            <Content>
              <section id="home" className="section hero-section">
                <div className="section-inner">
                  <Hero />
                </div>
              </section>

              <section id="about" className="section">
                <About />
              </section>

              <section id="skills" className="section section-alt">
                <Skills />
              </section>

              <section id="projects" className="section">
                <Projects />
              </section>

              <section id="contact" className="section section-alt">
                <Contact />
              </section>
            </Content>

            <Footer className="app-footer">
              © {new Date().getFullYear()} Punnawit Korosri · Portfolio
            </Footer>
          </Layout>
        </motion.div>
      )}
    </ConfigProvider>
  );
}
