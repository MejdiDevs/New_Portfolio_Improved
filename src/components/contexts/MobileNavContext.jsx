import { createContext, useContext } from 'react';
import { useMobileNav } from '../hooks/useMobileNav';

const MobileNavContext = createContext(null);

export const MobileNavProvider = ({ children }) => {
    const mobileNav = useMobileNav();
    
    return (
        <MobileNavContext.Provider value={mobileNav}>
            {children}
        </MobileNavContext.Provider>
    );
};

export const useMobileNavContext = () => {
    const context = useContext(MobileNavContext);
    if (!context) {
        throw new Error('useMobileNavContext must be used within MobileNavProvider');
    }
    return context;
};

