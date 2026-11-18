import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { CloseIcon, ChevronLeft } from './Icons.jsx';

const fadeIn = keyframes`from { opacity: 0 } to { opacity: 1 }`;
const fadeOut = keyframes`from { opacity: 1 } to { opacity: 0 }`;
const popIn = keyframes`from { opacity: 0; transform: translateY(18px) scale(0.97) } to { opacity: 1; transform: none }`;
const popOut = keyframes`from { opacity: 1; transform: none } to { opacity: 0; transform: translateY(12px) scale(0.98) }`;

const Scrim = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 16px;
  background: var(--scrim);
  backdrop-filter: blur(6px);
  animation: ${(p) => (p.$closing ? fadeOut : fadeIn)} 0.28s ease both;
`;

const Panel = styled.div`
  position: relative;
  width: 100%;
  max-width: ${(p) => p.$width || 460}px;
  max-height: min(92vh, 860px);
  display: flex;
  flex-direction: column;
  background: var(--surface-solid);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 26px;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  animation: ${(p) => (p.$closing ? popOut : popIn)} 0.3s cubic-bezier(0.22, 0.61, 0.36, 1) both;
  overflow: hidden;
`;

export const CloseButton = styled.button`
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 0;
  display: grid;
  place-items: center;
  background: var(--surface-2);
  color: var(--text);

  &:hover {
    background: var(--accent-soft);
  }
`;

export const BackButton = styled.button`
  flex: none;
  height: 40px;
  padding: 0 16px 0 10px;
  border-radius: 999px;
  border: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  background: var(--surface-2);
  color: var(--text);
  transition: background-color 0.25s ease, transform 0.25s var(--ease);

  &:hover {
    background: var(--accent-soft);
  }
  &:hover svg {
    transform: translateX(-2px);
  }
  svg {
    transition: transform 0.25s var(--ease);
  }
`;

/* Keeps the modal mounted for the exit animation so it never just vanishes. */
export default function Modal({ open, onClose, label, width, children }) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement;
      setMounted(true);
      setClosing(false);
      return undefined;
    }
    if (mounted) {
      setClosing(true);
      const t = setTimeout(() => {
        setMounted(false);
        setClosing(false);
        lastFocus.current?.focus?.();
      }, 280);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mounted) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => {
      const target = panelRef.current?.querySelector('[data-autofocus]') || panelRef.current;
      target?.focus?.();
    }, 60);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <Scrim $closing={closing} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <Panel ref={panelRef} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} $width={width} $closing={closing}>
        {children}
      </Panel>
    </Scrim>,
    document.body
  );
}

export function ModalClose({ onClick }) {
  return (
    <CloseButton type="button" onClick={onClick} aria-label="Close">
      <CloseIcon />
    </CloseButton>
  );
}

export function ModalBack({ onClick, label = 'Back' }) {
  return (
    <BackButton type="button" onClick={onClick} aria-label={label}>
      <ChevronLeft size={20} />
      Back
    </BackButton>
  );
}
