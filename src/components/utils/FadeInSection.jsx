import "../../styles/css/fadeInSection.css";
import { useState, useRef, useEffect } from "react";

const FadeInSection = props => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef(null);
    const observerRef = useRef(null);

    useEffect(() => {
        if (!domRef.current) return;

        // Check if element is already in viewport on mount
        const checkInitialVisibility = () => {
            if (!domRef.current) return false;
            
            const rect = domRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
            
            // Check if element is in viewport (with rootMargin consideration)
            const isInViewport = (
                rect.top < viewportHeight * 0.5 && 
                rect.bottom > viewportHeight * 0.5 &&
                rect.left < viewportWidth &&
                rect.right > 0
            );
            
            return isInViewport;
        };

        // If already visible, set immediately
        if (checkInitialVisibility()) {
            setVisible(true);
            return;
        }

        // Create observer with proper cleanup
        observerRef.current = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        // Disconnect after first intersection to prevent re-triggering
                        if (observerRef.current) {
                            observerRef.current.disconnect();
                            observerRef.current = null;
                        }
                    }
                });
            },
            {
                rootMargin: '-50% 0% -50% 0%',
                threshold: 0,
            }
        );

        observerRef.current.observe(domRef.current);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
        };
    }, []);

    return (
        <section
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </section>
    );
}

export default FadeInSection;