import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import {
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsappIcon,
  XIcon,
  YoutubeIcon,
} from './Icons.jsx';

const Wrap = styled.footer`
  margin-top: 48px;
  background: var(--surface);
  backdrop-filter: blur(16px);
  border-top: 1px solid var(--border);
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px clamp(16px, 4vw, 40px) 28px;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 2fr);
  gap: 40px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }

  .contact {
    display: flex;
    flex-direction: column;
    gap: 14px;
    color: var(--text-soft);
    font-size: 14px;
  }
  .contact a, .contact span.row {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .contact a:hover { color: var(--text); }

  .cols {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
    @media (max-width: 520px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  h3 { font-size: 14px; font-weight: 600; margin-bottom: 14px; }
  li { margin-bottom: 10px; }
  li a { font-size: 14px; color: var(--text-soft); }
  li a:hover { color: var(--text); text-decoration: underline; text-underline-offset: 4px; }

  .social {
    display: flex;
    gap: 10px;
    a {
      width: 40px; height: 40px; border-radius: 50%;
      border: 1px solid var(--border);
      display: grid; place-items: center; color: var(--text-soft);
    }
    a:hover { color: var(--text); background: var(--accent-soft); }
  }
`;

const Bottom = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 18px clamp(16px, 4vw, 40px) 28px;
  border-top: 1px solid var(--border);
  text-align: center;
  font-size: 13px;
  color: var(--text-faint);
`;

export default function Footer() {
  return (
    <Wrap>
      <Inner>
        <div className="contact">
          <Logo />
          <span className="row"><PinIcon size={18} /> Lusaka, Kitwe, Ndola &amp; Livingstone</span>
          <a href="tel:+260970000000"><PhoneIcon size={18} /> +260 97 000 0000</a>
          <a href="https://wa.me/260970000000" target="_blank" rel="noreferrer">
            <WhatsappIcon size={18} /> Chat to us on WhatsApp
          </a>
          <a href="mailto:info@mcrentalcars.example"><MailIcon size={18} /> info@mcrentalcars.example</a>
        </div>

        <div>
          <div className="cols">
            <div>
              <h3>How it works</h3>
              <ul>
                <li><Link to="/vehicle-listings">Rent Cars</Link></li>
                <li><Link to="/list-your-car">List Your Car</Link></li>
                <li><Link to="/vehicle-listings?tag=Chauffeur">Chauffeur Services</Link></li>
                <li><Link to="/faqs">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3>Resources</h3>
              <ul>
                <li><Link to="/help-center">Help Center</Link></li>
                <li><Link to="/terms-use">Terms of use</Link></li>
                <li><Link to="/trust-and-safety">Trust and safety</Link></li>
                <li><Link to="/sustainability">Sustainability</Link></li>
              </ul>
            </div>
            <div>
              <h3>Policy</h3>
              <ul>
                <li><Link to="/privacy-policy">Privacy policy</Link></li>
                <li><Link to="/policy">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <h3 style={{ marginTop: 28 }}>Follow Us</h3>
          <div className="social">
            <a href="#top" aria-label="X"><XIcon size={18} /></a>
            <a href="#top" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
            <a href="#top" aria-label="Instagram"><InstagramIcon size={18} /></a>
            <a href="#top" aria-label="YouTube"><YoutubeIcon size={18} /></a>
          </div>
        </div>
      </Inner>
      <Bottom>Copyright 2026. M&amp;C Rental Cars All Rights Reserved</Bottom>
    </Wrap>
  );
}
