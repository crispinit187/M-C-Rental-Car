import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Reveal from './Reveal.jsx';
import { Button, ButtonLink } from './ui.js';
import { ChevronLeft, ChevronRight, StarIcon } from './Icons.jsx';
import { CARS, PRESS, TESTIMONIALS } from '../data/cars.js';
import { imageUrl } from '../lib/format.js';

/* ---------- Browse by category chips ---------- */

const Chips = styled.nav`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 4px 2px;
  &::-webkit-scrollbar { display: none; }

  a {
    flex: none;
    min-height: 44px;
    padding: 0 20px;
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    backdrop-filter: blur(10px);
    font-size: 14px;
    font-weight: 500;
  }
  a:hover { background: var(--accent); color: var(--accent-text); border-color: var(--accent); transform: translateY(-1px); }
`;

const CHIPS = [
  ['All', '/vehicle-listings'],
  ['Economy', '#tag-economy'],
  ['SUV', '#tag-suv'],
  ['Sport', '#tag-sport'],
  ['Monthly', '#tag-monthly'],
  ['Chauffeur', '#tag-chauffeur'],
  ['Event', '#tag-event'],
];

export function CategoryChips() {
  const jump = (e, href) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <Reveal>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, textShadow: 'var(--head-shadow)' }}>Browse by category</h2>
      <Chips aria-label="Browse by category">
        {CHIPS.map(([label, href]) =>
          href.startsWith('#') ? (
            <a key={label} href={href} onClick={(e) => jump(e, href)}>{label}</a>
          ) : (
            <Link key={label} to={href}>{label}</Link>
          )
        )}
      </Chips>
    </Reveal>
  );
}

/* ---------- Earn with your car ---------- */

const Earn = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  border-radius: 28px;
  overflow: hidden;
  background: var(--surface);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  @media (max-width: 860px) { grid-template-columns: 1fr; }

  .copy { padding: clamp(24px, 4vw, 48px); display: flex; flex-direction: column; gap: 18px; }
  h2 { font-size: clamp(26px, 3.4vw, 38px); font-weight: 700; line-height: 1.12; letter-spacing: -0.01em; }
  .count { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; color: var(--text-soft); }
  .count strong { font-size: 22px; color: var(--text); }
  ul { display: flex; flex-direction: column; gap: 10px; }
  li { display: flex; gap: 10px; align-items: flex-start; font-size: 14.5px; color: var(--text-soft); }
  li::before { content: ''; flex: none; width: 8px; height: 8px; margin-top: 8px; border-radius: 50%; background: var(--focus); }
  .split { display: flex; gap: 14px; align-items: stretch; }
  .split div { flex: 1; padding: 14px 16px; border-radius: 16px; background: var(--surface-2); }
  .split b { display: block; font-size: 28px; line-height: 1.1; }
  .split span { font-size: 12.5px; color: var(--text-soft); }
  .btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .photo { position: relative; min-height: 280px; }
  .photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
`;

export function EarnSection({ onList }) {
  return (
    <Reveal>
      <Earn aria-labelledby="earn-h">
        <div className="copy">
          <h2 id="earn-h">Earn with your car</h2>
          <p className="count">Join vehicles already earning <strong>128</strong></p>
          <p style={{ color: 'var(--text-soft)' }}>Turn your parked car into a source of income by listing it on M&amp;C Rental Cars.</p>
          <ul>
            <li>We handle bookings, reliable leads, and constant support</li>
            <li>Comprehensive commercial insurance for owners</li>
            <li>Vetted, trustworthy renters — every trip reviewed</li>
          </ul>
          <div className="split">
            <div><b>20%</b><span>commission</span></div>
            <div><b>80%</b><span>owners keep, less insurance charges</span></div>
          </div>
          <div className="btns">
            <Button type="button" onClick={onList}>List your car</Button>
            <ButtonLink as={Link} to="/learn-more" $variant="ghost">Learn More</ButtonLink>
          </div>
        </div>
        <div className="photo">
          <img src={imageUrl('car-17.jpeg')} alt="A Porsche 911 listed on M&C Rental Cars" loading="lazy" />
        </div>
      </Earn>
    </Reveal>
  );
}

/* ---------- Horizontal scroller used by testimonials and press ---------- */

const Scroller = styled.section`
  position: relative;
  .head {
    margin-bottom: 16px; padding: 4px 2px; text-shadow: var(--head-shadow);
  }
  .head h2 { font-size: clamp(22px, 2.8vw, 30px); font-weight: 600; }
  .head p { color: var(--text-soft); font-size: 14.5px; margin-top: 4px; }
  .track {
    display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x proximity;
    scroll-behavior: smooth; padding: 4px 2px 16px; scrollbar-width: none;
  }
  .track::-webkit-scrollbar { display: none; }
  .track > * { flex: 0 0 clamp(250px, 28vw, 330px); scroll-snap-align: start; }
  .arrow {
    position: absolute; top: 55%; width: 44px; height: 44px; border-radius: 50%;
    border: 1px solid var(--border); background: var(--surface-solid); box-shadow: var(--shadow);
    display: grid; place-items: center; z-index: 2;
  }
  .arrow:hover { background: var(--accent); color: var(--accent-text); }
  .arrow.l { left: -10px; } .arrow.r { right: -10px; }
  @media (max-width: 700px) { .arrow { display: none; } }
`;

function HScroll({ title, subtitle, label, children }) {
  const ref = useRef(null);
  const scroll = (d) => ref.current?.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <Reveal>
      <Scroller aria-label={title}>
        <div className="head">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <button type="button" className="arrow l" aria-label="Scroll left" onClick={() => scroll(-1)}><ChevronLeft size={20} /></button>
        <div className="track" ref={ref} role="list" aria-label={label}>{children}</div>
        <button type="button" className="arrow r" aria-label="Scroll right" onClick={() => scroll(1)}><ChevronRight size={20} /></button>
      </Scroller>
    </Reveal>
  );
}

const Quote = styled.article`
  display: flex; flex-direction: column; gap: 12px; padding: 20px;
  border-radius: 20px; background: var(--surface); backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
  .who b { display: block; font-size: 15px; }
  .who span { font-size: 12.5px; color: var(--text-soft); }
  .stars { display: inline-flex; color: var(--star); }
  blockquote { margin: 0; font-size: 14.5px; line-height: 1.55; }
  a.car {
    margin-top: auto; display: flex; align-items: center; gap: 10px; padding: 8px;
    border-radius: 14px; background: var(--surface-2); font-size: 13px;
  }
  a.car:hover { background: var(--accent-soft); }
  a.car img { width: 56px; height: 42px; border-radius: 8px; object-fit: cover; }
  a.car small { display: block; font-size: 11px; color: var(--text-faint); }
`;

export function Testimonials() {
  return (
    <HScroll title="What Our Users Say" subtitle="Real experiences from drivers and renters across Zambia." label="Customer reviews">
      {TESTIMONIALS.map((t, i) => {
        const car = CARS[t.carIndex - 1];
        return (
          <Quote key={i} role="listitem">
            <header>
              <div className="who"><b>{t.name}</b><span>{t.city}</span></div>
              <span className="stars" role="img" aria-label={`${t.stars} stars`}>
                {Array.from({ length: t.stars }, (_, s) => <StarIcon key={s} size={16} />)}
              </span>
            </header>
            <blockquote>“{t.text}”</blockquote>
            <Link className="car" to={`/vehicle-listings/${car.id}`}>
              <img src={imageUrl(car.images[0])} alt="" loading="lazy" />
              <span><small>Rented</small>{car.year} {car.name}</span>
            </Link>
          </Quote>
        );
      })}
    </HScroll>
  );
}

const PressCard = styled.a`
  display: flex; flex-direction: column; gap: 10px; padding: 20px; min-height: 170px;
  border-radius: 20px; background: var(--surface); backdrop-filter: blur(12px);
  border: 1px solid var(--border); color: var(--text);
  &:hover { transform: translateY(-3px); border-color: var(--text-faint); }
  .outlet { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-soft); }
  h3 { font-size: 15px; font-weight: 600; line-height: 1.4; }
  .cta { margin-top: auto; font-size: 13.5px; font-weight: 600; display: inline-flex; gap: 6px; align-items: center; }
`;

export function Press() {
  return (
    <HScroll title="In the press" subtitle="M&C Rental Cars featured across leading business, finance and media platforms. (Sample content.)" label="Press coverage">
      {PRESS.map((p) => (
        <PressCard key={p.outlet} href="#top" role="listitem" onClick={(e) => e.preventDefault()}>
          <span className="outlet">{p.outlet}</span>
          <h3>{p.headline}</h3>
          <span className="cta">{p.cta} <ChevronRight size={16} /></span>
        </PressCard>
      ))}
    </HScroll>
  );
}
