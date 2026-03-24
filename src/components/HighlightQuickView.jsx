import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/highlightQuickView.css';
import useScrollLock from './hooks/useScrollLock';

const HighlightQuickView = ({ highlight, isOpen, onClose }) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [imageError, setImageError] = useState(false);

    useScrollLock(isOpen);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            setImageError(false);
            document.addEventListener('keydown', handleEscape);
        } else if (shouldRender) {
            // Start closing animation
            setIsClosing(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
            }, 300); // Match animation duration
            return () => clearTimeout(timer);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose, shouldRender]);

    if (!shouldRender || !highlight) return null;

    return (
        <div
            className={`highlight_quick_view_overlay ${(isOpen || isClosing) ? 'shown' : ''} ${isClosing ? 'closing' : ''}`}
            onClick={onClose}
            aria-hidden={!isOpen && !isClosing}
            role="dialog"
            aria-modal="true"
            aria-labelledby="highlight-quick-view-title"
        >
            <div
                className={`highlight_quick_view_content ${isClosing ? 'closing' : ''}`}
                onClick={(e) => e.stopPropagation()}
                data-lenis-prevent
                onAnimationEnd={(e) => {
                    if (isClosing && e.animationName === 'zoomOut') {
                        setIsClosing(false);
                    }
                }}
            >
                <button
                    className="close_btn"
                    onClick={onClose}
                    aria-label="Close highlight details"
                >
                    ×
                </button>

                <div className="highlight_quick_view_image">
                    {!imageError && highlight.image ? (
                        <img
                            src={highlight.image}
                            alt={highlight.event}
                            onError={() => setImageError(true)}
                            className="main_image"
                        />
                    ) : (
                        <div className="image_fallback"></div>
                    )}
                </div>

                <div className="highlight_quick_view_info">
                    <span className="highlight_type">{highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}</span>
                    <h2 id="highlight-quick-view-title">{highlight.title}</h2>
                    <span className="highlight_event">{highlight.event}</span>
                    <span className="highlight_date">{highlight.date}</span>

                    {highlight.tags && highlight.tags.length > 0 && (
                        <div className="tag_wrapper">
                            {highlight.tags.map((tag, idx) => (
                                <div className="tag" key={`highlight-tag-${idx}`}>{tag}</div>
                            ))}
                        </div>
                    )}

                    <div className="description" data-lenis-prevent>
                        <p>{highlight.description}</p>
                    </div>

                    {highlight.extendedInfo && (
                        <div className="extended_info">
                            <div className="info_grid">
                                <div className="info_item">
                                    <span className="info_label">Team Size:</span>
                                    <span className="info_value">{highlight.extendedInfo.teamSize}</span>
                                </div>
                                <div className="info_item">
                                    <span className="info_label">Duration:</span>
                                    <span className="info_value">{highlight.extendedInfo.duration}</span>
                                </div>
                                <div className="info_item">
                                    <span className="info_label">Prize:</span>
                                    <span className="info_value">{highlight.extendedInfo.prize}</span>
                                </div>
                            </div>


                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HighlightQuickView;
