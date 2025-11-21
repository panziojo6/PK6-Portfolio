import { Layout, ConfigProvider, theme } from 'antd';
import HeaderBar from './Header.jsx';
import Hero from './Hero.jsx';
import About from './About.jsx';
import Skills from './Skills.jsx';
import Projects from './Projects.jsx';
import Contact from './Contact.jsx';
import '../css/App.css';

const { Content, Footer } = Layout;

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorBgBase: '#050816',
          colorTextBase: '#f5f5f5',
          colorPrimary: '#9254de',
          borderRadius: 8,
        },
      }}
    >
      <Layout className="app-layout">
        <div className="floating-orb orb-purple"></div>
        <div className="floating-orb orb-cyan"></div>
        <div className="grid-bg"></div>
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
    </ConfigProvider>
  );
}
