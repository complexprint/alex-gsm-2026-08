import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Layout from "./components/Layout";
import CookieBanner from "./components/CookieBanner";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Trends from "./pages/Trends";
import Publications from "./pages/Publications";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            {/* Deutsche Standard-Routen */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/publications/:id" element={<ArticleDetail />} />
            <Route path="/publikationen" element={<Publications />} />
            <Route path="/publikationen/:id" element={<ArticleDetail />} />

            {/* Englische Routen (/en/...) */}
            <Route path="/en" element={<Home />} />
            <Route path="/en/" element={<Home />} />
            <Route path="/en/about" element={<About />} />
            <Route path="/en/education" element={<Education />} />
            <Route path="/en/experience" element={<Experience />} />
            <Route path="/en/skills" element={<Skills />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/trends" element={<Trends />} />
            <Route path="/en/publications" element={<Publications />} />
            <Route path="/en/publications/:id" element={<ArticleDetail />} />
            <Route path="/en/publikationen" element={<Navigate to="/en/publications" replace />} />
            <Route path="/en/publikationen/:id" element={<ArticleDetail />} />
          </Routes>
        </Layout>
        <CookieBanner />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
