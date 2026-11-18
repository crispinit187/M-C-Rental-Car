import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle.js';
import ThemeBackground from './components/ThemeBackground.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SignInModal from './components/SignInModal.jsx';
import SearchModal from './components/SearchModal.jsx';
import Home from './pages/Home.jsx';
import Listings from './pages/Listings.jsx';
import CarDetail from './pages/CarDetail.jsx';
import {
  CookiePolicy,
  Faqs,
  HelpCenter,
  LearnMore,
  ListYourCar,
  NotFound,
  Privacy,
  Sustainability,
  Terms,
  TrustSafety,
} from './pages/Content.jsx';

const enter = keyframes`from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none }`;

const Shell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .page { flex: 1; animation: ${enter} 0.5s var(--ease) both; }
`;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <GlobalStyle />
      <ThemeBackground />
      <ScrollToTop />
      <Shell id="top">
        <Header />
        <div className="page" key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/vehicle-listings" element={<Listings />} />
            <Route path="/vehicle-listings/:id" element={<CarDetail />} />
            <Route path="/list-your-car" element={<ListYourCar />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/trust-and-safety" element={<TrustSafety />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/terms-use" element={<Terms />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/policy" element={<CookiePolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Shell>
      <SignInModal />
      <SearchModal />
    </>
  );
}
