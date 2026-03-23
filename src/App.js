import { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { LenisProvider } from './components/contexts/LenisProvider';
import BackToTopBtn from './components/BackToTopBtn';

import HomePage from './pages/HomePage';
import HighlightsPage from './pages/HighlightsPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

import RedirectPage from './pages/RedirectPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

import { MobileNavProvider } from './components/contexts/MobileNavContext';
import ScrollToTop from './components/utils/ScrollToTop';
import ParticleComponent from './components/Particles';
import Aurora from './components/ArDacityUi/Aurora';
import BottomBlur from './components/BottomBlur';
import InternshipPopup from './components/InternshipPopup';

const App = () => {
  const lenisRef = useRef(null); // ✅ Ref lives here in App

  return (
    <HelmetProvider>
      <Router>
        <MobileNavProvider>
          <LenisProvider externalRef={lenisRef}> {/* ✅ Pass ref to provider */}
            <ScrollToTop />
            <ParticleComponent />

            <Aurora
              colorStops={["#0a7cff", "#0a7cff", "#0a7cff"]}
              amplitude={1}
              blend={1}
            />

            {/* <Galaxy
              starSpeed={0.1}
              density={0.9}
              hueShift={140}
              speed={0.2}
              glowIntensity={0.2}
              saturation={0}
              mouseRepulsion={false}
              repulsionStrength={2}
              twinkleIntensity={0.2}
              rotationSpeed={0}
              transparent
            /> */}
            <BackToTopBtn lenisRef={lenisRef} /> {/* ✅ Pass ref explicitly */}
            {/* <BottomBlur /> */}

            <InternshipPopup />

            <Routes>
              <Route path="*" element={<Navigate to="/" />} />
              <Route exact path="/redirect/:app" element={<RedirectPage />} />

              <Route path="/" element={<HomePage lenisRef={lenisRef} />} />
              <Route exact path="/highlights" element={<HighlightsPage />} />

              <Route exact path="/projects" element={<ProjectsPage />} />
              <Route exact path="/project/:slug" element={<ProjectDetailsPage />} />

              <Route exact path="/skills" element={<SkillsPage />} />
              <Route exact path="/contact" element={<ContactPage />} />
            </Routes>
          </LenisProvider>
        </MobileNavProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
