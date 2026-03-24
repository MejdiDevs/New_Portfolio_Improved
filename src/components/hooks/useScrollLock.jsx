import { useEffect } from 'react';
import { useLenis } from '../contexts/LenisProvider';

export const useScrollLock = (isLocked) => {
    const lenisRef = useLenis();

    useEffect(() => {
        if (isLocked) {
            document.documentElement.style.overflow = 'hidden';
            if (lenisRef && lenisRef.current) {
                lenisRef.current.stop();
            }
        } else {
            document.documentElement.style.overflow = '';
            if (lenisRef && lenisRef.current) {
                lenisRef.current.start();
            }
        }
        
        return () => {
            document.documentElement.style.overflow = '';
            if (lenisRef && lenisRef.current) {
                lenisRef.current.start();
            }
        };
    }, [isLocked, lenisRef]);
};

export default useScrollLock;
