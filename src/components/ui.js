import styled from 'styled-components';

/* Shared building blocks so every page looks like one system. */

export const Page = styled.main`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px clamp(16px, 4vw, 40px) 64px;
`;

export const Panel = styled.section`
  background: var(--surface);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 22px;
  border-radius: 999px;
  border: 1px solid ${(p) => (p.$variant === 'ghost' ? 'var(--border)' : 'var(--accent)')};
  background: ${(p) => (p.$variant === 'ghost' ? 'var(--surface)' : 'var(--accent)')};
  color: ${(p) => (p.$variant === 'ghost' ? 'var(--text)' : 'var(--accent-text)')};
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  backdrop-filter: blur(10px);

  &:hover:not(:disabled) {
    background: ${(p) => (p.$variant === 'ghost' ? 'var(--accent-soft)' : 'var(--accent-hover)')};
    transform: translateY(-1px);
  }
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ButtonLink = Button;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-soft);
`;

const inputBase = `
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
  font-size: 14px;

  &::placeholder { color: var(--text-faint); }
  &:focus { outline: 2px solid var(--focus); outline-offset: 1px; }
`;

export const Input = styled.input`${inputBase}`;
export const Select = styled.select`
  ${inputBase}
  appearance: none;
  padding-right: 40px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238d96a3' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;

  option { background: var(--surface-solid); color: var(--text); }
`;

export const H1 = styled.h1`
  font-size: clamp(26px, 4vw, 38px);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.01em;
`;

export const H2 = styled.h2`
  font-size: clamp(20px, 2.6vw, 26px);
  font-weight: 600;
  letter-spacing: -0.005em;
`;
