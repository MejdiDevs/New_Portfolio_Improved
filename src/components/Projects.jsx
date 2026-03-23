import "../styles/css/projects.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react";
import FadeInSection from "./utils/FadeInSection";
import { Link } from "react-router-dom";
import { formatTextWithLineBreaks } from "./utils/sanitize";

const ProjectSlide = memo(({ project, onQuickView, isQuickViewOpen }) => {
    const startX = useRef(0);
    const startY = useRef(0);
    const isDragging = useRef(false);
    const linkRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const mousePositionRef = useRef({ x: 0, y: 0 });

    // Track mouse position globally to check if it's over the element when modal closes
    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePositionRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);


    useEffect(() => {
        if (isQuickViewOpen) {
            // Reset when modal opens
            setIsHovered(false);
        } else {
            // When modal closes, check if mouse is currently over the element
            const checkMouseOver = () => {
                if (linkRef.current) {
                    const rect = linkRef.current.getBoundingClientRect();
                    const mouse = mousePositionRef.current;
                    if (
                        mouse.x >= rect.left &&
                        mouse.x <= rect.right &&
                        mouse.y >= rect.top &&
                        mouse.y <= rect.bottom
                    ) {
                        setIsHovered(true);
                    }
                }
            };
            // Use a small delay to ensure DOM has updated after modal closes
            const timer = setTimeout(checkMouseOver, 50);
            return () => clearTimeout(timer);
        }
    }, [isQuickViewOpen]);

    const handleStart = (e) => {
        const point = e.touches ? e.touches[0] : e;
        startX.current = point.clientX;
        startY.current = point.clientY;
        isDragging.current = false;
    };

    const handleMove = (e) => {
        const point = e.touches ? e.touches[0] : e;
        const dx = Math.abs(point.clientX - startX.current);
        const dy = Math.abs(point.clientY - startY.current);
        if (dx > 5 || dy > 5) {
            isDragging.current = true; // it's a swipe, not a click
        }
    };

    const handleClick = (e) => {
        if (isDragging.current) {
            e.preventDefault(); // cancel link navigation
        }
    };

    return (
        <Link
            ref={linkRef}
            to={"/project/" + project.slug}
            onMouseEnter={() => {
                if (!isQuickViewOpen) {
                    setIsHovered(true);
                }
            }}
            onMouseLeave={() => setIsHovered(false)}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleClick}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleClick}
        >
            <article className={`project_slide ${isHovered ? 'hovered' : ''}`}>
                <div id="img_wrapper">
                    <div
                        className="project_image"
                        style={{ backgroundImage: `url('${project.images[0] ? project.images[0] : ""}')` }}
                    >
                        {project.images && project.images[0] && (
                            <img
                                src={project.images[0]}
                                alt={`${project.title} preview`}
                                loading="lazy"
                                style={{ display: 'none' }}
                            />
                        )}
                        {project.images && project.images.length > 1 && (
                            <div className="image_gallery_preview">
                                {project.images.slice(1, 4).map((img, idx) => (
                                    <div
                                        key={`preview-${idx}`}
                                        className="preview_thumb"
                                        style={{ backgroundImage: `url('${img}')` }}
                                        role="img"
                                        aria-label={`${project.title} screenshot ${idx + 2}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div id="content">
                    <div className="project_header">
                        <h2>{project.title}</h2>
                        {project.featured && (
                            <div className="project_badge featured">Featured</div>
                        )}
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(project.description) }} />

                    <div className="tag_wrapper">
                        {
                            project.tags.slice(0, 3).map((tag, idx) =>
                                <div className="tag" key={"project-tag-" + idx}>{tag}</div>
                            )
                        }

                        {
                            project.tags.length > 3 &&
                            <p>+{project.tags.length - 3} more</p>
                        }
                    </div>

                    <div className="tag_wrapper mobl">
                        {
                            project.tags.slice(0, 2).map((tag, idx) =>
                                <div className="tag" key={"project-tag-" + idx}>{tag}</div>
                            )
                        }

                        {
                            project.tags.length > 2 &&
                            <p>+{project.tags.length - 2} more</p>
                        }
                    </div>

                    <div className="project_actions">
                        <button aria-label={`View details for ${project.title}`}>
                            <img src="./icons/expand.svg" alt="See More" />
                            <p>See more</p>
                        </button>
                    </div>
                </div>
            </article>
        </Link>
    );
});

const Projects = ({ projects }) => {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeFilter, setActiveFilter] = useState('all');
    const [quickViewProject, setQuickViewProject] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

    // Define technology categories
    const technologyCategories = useMemo(() => {
        return {
            web: [
                'react', 'nextjs', 'next.js', 'angular', 'vue', 'html', 'css', 'javascript', 'js',
                'typescript', 'ts',
                'sass', 'scss', 'bootstrap', 'tailwind', 'webpack', 'vite', 'npm', 'yarn',
                'redux', 'context', 'hooks', 'jsx', 'tsx', 'html5', 'css3', 'jquery'
            ],
            mobile: [
                'flutter', 'react native', 'react-native', 'android', 'ios', 'swift', 'kotlin',
                'dart', 'xamarin', 'ionic', 'cordova', 'mobile', 'app', 'ios development',
                'android development', 'mobile development'
            ],
            ai: [
                'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
                'tensorflow', 'pytorch', 'keras', 'neural network', 'nlp', 'natural language',
                'python', 'scikit-learn', 'opencv', 'pandas', 'numpy', 'data science',
                'computer vision', 'chatbot', 'openai', 'gpt', 'llm'
            ]
        };
    }, []);

    // Helper function to check if a project belongs to a category
    const projectBelongsToCategory = useCallback((project, category) => {
        if (!project.tags || project.tags.length === 0) return false;

        const categoryTechs = technologyCategories[category] || [];
        const projectTags = project.tags.map(tag => tag.toLowerCase().trim());
        const categoryTechsLower = categoryTechs.map(tech => tech.toLowerCase());

        // Check for exact matches (case-insensitive)
        return projectTags.some(tag => categoryTechsLower.includes(tag));
    }, [technologyCategories]);

    // Categories are now fixed: All, Web, Mobile, AI
    const categories = useMemo(() => {
        return ['all', 'web', 'mobile', 'AI'];
    }, []);

    // Filter projects based on active filter
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projects;
        return projects.filter(project =>
            projectBelongsToCategory(project, activeFilter)
        );
    }, [projects, activeFilter, projectBelongsToCategory]);

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
        }
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!document.getElementById('project_section')) return;
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

        // Reset to first slide when filter changes
        swiper.slideTo(0, 0);
        setActiveIndex(0);

        const handleSlideChange = () => {
            setActiveIndex(swiper.realIndex);
        };

        swiper.on('slideChange', handleSlideChange);

        return () => {
            swiper.off('slideChange', handleSlideChange);
        };
    }, [filteredProjects, activeFilter])

    const openQuickView = (project) => {
        setQuickViewProject(project);
        setIsQuickViewOpen(true);
    };

    const closeQuickView = () => {
        setIsQuickViewOpen(false);
        setTimeout(() => setQuickViewProject(null), 300);
    };

    return (
        <FadeInSection>
            <section id="project_section">
                <div id="project_section_wrapper">
                    <header className="title_wrapper">
                        <h2>
                            <span>Projects</span> {" "}
                            <img src="./emojis/rocket.png" alt="Rocket emoji" />
                        </h2>

                        <p>A Selection of Standout Projects I've Designed and Developed:</p>
                    </header>

                    <div className="swiper_wrapper">
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            loop={filteredProjects.length > 1}
                            ref={sliderRef}
                            key={activeFilter} // Force re-render when filter changes
                        //modules={[Autoplay]}
                        //autoplay={{
                        //    delay: 5000,
                        //    disableOnInteraction: false,
                        //    pauseOnMouseEnter: true,
                        //}}
                        >
                            {
                                filteredProjects.map((project, idx) =>
                                    <SwiperSlide key={"project-slide-" + idx}>
                                        <div className="project_slide_wrapper">
                                            <ProjectSlide
                                                project={project}
                                                onQuickView={() => openQuickView(project)}
                                                isQuickViewOpen={isQuickViewOpen}
                                            />
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                        </Swiper>

                        <div className="nav_wrapper">
                            <button
                                className="arrow"
                                id="prev-arrow"
                                onClick={handlePrev}
                                aria-label="Previous project"
                            >
                                <img src="./icons/arrow.svg" alt="Previous" />
                            </button>

                            <button
                                className="arrow"
                                id="next-arrow"
                                onClick={handleNext}
                                aria-label="Next project"
                            >
                                <img src="./icons/arrow.svg" alt="Next" />
                            </button>
                        </div>

                        <div className="pags_wrapper_container">
                            <div className="pags_wrapper" role="tablist" aria-label="Project pagination">
                                <div className="pags_container">
                                    {Array.from({ length: filteredProjects.length }, (_, i) => (
                                        <button
                                            type="button"
                                            className={i === activeIndex ? "active" : ""}
                                            id={"project-pag-" + i}
                                            key={i}
                                            role="tab"
                                            aria-selected={i === activeIndex}
                                            aria-label={`Go to project ${i + 1}`}
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
                    </div>
                </div>
            </section>
        </FadeInSection>
    );
}

export default memo(Projects);