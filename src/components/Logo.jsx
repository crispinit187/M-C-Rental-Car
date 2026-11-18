import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* TEMPORARY LOGO. Replace this one component (or swap the markup for an
   <img> of the real logo) and every page picks it up. */
const Wrap = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  line-height: 1;

  .mark {
    flex: none;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: var(--accent);
    color: var(--accent-text);
    display: grid;
    place-items: center;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: -0.02em;
  }

  .words {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .name {
    font-weight: 700;
    font-size: 17px;
    letter-spacing: 0.01em;
  }

  .tag {
    font-size: 9.5px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--text-soft);
  }
`;

export default function Logo({ showWords = true }) {
  return (
    <Wrap to="/" aria-label="M&C Rental Cars home">
      <span className="mark" aria-hidden="true">M&amp;C</span>
      {showWords && (
        <span className="words">
          <span className="name">M&amp;C Rental Cars</span>
          <span className="tag">Rent · List · Earn</span>
        </span>
      )}
    </Wrap>
  );
}
