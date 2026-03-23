import { useState, useEffect } from 'react';

/**
 * Custom hook to manage mobile navigation state
 * Replaces direct DOM manipulation with React state
 */
export const useMobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimated, setIsAnimated] = useState(false);

    const openNav = () => {
        setIsOpen(true);
        setIsAnimated(true);
    };

    const closeNav = () => {
        setIsOpen(false);
        // Delay removing animated class to allow closing animation to play
        setTimeout(() => {
            setIsAnimated(false);
        }, 400); // Match the transition duration (400ms)
    };

    const toggleNav = () => {
        if (isOpen) {
            closeNav();
        } else {
            openNav();
        }
    };

    // Close nav on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeNav();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return {
        isOpen,
        isAnimated,
        openNav,
        closeNav,
        toggleNav
    };
};

