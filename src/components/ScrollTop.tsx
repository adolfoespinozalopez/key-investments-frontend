import { useEffect, ReactElement } from 'react';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

interface ScrollTopProps {
  children: ReactElement | null;
}

export default function ScrollTop({ children }: ScrollTopProps) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children || null;
}