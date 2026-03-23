import { useEffect, useState } from 'react';
import "../styles/css/feedbacks.css";
import FadeInSection from "./utils/FadeInSection";

import ScrollableInfBanner from "./ScrollableInfBanner";

export const FeedbackCard = ({ feedback = {}, onSelect }) => {
    return(
        <article
            className="feedback_card"
            onClick={() => onSelect && onSelect(feedback)}
            role="button"
            tabIndex={0}
            aria-label={`View feedback from ${feedback.name}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect && onSelect(feedback);
                }
            }}
        >
            <div className="img_wrapper">
                <img src="./icons/person.svg" alt="Client" />
            </div>

            <h3>{ feedback.name }</h3>
            <p>{ feedback.job }</p>
            
            <h2>{ feedback.feedback }</h2>
        </article>
    );
}

const FeedbackQuickView = ({ feedback, isOpen, onClose }) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            setShouldRender(true);
            setIsClosing(false);
            document.addEventListener('keydown', handleEscape);
            document.querySelector('html').style.overflow = 'hidden';
        } else if (shouldRender) {
            // Start closing animation
            setIsClosing(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
                setIsClosing(false);
                document.querySelector('html').style.overflow = '';
            }, 300); // Match animation duration
            return () => clearTimeout(timer);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose, shouldRender]);

    if (!shouldRender || !feedback) return null;

    return (
        <div
            className={`feedback_quick_view_overlay ${(isOpen || isClosing) ? 'shown' : ''} ${isClosing ? 'closing' : ''}`}
            onClick={onClose}
            aria-hidden={!isOpen && !isClosing}
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-quick-view-title"
        >
            <div 
                className={`feedback_quick_view_content ${isClosing ? 'closing' : ''}`}
                onClick={(e) => e.stopPropagation()}
                onAnimationEnd={(e) => {
                    if (isClosing && e.animationName === 'zoomOut') {
                        setIsClosing(false);
                    }
                }}
            >
                <div className="feedback_quick_view_info">
                    <FeedbackCard feedback={feedback} />
                </div>
            </div>
        </div>
    );
};

const Feedbacks = ({ feedbacks }) => {
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    const openQuickView = (feedback) => {
        setSelectedFeedback(feedback);
        setIsQuickViewOpen(true);
    };

    const closeQuickView = () => {
        setIsQuickViewOpen(false);
        setTimeout(() => setSelectedFeedback(null), 300);
    };

    return (
        <>
            <FeedbackQuickView 
                feedback={selectedFeedback}
                isOpen={isQuickViewOpen}
                onClose={closeQuickView}
            />

            <FadeInSection>
                <section className="feedback_section">
                    <div className="title_wrapper">
                        <h2>
                            <span>Feedback</span> {" "}
                            <img src="./emojis/welcoming_smiley.png" alt="Welcoming Smiley" />
                        </h2>

                        <p>
                            Feedback and Testimonials from Satisfied Clients {" "}
                            <span class="glowing_text">(Click To Expand) </span>:
                        </p>
                    </div>
                    
                    <ScrollableInfBanner
                        className="inf_banner"
                        pauseOnClick={true}
                        speed={.5}
                    >
                        {   feedbacks &&

                            feedbacks.map((feedback, i) => (
                                <FeedbackCard
                                    key={"feedback-slider-top-" + i}
                                    feedback={ feedback }
                                    onSelect={openQuickView}
                                />
                            ))
                        }
                    </ScrollableInfBanner>

                    <ScrollableInfBanner
                        className="inf_banner"
                        pauseOnClick={true}
                        direction={'rtl'}
                        speed={.5}
                    >
                        {   feedbacks &&

                            feedbacks.map((feedback, i) => (
                                <FeedbackCard
                                    key={"feedback-slider-bottom-" + i}
                                    feedback={ feedback }
                                    onSelect={openQuickView}
                                />
                            ))
                        }
                    </ScrollableInfBanner>
                </section>
            </FadeInSection>
        </>
    )
}

export default Feedbacks;