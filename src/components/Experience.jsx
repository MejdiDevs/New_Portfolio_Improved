import { motion } from 'motion/react';
import { useRef, useEffect, useCallback } from 'react';
import '../styles/css/experience.css';
import expData from '../data/experienceData.json';
import SpotlightCard from './SpotlightCard';

/* Background variants for varied blob placements */
const cardBackgrounds = [
    `radial-gradient(circle 320px at 5% 10%, rgba(10, 124, 255, 0.08) 0%, transparent 70%),
     radial-gradient(circle 300px at 95% 10%, rgba(10, 124, 255, 0.06) 0%, transparent 70%),
     radial-gradient(circle 280px at 5% 90%, rgba(10, 124, 255, 0.04) 0%, transparent 70%)`,
    `radial-gradient(circle 340px at 95% 90%, rgba(10, 124, 255, 0.08) 0%, transparent 70%),
     radial-gradient(circle 290px at 5% 15%, rgba(10, 124, 255, 0.06) 0%, transparent 70%),
     radial-gradient(circle 260px at 50% 50%, rgba(10, 124, 255, 0.04) 0%, transparent 70%)`,
    `radial-gradient(circle 320px at 50% 0%, rgba(10, 124, 255, 0.08) 0%, transparent 70%),
     radial-gradient(circle 300px at 5% 95%, rgba(10, 124, 255, 0.06) 0%, transparent 70%),
     radial-gradient(circle 280px at 95% 95%, rgba(10, 124, 255, 0.04) 0%, transparent 70%)`,
    `radial-gradient(circle 320px at 0% 50%, rgba(10, 124, 255, 0.08) 0%, transparent 70%),
     radial-gradient(circle 300px at 100% 30%, rgba(10, 124, 255, 0.06) 0%, transparent 70%),
     radial-gradient(circle 280px at 50% 90%, rgba(10, 124, 255, 0.04) 0%, transparent 70%)`
];

const ExpCard = ({ entry, entryIdx, setFadeRef }) => {

    const addLightVariant = (imagePath) => {
        const dotIndex = imagePath.lastIndexOf('.');
        if (dotIndex === -1) return imagePath;
        return imagePath.slice(0, dotIndex) + '_light' + imagePath.slice(dotIndex);
    };

    return (
        <div className="exp_card_container">
            <div
                ref={el => setFadeRef(entryIdx, el)}
                className="exp_card_fade_wrapper"
                style={{ width: '100%' }}
            >
                <SpotlightCard className="exp_card_spotlight" spotlightColor="rgba(255, 255, 255, 0.08)">
                    <motion.article
                        className="exp_card"
                        style={{
                            top: 0,
                            background: cardBackgrounds[entryIdx % cardBackgrounds.length]
                        }}
                    >
                        <img src={entry.image} alt={entry.title} />
                        <img
                            className="light"
                            src={addLightVariant(entry.image)}
                            alt={entry.title}
                        />

                        <div id="spt"></div>

                        <div id="content">
                            <span>
                                <h3>{entry.title}</h3>
                                <h4>{entry.duration}</h4>
                            </span>

                            <ul>
                                {entry.bulletPoints.map((content, index) => (
                                    <li key={'experience-' + entryIdx + '-' + index}>{content}</li>
                                ))}
                            </ul>

                            <div className="tag_wrapper">
                                {entry.tags.map((tag, idx) => (
                                    <div
                                        className="tag"
                                        key={'experience-tag-' + entryIdx + '-' + idx}
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.article>
                </SpotlightCard>
            </div>
        </div>
    );
};

const Experience = () => {
    const container = useRef(null);
    const wrapperRef = useRef(null);
    const fadeRefsMap = useRef({});
    const experiences = [...expData].reverse();

    const setFadeRef = useCallback((idx, el) => {
        if (el) fadeRefsMap.current[idx] = el;
    }, []);

    const getDocumentTop = useCallback((el) => {
        let top = 0;
        let current = el;
        while (current) {
            top += current.offsetTop;
            current = current.offsetParent;
        }
        return top;
    }, []);

    useEffect(() => {
        let rafId;

        const tick = () => {
            if (!wrapperRef.current) {
                rafId = requestAnimationFrame(tick);
                return;
            }

            const viewportWidth = window.innerWidth;
            const cardCount = experiences.length;

            // Only apply fade on phones (<=800px)
            if (viewportWidth > 800) {
                for (let i = 0; i < cardCount; i++) {
                    const fadeEl = fadeRefsMap.current[i];
                    if (fadeEl) fadeEl.style.opacity = 1;
                }
                rafId = requestAnimationFrame(tick);
                return;
            }

            const wrapperAbsoluteTop = getDocumentTop(wrapperRef.current);
            const scrollTop = window.scrollY || window.pageYOffset;
            const viewportHeight = window.innerHeight;

            for (let i = 0; i < cardCount; i++) {
                const fadeEl = fadeRefsMap.current[i];
                if (!fadeEl) continue;

                const isLast = i === cardCount - 1;
                if (isLast) continue;

                const cardAbsoluteStart = wrapperAbsoluteTop + (i * viewportHeight);
                const scrolledPast = scrollTop - cardAbsoluteStart;
                const progress = Math.max(0, Math.min(1, scrolledPast / viewportHeight));

                const fadeStart = 0.55;
                const fadeEnd = 0.75;
                let opacity = 1;
                if (progress >= fadeStart) {
                    const fadeProgress = Math.min(1, (progress - fadeStart) / (fadeEnd - fadeStart));
                    opacity = Math.max(0, 1 - fadeProgress);
                }

                fadeEl.style.opacity = opacity;
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [experiences.length, getDocumentTop]);

    return (
        <section id="experience_section" ref={container}>
            <div className="title_wrapper">
                <h2>
                    <span>Experience</span>
                    <img src="./emojis/briefcase.png" alt="Briefcase" />
                </h2>
                <p>Here Is A Brief Overview Of My Most Recent Experiences:</p>
            </div>

            <div id="experience_cards_wrapper" ref={wrapperRef}>
                {experiences.map((entry, idx) => (
                    <ExpCard
                        key={'experience-card-' + idx}
                        entry={entry}
                        entryIdx={idx}
                        setFadeRef={setFadeRef}
                    />
                ))}
            </div>
        </section>
    );
};

export default Experience;
