import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight, KeyIcon, SearchIcon, SwapIcon } from './Icons.jsx';
import { Button } from './ui.js';
import { useApp } from '../context/AppContext.jsx';
import { money } from '../lib/format.js';

const Shell = styled.div`
  position: relative;

  .track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    padding: 4px 2px 6px;
  }
  .track::-webkit-scrollbar { display: none; }
  .track > article {
    flex: 0 0 ${(p) => p.$basis};
    scroll-snap-align: start;
    min-height: 230px;
    border-radius: 22px;
    padding: 24px;
    background: var(--surface);
    backdrop-filter: blur(14px);
    border: 1px solid var(--border);
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  h3 { font-size: 20px; font-weight: 600; line-height: 1.25; }
  .dots { display: flex; justify-content: center; gap: 8px; margin-top: 10px; }
  .dots button {
    width: 9px; height: 9px; padding: 0; border-radius: 99px; border: 0;
    background: var(--text-faint); opacity: 0.5;
    transition: width 0.35s var(--ease), opacity 0.35s ease, background-color 0.35s ease;
  }
  .dots button[aria-current='true'] { width: 26px; opacity: 1; background: var(--text); }
  .nav {
    position: absolute; top: 40%; width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid var(--border); background: var(--surface-solid);
    box-shadow: var(--shadow); display: grid; place-items: center; z-index: 2;
  }
  .nav:hover { background: var(--accent); color: var(--accent-text); }
  .nav.l { left: -12px; } .nav.r { right: -12px; }
  @media (max-width: 700px) { .nav { display: none; } }

  .steps { display: flex; flex-direction: column; gap: 12px; }
  .steps li { display: flex; align-items: center; gap: 12px; font-size: 14.5px; }
  .steps .ic { width: 36px; height: 36px; border-radius: 50%; background: var(--surface-2); display: grid; place-items: center; flex: none; }

  .offer-prices { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .listed { font-size: 12px; color: var(--text-soft); }
  .pill { padding: 8px 14px; border-radius: 999px; background: var(--surface-2); font-weight: 600; font-size: 14px; }
  .pill.offer { background: var(--accent); color: var(--accent-text); }
  .big { font-size: 40px; font-weight: 700; line-height: 1; }
  .muted { color: var(--text-soft); font-size: 14px; }
  .linkbtn { color: var(--text); font-weight: 600; font-size: 14px; display: inline-flex; gap: 6px; align-items: center; margin-top: auto; }
  .linkbtn:hover { text-decoration: underline; text-underline-offset: 4px; }
  .stores { display: flex; gap: 10px; flex-wrap: wrap; margin-top: auto; }
  .hero-card { background: linear-gradient(135deg, #182848, #4b6cb7) !important; color: #fff; border-color: transparent !important; justify-content: flex-end; }
  .hero-card h3 { font-size: 30px; line-height: 1.12; }
  .hero-card em { font-style: normal; color: #a8edea; }
  .hero-card p { color: #dbe4f6; font-size: 13.5px; }
`;

export const StoreBadges = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  a {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    min-height: 46px;
    padding: 6px 16px;
    border-radius: 12px;
    background: #000;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.25);
    line-height: 1.15;
  }
  a small { font-size: 10px; opacity: 0.85; }
  a strong { font-size: 15px; font-weight: 600; }
  a:hover { transform: translateY(-2px); }
`;

export const Stores = () => (
  <StoreBadges>
    <a href="#top" aria-label="Download on the App Store"><small>Download on the</small><strong>App Store</strong></a>
    <a href="#top" aria-label="Get it on Google Play"><small>Get it on</small><strong>Google Play</strong></a>
  </StoreBadges>
);

function HowItWorks() {
  return (
    <article>
      <h3>How it works</h3>
      <ul className="steps">
        <li><span className="ic"><SearchIcon size={18} /></span>Browse and find</li>
        <li><span className="ic"><SwapIcon size={18} /></span>Request or make an offer</li>
        <li><span className="ic"><KeyIcon size={18} /></span>Collect, enjoy, return</li>
      </ul>
    </article>
  );
}

function OfferCard() {
  return (
    <article>
      <div className="offer-prices" aria-hidden="true">
        <div><div className="listed">Listed</div><span className="pill">{money(4500)}</span></div>
        <div><div className="listed">Offer</div><span className="pill offer">{money(4000)}?</span></div>
      </div>
      <h3>Don't like the price? Make an offer.</h3>
      <Link className="linkbtn" to="/vehicle-listings">Browse cars <ChevronRight size={16} /></Link>
    </article>
  );
}

function ReferralCard() {
  const { openSignIn } = useApp();
  return (
    <article>
      <div className="muted">Per referral</div>
      <div className="big">{money(250)}</div>
      <h3>Invite a friend, earn {money(250)}.</h3>
      <p className="muted">Paid when they take their first booking.</p>
      <Button type="button" style={{ alignSelf: 'flex-start', marginTop: 'auto' }} onClick={() => openSignIn('Sign in to get your invite link.')}>Get your link</Button>
    </article>
  );
}

function AppCard() {
  return (
    <article>
      <h3>Get the app</h3>
      <p className="muted">Push updates on offers, requests and trips.</p>
      <div className="stores"><Stores /></div>
    </article>
  );
}

function HeroCard() {
  return (
    <article className="hero-card">
      <h3>Car rental, <em>directly from owners</em></h3>
      <p>Commercial insurance for owners through our insurance partner.</p>
    </article>
  );
}

function Carousel({ children, basis, label }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const count = Array.isArray(children) ? children.length : 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const onScroll = () => {
      const kids = [...el.children];
      const left = el.scrollLeft;
      let best = 0;
      let dist = Infinity;
      kids.forEach((k, i) => {
        const d = Math.abs(k.offsetLeft - el.offsetLeft - left);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const go = (i) => {
    const el = ref.current;
    const k = el?.children[i];
    if (k) el.scrollTo({ left: k.offsetLeft - el.offsetLeft, behavior: 'smooth' });
  };
  const step = (d) => go(Math.min(count - 1, Math.max(0, active + d)));

  return (
    <Shell $basis={basis} aria-label={label}>
      <button type="button" className="nav l" aria-label="Scroll left" onClick={() => step(-1)}><ChevronLeft size={20} /></button>
      <div className="track" ref={ref}>{children}</div>
      <button type="button" className="nav r" aria-label="Scroll right" onClick={() => step(1)}><ChevronRight size={20} /></button>
      <div className="dots">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" aria-label={`Go to item ${i + 1}`} aria-current={active === i} onClick={() => go(i)} />
        ))}
      </div>
    </Shell>
  );
}

const Mobile = styled.div`
  @media (min-width: 901px) { display: none; }
`;
const Desktop = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 32px;
  align-items: center;
  @media (max-width: 900px) { display: none; }

  .hero {
    display: flex; flex-direction: column; gap: 18px; padding: 28px;
    border-radius: 26px; background: var(--surface); backdrop-filter: blur(14px);
    border: 1px solid var(--border); box-shadow: var(--shadow);
  }
  .hero h1 { font-size: clamp(34px, 4.2vw, 52px); line-height: 1.08; font-weight: 700; letter-spacing: -0.02em; }
  .hero h1 em { font-style: normal; color: var(--focus); }
  .hero p { color: var(--text-soft); font-size: 16px; max-width: 460px; }
  .ins { font-size: 12.5px; color: var(--text-faint); }
`;

export default function Promo() {
  return (
    <>
      <Mobile>
        <Carousel basis="min(86%, 360px)" label="Promotions">
          <HeroCard />
          <HowItWorks />
          <OfferCard />
          <ReferralCard />
          <AppCard />
        </Carousel>
      </Mobile>
      <Desktop>
        <div className="hero">
          <h1>Car rental, <em>directly from owners</em></h1>
          <p>Browse cars near you, book in minutes, and collect from the owner.</p>
          <Stores />
          <p className="ins">Commercial insurance for owners through our insurance partner.</p>
        </div>
        <Carousel basis="calc(50% - 8px)" label="Promotions">
          <HowItWorks />
          <OfferCard />
          <ReferralCard />
        </Carousel>
      </Desktop>
    </>
  );
}
