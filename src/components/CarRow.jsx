import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CarCard from './CarCard.jsx';
import Reveal from './Reveal.jsx';
import { ChevronLeft, ChevronRight } from './Icons.jsx';

const Section = styled.section`
  position: relative;
  padding-top: 8px;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 14px;
    padding: 4px 2px;
  }
  h2 { text-shadow: var(--head-shadow); font-size: clamp(20px, 2.4vw, 26px); font-weight: 600; }
  .sub { font-size: 14px; color: var(--text-soft); margin-top: 2px; }
  .all { text-shadow: var(--head-shadow);
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    display: inline-flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    padding: 6px 4px;
  }
  .all:hover { text-decoration: underline; text-underline-offset: 4px; }

  .track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x proximity;
    scroll-behavior: smooth;
    padding: 4px 2px 18px;
    scrollbar-width: none;
  }
  .track::-webkit-scrollbar { display: none; }
  .track > * {
    flex: 0 0 clamp(210px, 22vw, 262px);
    scroll-snap-align: start;
  }

  .arrow {
    position: absolute;
    top: 50%;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: var(--surface-solid);
    box-shadow: var(--shadow);
    display: grid;
    place-items: center;
    transform: translateY(-20%);
    z-index: 2;
  }
  .arrow:hover { background: var(--accent); color: var(--accent-text); }
  .arrow.l { left: -10px; }
  .arrow.r { right: -10px; }
  @media (max-width: 700px) { .arrow { display: none; } }
`;

export default function CarRow({ id, title, subtitle, cars, to, allLabel }) {
  const ref = useRef(null);
  if (!cars.length) return null;
  const scroll = (dir) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };
  return (
    <Reveal>
      <Section id={id} aria-labelledby={`${id}-h`}>
        <div className="head">
          <div>
            <h2 id={`${id}-h`}>{title}</h2>
            {subtitle && <p className="sub">{subtitle}</p>}
          </div>
          <Link className="all" to={to} aria-label={`See all ${allLabel || title}`}>
            See all <ChevronRight size={16} />
          </Link>
        </div>
        <button type="button" className="arrow l" aria-label="Scroll left" onClick={() => scroll(-1)}>
          <ChevronLeft size={20} />
        </button>
        <div className="track" ref={ref}>
          {cars.map((c) => (
            <CarCard key={c.id} car={c} />
          ))}
        </div>
        <button type="button" className="arrow r" aria-label="Scroll right" onClick={() => scroll(1)}>
          <ChevronRight size={20} />
        </button>
      </Section>
    </Reveal>
  );
}
