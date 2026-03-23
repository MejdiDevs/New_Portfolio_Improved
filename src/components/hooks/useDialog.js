import { useState, useEffect } from 'react';

/**
 * Custom hook to manage dialog/modal state
 * Replaces direct DOM manipulation with React state
 */
export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const openDialog = (dialogContent = null) => {
        setContent(dialogContent);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        // Clear content after animation
        setTimeout(() => {
            setContent(null);
        }, 400);
    };

    // Close dialog on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                closeDialog();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when dialog is open
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
        content,
        openDialog,
        closeDialog
    };
};

