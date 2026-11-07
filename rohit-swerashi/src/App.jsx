import React from "react";
import { Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { RouteCover } from "./components/RouteCover";
import { RouteMeta } from "./components/RouteMeta";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ScrollTrigger } from "./lib/fx";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const Work = React.lazy(() => import("./pages/Work"));
const CaseStudy = React.lazy(() => import("./pages/CaseStudy"));
const Recognition = React.lazy(() => import("./pages/Themes"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const Ai = React.lazy(() => import("./pages/Ai"));
const Expertise = React.lazy(() => import("./pages/Expertise"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function OldWorkCase() {
  const { slug } = useParams();
  return <Navigate to={`/experience/${slug}`} replace />;
}

export default function App() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const timers = [400, 1500, 3500].map((ms) => setTimeout(() => ScrollTrigger.refresh(), ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname]);
  return (
    <>
      <RouteMeta />
      <div id="scale-root">
        <RouteCover />
        <ErrorBoundary>
          <React.Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience" element={<Work />} />
              <Route path="/experience/:slug" element={<CaseStudy />} />
              <Route path="/expertise" element={<Expertise />} />
              <Route path="/work" element={<Navigate to="/experience" replace />} />
              <Route path="/work/:slug" element={<OldWorkCase />} />
              <Route path="/recognition" element={<Recognition />} />
              <Route path="/ai" element={<Ai />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
}
