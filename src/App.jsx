import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Personal from './pages/Personal';
import Professional from './pages/Professional';
import GalleryPage from './pages/Gallery';
import ThoughtsPage from './pages/Thoughts';
import BlogPost from './pages/BlogPost';
import AllProjects from './pages/AllProjects';
import AllResearch from './pages/AllResearch';
import Library from './pages/Library';
import NotFound from './pages/NotFound';
import { Helmet } from 'react-helmet-async';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <Helmet>
        <title>SUPUS | NOT DEAD YET</title>
        <meta name="description" content="The raw archive. Systems, Hardware, Math. Building things in the dark." />
        <meta property="og:title" content="SUPUS | NOT DEAD YET" />
        <meta property="og:description" content="The raw archive. Systems, Hardware, Math. Building things in the dark." />
        <meta property="og:type" content="website" />
      </Helmet>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/professional" element={<Professional />} />
          <Route path="/professional/projects" element={<AllProjects />} />
          <Route path="/professional/research" element={<AllResearch />} />
          <Route path="/professional/library" element={<Library />} />
          <Route path="/personal/gallery" element={<GalleryPage />} />
          <Route path="/personal/thoughts" element={<ThoughtsPage />} />
          <Route path="/personal/thoughts/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <AnimatedRoutes />
  );
}
