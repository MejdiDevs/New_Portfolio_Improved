import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis'; // make sure lenis is installed

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children, externalRef }) => {
    const internalRef = useRef(null);
    const lenisRef = externalRef || internalRef;
  
    useEffect(() => {
      const lenis = new Lenis({ duration: 1.2, smoothWheel: true, lerp: 0.15 });
      const raf = (time) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      lenisRef.current = lenis;

    return () => lenis.destroy();
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
};
