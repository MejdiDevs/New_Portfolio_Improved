import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from './hooks/useProjects';
import { GridPoject } from './ProjectGrid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import '../styles/css/projectGrid.css';
import '../styles/css/projects.css';
import '../styles/css/similarProjects.css';

/**
 * SimilarProjects Component
 * 
 * This component displays projects similar to the current project being viewed.
 * 
 * How it works:
 * 1. It fetches all projects from the database (excluding hidden ones)
 * 2. It calculates similarity by counting the number of shared tags between
 *    the current project and each other project
 * 3. Projects are ranked by similarity score (number of matching tags)
 * 4. The current project is excluded from the results
 * 5. It displays up to 4 similar projects in a slider (2 per slide)
 * 6. If no similar projects are found (no shared tags), it falls back to
 *    showing the first 5 featured projects instead
 * 7. Includes a "View All Projects" link at the bottom right
 */
const SimilarProjects = ({ currentProject }) => {
    const { projects, isLoading } = useProjects({ limit: null });
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const similarProjects = useMemo(() => {
        if (!currentProject || !projects || projects.length === 0) {
            return [];
        }

        const currentTags = (currentProject.tags || []).map(tag => tag.toLowerCase().trim());

        if (currentTags.length === 0) {
            // If current project has no tags, return empty array to trigger fallback
            return [];
        }

        // Calculate similarity score for each project
        const projectsWithScores = projects
            .filter(project => project.id !== currentProject.id) // Exclude current project
            .map(project => {
                const projectTags = (project.tags || []).map(tag => tag.toLowerCase().trim());

                // Count matching tags (case-insensitive)
                const matchingTags = currentTags.filter(tag =>
                    projectTags.includes(tag)
                );

                return {
                    ...project,
                    similarityScore: matchingTags.length
                };
            })
            .filter(project => project.similarityScore > 0) // Only include projects with at least one matching tag
            .sort((a, b) => b.similarityScore - a.similarityScore) // Sort by similarity (highest first)
            .slice(0, 4); // Limit to 4 projects

        return projectsWithScores;
    }, [currentProject, projects]);

    const featuredProjects = useMemo(() => {
        if (!projects || projects.length === 0) {
            return [];
        }

        return projects
            .filter(project => project.id !== currentProject?.id && project.featured)
            .slice(0, 5);
    }, [projects, currentProject]);

    // Use similar projects if available, otherwise fall back to featured projects
    const displayProjects = similarProjects.length > 0 ? similarProjects : featuredProjects;
    const isFallback = similarProjects.length === 0 && featuredProjects.length > 0;

    // Group projects into pairs for slides (2 per slide)
    const projectSlides = useMemo(() => {
        const slides = [];
        for (let i = 0; i < displayProjects.length; i += 2) {
            slides.push(displayProjects.slice(i, i + 2));
        }
        return slides;
    }, [displayProjects]);

    const handlePrev = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slideNext();
    }, []);

    const handlePaginationClick = useCallback((index) => {
        if (sliderRef.current && sliderRef.current.swiper) {
            const swiper = sliderRef.current.swiper;
            // Use slideToLoop if loop is enabled, otherwise use slideTo
            if (swiper.params.loop) {
                swiper.slideToLoop(index);
            } else {
                swiper.slideTo(index);
            }
            // Update active index immediately
            setActiveIndex(index);
        }
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!document.getElementById('similar_projects_section')) return;
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handlePrev, handleNext]);

    useEffect(() => {
        if (!sliderRef.current) return;

        const swiper = sliderRef.current.swiper;
        if (!swiper) return;

        // Reset to first slide when projects change
        if (swiper.params.loop) {
            swiper.slideToLoop(0, 0);
        } else {
            swiper.slideTo(0, 0);
        }
        setActiveIndex(0);

        const handleSlideChange = () => {
            // Use realIndex for loop mode, activeIndex for non-loop mode
            const currentIndex = swiper.params.loop ? swiper.realIndex : swiper.activeIndex;
            if (currentIndex !== undefined && currentIndex !== null) {
                setActiveIndex(currentIndex);
            }
        };

        // Listen to both slideChange and slideChangeTransitionEnd for better reliability
        swiper.on('slideChange', handleSlideChange);
        swiper.on('slideChangeTransitionEnd', handleSlideChange);

        return () => {
            swiper.off('slideChange', handleSlideChange);
            swiper.off('slideChangeTransitionEnd', handleSlideChange);
        };
    }, [displayProjects, projectSlides.length]);

    if (isLoading || !currentProject || displayProjects.length === 0) {
        return null;
    }

    return (
        <section id="similar_projects_section">
            <div id="project_section_wrapper">
                <header className="title_wrapper">
                    <h2>
                        <span>{isFallback ? 'Featured Projects' : 'Similar Projects'}</span> {" "}
                        <img src="./emojis/rocket.png" alt="Rocket emoji" />
                    </h2>
                    <p>
                        {isFallback
                            ? 'Check out these featured projects:'
                            : 'You might also be interested in these projects:'}
                    </p>
                </header>

                <div className="swiper_wrapper">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        loop={projectSlides.length > 1}
                        ref={sliderRef}
                        modules={[Autoplay]}
                        autoplay={
                            projectSlides.length > 1 ? {
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            } : false
                        }
                        onSlideChange={(swiper) => {
                            const currentIndex = swiper.params.loop ? swiper.realIndex : swiper.activeIndex;
                            if (currentIndex !== undefined && currentIndex !== null) {
                                setActiveIndex(currentIndex);
                            }
                        }}
                    >
                        {projectSlides.map((slideProjects, slideIdx) => (
                            <SwiperSlide key={`similar-slide-${slideIdx}`}>
                                <div className="grid_wrapper">
                                    {slideProjects.map((project) => (
                                        <Link
                                            key={project.id}
                                            to={`/project/${project.slug}`}
                                        >
                                            <GridPoject project={project} />
                                        </Link>
                                    ))}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {projectSlides.length > 1 && (
                        <>
                            <div className="nav_wrapper">
                                <button
                                    className="arrow"
                                    id="prev-arrow"
                                    onClick={handlePrev}
                                    aria-label="Previous projects"
                                >
                                    <img src="./icons/arrow.svg" alt="Previous" />
                                </button>

                                <button
                                    className="arrow"
                                    id="next-arrow"
                                    onClick={handleNext}
                                    aria-label="Next projects"
                                >
                                    <img src="./icons/arrow.svg" alt="Next" />
                                </button>
                            </div>

                            <div className="pags_wrapper_container">
                                <div className="pags_wrapper" role="tablist" aria-label="Similar projects pagination">
                                    <div className="pags_container">
                                        {Array.from({ length: projectSlides.length }, (_, i) => (
                                            <button
                                                type="button"
                                                className={i === activeIndex ? "active" : ""}
                                                id={`similar-pag-${i}`}
                                                key={i}
                                                role="tab"
                                                aria-selected={i === activeIndex}
                                                aria-label={`Go to slide ${i + 1}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handlePaginationClick(i);
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <Link to="/projects" className="view_all_link">View All Projects →</Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SimilarProjects;
