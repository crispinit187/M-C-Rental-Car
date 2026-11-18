import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal, { ModalClose, ModalBack } from './Modal.jsx';
import Logo from './Logo.jsx';
import { Button, Input, Field } from './ui.js';
import { CheckIcon } from './Icons.jsx';
import { useApp } from '../context/AppContext.jsx';

const swap = keyframes`from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none }`;

const Body = styled.div`
  padding: 20px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  .top { display: flex; justify-content: space-between; align-items: center; }
  .brand { align-self: flex-start; }
  h2 { font-size: 30px; font-weight: 600; letter-spacing: -0.01em; }
  p { color: var(--text-soft); font-size: 14px; }
  .reason { color: var(--text); font-weight: 500; }
  .error { color: var(--danger); font-size: 13px; }
  .fine { text-align: center; font-size: 12.5px; color: var(--text-faint); }
  .step { display: flex; flex-direction: column; gap: 18px; animation: ${swap} 0.4s var(--ease) both; }
  .sent {
    width: 52px; height: 52px; border-radius: 50%;
    display: grid; place-items: center;
    background: var(--accent-soft); color: var(--text);
  }
  .link-btn {
    background: none; border: 0; padding: 0; color: var(--text);
    text-decoration: underline; text-underline-offset: 4px; font-size: 14px; align-self: flex-start;
  }
`;

export default function SignInModal() {
  const { signIn, closeSignIn } = useApp();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!signIn.open) {
      const t = setTimeout(() => {
        setSent(false);
        setError('');
      }, 320);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [signIn.open]);

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSent(true); // mock: no email is actually sent
  };

  return (
    <Modal open={signIn.open} onClose={closeSignIn} label="Sign in" width={440}>
      <Body>
        <div className="top">
          <ModalBack onClick={sent ? () => setSent(false) : closeSignIn} label={sent ? 'Back to email' : 'Back'} />
          <ModalClose onClick={closeSignIn} />
        </div>

        <div className="brand"><Logo /></div>

        {!sent ? (
          <form className="step" key="form" onSubmit={submit} noValidate>
            <h2>Welcome back.</h2>
            {signIn.reason && <p className="reason">{signIn.reason}</p>}
            <p>Enter your email — we'll send a magic link. No passwords.</p>
            <Field>
              EMAIL
              <Input
                data-autofocus
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
              />
            </Field>
            {error && <p className="error" role="alert">{error}</p>}
            <Button type="submit">Send magic link</Button>
            <p className="fine">No password needed. We'll email you a one-tap link to sign in.</p>
          </form>
        ) : (
          <div className="step" key="sent">
            <span className="sent"><CheckIcon size={26} /></span>
            <h2>Check your inbox.</h2>
            <p>We sent a one-tap sign-in link to <strong>{email}</strong>. This is a prototype, so no email is sent.</p>
            <button type="button" className="link-btn" onClick={() => setSent(false)}>Use a different email</button>
            <Button type="button" $variant="ghost" onClick={closeSignIn}>Close</Button>
          </div>
        )}
      </Body>
    </Modal>
  );
}
