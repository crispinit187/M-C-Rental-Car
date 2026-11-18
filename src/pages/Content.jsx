import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BackLink from '../components/BackLink.jsx';
import { Button, H1, Page } from '../components/ui.js';
import { useApp } from '../context/AppContext.jsx';
import { ScanIcon, UploadIcon } from '../components/Icons.jsx';
import { COOKIES, FAQS, HELP, LEARN_MORE, PRIVACY, SUSTAIN, TERMS, TRUST } from '../data/content.js';

const Doc = styled.article`
  max-width: 860px;
  margin: 0 auto;
  padding: clamp(22px, 4vw, 40px);
  border-radius: 26px;
  background: var(--surface);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);

  h1 { margin-bottom: 14px; }
  .intro { color: var(--text-soft); font-size: 15.5px; margin-bottom: 8px; }
  h2 { font-size: 22px; font-weight: 600; margin: 32px 0 6px; }
  h3 { font-size: 16.5px; font-weight: 600; margin: 20px 0 4px; }
  p, li { color: var(--text-soft); font-size: 15px; line-height: 1.7; }
  ul { margin-top: 6px; display: flex; flex-direction: column; gap: 4px; }
  li { padding-left: 18px; position: relative; }
  li::before { content: ''; position: absolute; left: 2px; top: 12px; width: 6px; height: 6px; border-radius: 50%; background: var(--focus); }
  .step { display: grid; grid-template-columns: 38px 1fr; gap: 14px; margin-top: 16px; }
  .step .n { width: 38px; height: 38px; border-radius: 50%; background: var(--accent); color: var(--accent-text); display: grid; place-items: center; font-weight: 700; font-size: 14px; }
  .step h3 { margin: 0 0 2px; }
  .cta { margin-top: 28px; display: flex; gap: 12px; flex-wrap: wrap; }
`;

const Shell = ({ children }) => (
  <Page>
    <BackLink to="/" />
    <Doc>{children}</Doc>
  </Page>
);

export function Faqs() {
  return (
    <Shell>
      <H1>{FAQS.title}</H1>
      {FAQS.groups.map((g) => (
        <section key={g.heading}>
          <h2>{g.heading}</h2>
          {g.items.map(([q, a]) => (
            <div key={q}>
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </section>
      ))}
    </Shell>
  );
}

export function HelpCenter() {
  return (
    <Shell>
      <H1>{HELP.title}</H1>
      {HELP.groups.map((g) => (
        <section key={g.heading}>
          <h2>{g.heading}</h2>
          {g.steps.map(([t, d], i) => (
            <div className="step" key={t}>
              <span className="n">{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </section>
      ))}
    </Shell>
  );
}

export function TrustSafety() {
  return (
    <Shell>
      <H1>{TRUST.title}</H1>
      <p className="intro">{TRUST.intro}</p>
      {TRUST.sections.map(([h, items]) => (
        <section key={h}>
          <h2>{h}</h2>
          <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
        </section>
      ))}
    </Shell>
  );
}

export function Sustainability() {
  return (
    <Shell>
      <H1>{SUSTAIN.title}</H1>
      <p className="intro">{SUSTAIN.intro}</p>
      {SUSTAIN.sections.map(([h, items]) => (
        <section key={h}>
          <h2>{h}</h2>
          {items.map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </section>
      ))}
      <p style={{ marginTop: 28 }}>{SUSTAIN.outro}</p>
    </Shell>
  );
}

const Plain = ({ data }) => (
  <Shell>
    <H1>{data.title}</H1>
    <p className="intro">{data.intro}</p>
    {data.sections.map(([h, t]) => (
      <section key={h}>
        <h2>{h}</h2>
        <p>{t}</p>
      </section>
    ))}
  </Shell>
);

export const Terms = () => <Plain data={TERMS} />;
export const Privacy = () => <Plain data={PRIVACY} />;
export const CookiePolicy = () => <Plain data={COOKIES} />;

export function LearnMore() {
  const { openSignIn } = useApp();
  return (
    <Shell>
      <H1>{LEARN_MORE.title}</H1>
      <p className="intro">{LEARN_MORE.intro}</p>
      {LEARN_MORE.sections.map(([h, t]) => (
        <section key={h}>
          <h2>{h}</h2>
          <p>{t}</p>
        </section>
      ))}
      <div className="cta">
        <Button type="button" onClick={() => openSignIn('Sign in to list your car.')}>List your car</Button>
        <Button as={Link} to="/faqs" $variant="ghost">Read the FAQs</Button>
      </div>
    </Shell>
  );
}

const Add = styled.section`
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(22px, 4vw, 40px);
  border-radius: 26px;
  background: var(--surface);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);

  .eyebrow { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-faint); font-weight: 600; }
  h1 { font-size: clamp(26px, 4vw, 36px); }
  p { color: var(--text-soft); font-size: 15px; }
  .drop {
    display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;
    padding: 36px 20px; border-radius: 20px; border: 2px dashed var(--border); background: var(--surface-2);
  }
  .drop:hover { border-color: var(--text-faint); background: var(--accent-soft); }
  .ic { width: 64px; height: 64px; border-radius: 50%; display: grid; place-items: center; background: var(--accent-soft); }
  .read { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
  .read span { font-size: 12.5px; padding: 4px 12px; border-radius: 999px; background: var(--surface-2); color: var(--text-soft); }
`;

export function ListYourCar() {
  const { openSignIn } = useApp();
  return (
    <Page>
      <BackLink to="/" />
      <Add>
        <span className="eyebrow">Owner · Add listing</span>
        <h1>Add listing</h1>
        <p>
          Scan your licence disc to begin. It's the only way to add a car. We read the make, model, registration, VIN
          and colour automatically; you just add what the disc doesn't carry.
        </p>
        <div className="drop">
          <span className="ic"><ScanIcon size={30} /></span>
          <strong>Scan your licence disc</strong>
          <div className="read"><span>Make</span><span>Model</span><span>Registration</span><span>VIN</span><span>Colour</span></div>
          <Button type="button" onClick={() => openSignIn('Sign in to scan your licence disc and add a listing.')}>
            <UploadIcon size={18} /> Scan licence disc
          </Button>
        </div>
      </Add>
    </Page>
  );
}

export function NotFound() {
  return (
    <Shell>
      <H1>Page not found</H1>
      <p className="intro">The page you were looking for doesn't exist or has moved.</p>
      <div className="cta">
        <Button as={Link} to="/">Back to home</Button>
        <Button as={Link} to="/vehicle-listings" $variant="ghost">Browse cars</Button>
      </div>
    </Shell>
  );
}
