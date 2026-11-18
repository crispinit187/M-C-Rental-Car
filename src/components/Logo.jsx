import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* The M&C Cars logo (public/logo.png). The artwork is dark on white, so it
   sits on a white tile and stays readable in both themes. */
const Wrap = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  line-height: 1;

  .mark {
    flex: none;
    padding: 2px 5px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid var(--border);
    display: grid;
    place-items: center;
  }
  .mark img { height: 42px; width: auto; max-width: none; display: block; }

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
      <span className="mark"><img src={`${import.meta.env.BASE_URL}logo.png`} alt="M&C Cars" width="62" height="46" /></span>
      {showWords && (
        <span className="words">
          <span className="name">M&amp;C Rental Cars</span>
          <span className="tag">Rent · List · Earn</span>
        </span>
      )}
    </Wrap>
  );
}
