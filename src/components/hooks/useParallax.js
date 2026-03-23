import { useEffect, useRef, useState } from 'react';

export const useParallax = (speed = 0.5, fadeDistance = 400) => {
    const elementRef = useRef(null);
    const [transform, setTransform] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const windowCenter = windowHeight / 2;
            
            // Get element center position relative to viewport
            const elementCenter = rect.top + rect.height / 2;
            
            // Calculate distance from viewport center
            // Positive when below center, negative when above
            const distanceFromCenter = elementCenter - windowCenter;
            
            // Apply parallax: elements move slower/faster than scroll
            // Speed > 0: moves slower (stays behind)
            // Speed < 0: moves faster (ahead)
            const parallaxValue = distanceFromCenter * speed;
            
            // Calculate opacity and scale based on distance from center
            // Fade out and scale down as card moves away from center
            const absDistance = Math.abs(distanceFromCenter);
            const fadeStart = fadeDistance * 0.5; // Start fading at 50% of fadeDistance
            let newOpacity = 1;
            let newScale = 1;
            
            if (absDistance > fadeStart) {
                // Fade out and scale down proportionally
                const fadeRange = fadeDistance - fadeStart;
                const fadeAmount = Math.min((absDistance - fadeStart) / fadeRange, 1);
                newOpacity = 1 - fadeAmount;
                newScale = 1 - (fadeAmount * 0.15); // Scale down by up to 15%
                // Keep minimum opacity at 0.3 for subtle visibility
                newOpacity = Math.max(newOpacity, 0.3);
                // Keep minimum scale at 0.85
                newScale = Math.max(newScale, 0.85);
            }
            
            setTransform(parallaxValue);
            setOpacity(newOpacity);
            setScale(newScale);
        };

        // Use requestAnimationFrame for smooth updates
        let rafId = null;
        const onScroll = () => {
            if (rafId === null) {
                rafId = requestAnimationFrame(() => {
                    handleScroll();
                    rafId = null;
                });
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [speed, fadeDistance]);

    return { ref: elementRef, transform, opacity, scale };
};

