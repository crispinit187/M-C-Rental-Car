import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  opacity: ${(p) => (p.$in ? 1 : 0)};
  transform: ${(p) => (p.$in ? 'none' : 'translateY(22px)')};
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) !important;
`;

/* Fades sections in as they scroll into view. */
export default function Reveal({ children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return (
    <Box ref={ref} $in={seen} {...rest}>
      {children}
    </Box>
  );
}
