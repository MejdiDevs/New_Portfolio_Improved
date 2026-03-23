import React, { createContext, useRef, useLayoutEffect } from 'react';
import Lenis from 'lenis';

export const LenisContext = createContext(null);

export const LenisProvider = ({ children, externalRef }) => {
  const internalRef = useRef(null);
  const lenisRef = externalRef || internalRef; // Use external if provided

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [lenisRef]);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
};
