import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import FadeInSection from "./utils/FadeInSection";
import HighlightQuickView from "./HighlightQuickView";
import "../styles/css/highlights.css";
import "../styles/css/highlightsSkeleton.css";
import { fetchAllHighlights } from "../services/highlightService";

const HighlightsSkeleton = ({ isCompact = false }) => {
    return (
        <section id="highlights_section" className={`skeleton ${isCompact ? "compact" : ""}`}>
            {isCompact ? (
                <div className="title_wrapper">
                    <h2>
                        <span className="skeleton_box" style={{ color: 'transparent', borderRadius: '8px' }}>
                            Highlights {" "}
                            <img src="./emojis/trophy.png" alt="Highlights" style={{ opacity: 0 }} />
                        </span>
                    </h2>
                    <p>
                        <span className="skeleton_box" style={{ color: 'transparent', borderRadius: '6px', display: 'inline' }}>
                            Competing in hackathons and ideathons to innovate under pressure.
                        </span>
                    </p>
                </div>
            ) : (
                <>
                    <h1>
                        <span className="skeleton_box" style={{ color: 'transparent', borderRadius: '8px' }}>
                            Highlights & Awards {" "}
                            <img src="./emojis/trophy.png" alt="Highlights" style={{ opacity: 0 }} />
                        </span>
                    </h1>
                    <div id="sub_wrapper">
                        <h3>
                            <span className="skeleton_box" style={{ color: 'transparent', borderRadius: '6px', display: 'inline' }}>
                                Competing in hackathons and ideathons to push creative boundaries and build innovative solutions under pressure. {" "}
                                <img src="./emojis/light-bulb.png" alt="Light Bulb" style={{ opacity: 0 }} />
                                <img src="./emojis/sparkles.png" alt="Sparkles" style={{ opacity: 0 }} />
                            </span>
                        </h3>
                    </div>
                </>
            )}

            {!isCompact && (
                <div className="highlight_filters_wrapper">
                    <div className="highlight_filters">
                        {['All', 'Hackathon', 'Ideathon', 'Challenge'].map((category, idx) => (
                            <button key={idx} className="filter_btn" style={{ position: 'relative' }} disabled>
                                <span style={{ opacity: 0 }}>{category}</span>
                                <div className="skeleton_box" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50px', pointerEvents: 'none' }}></div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {!isCompact && (
                <div
                    className="highlight_featured skeleton_card"
                    style={{
                        display: 'grid',
                        pointerEvents: 'none',
                        background: 'rgba(10, 124, 255, 0.05)',
                        borderColor: 'rgba(10, 124, 255, 0.15)'
                    }}
                >
                    <div className="highlight_featured_image_container">
                        <div className="highlight_featured_image_wrapper">
                            <div className="skeleton_box skeleton_image" style={{ height: '100%', borderRadius: 'inherit' }}></div>
                        </div>
                    </div>
                    <div className="highlight_featured_content">
                        <div className="skeleton_box skeleton_type" style={{ marginBottom: '16px' }}></div>
                        <div className="skeleton_box skeleton_title_text" style={{ width: '80%', height: '3em', marginBottom: '16px' }}></div>
                        <div className="skeleton_box skeleton_event" style={{ marginBottom: '12px' }}></div>
                        <div className="skeleton_box skeleton_date" style={{ marginBottom: '24px' }}></div>
                        <div className="skeleton_box skeleton_description" style={{ marginBottom: '12px' }}></div>
                        <div className="skeleton_box skeleton_description" style={{ marginBottom: '12px' }}></div>
                        <div className="skeleton_box skeleton_description short" style={{ marginBottom: '32px' }}></div>

                        <div className="highlight_tags" style={{ marginBottom: '24px' }}>
                            {Array.from({ length: 3 }).map((_, tagIdx) => (
                                <div key={tagIdx} className="skeleton_box skeleton_tag"></div>
                            ))}
                        </div>

                        <div className="highlight_actions" style={{ gap: '12px' }}>
                            <div className="skeleton_box" style={{ width: '140px', height: '44px', borderRadius: '50px' }}></div>
                            <div className="skeleton_box" style={{ width: '140px', height: '44px', borderRadius: '50px' }}></div>
                        </div>
                    </div>
                </div>
            )}
            <div className="highlights_grid">
                {Array.from({ length: isCompact ? 2 : 2 }).map((_, idx) => (
                    <div key={idx} className="highlight_card skeleton_card">
                        <div className="highlight_image_container" style={{ background: 'rgba(10, 124, 255, 0.03)' }}>
                            <div className="highlight_image_wrapper" style={{ aspectRatio: 'auto' }}>
                                <div className="skeleton_box skeleton_image" style={{ borderRadius: '12px', height: '100%' }}></div>
                            </div>
                        </div>
                        <div className="highlight_content">
                            <div className="skeleton_box skeleton_title_text"></div>
                            <div className="skeleton_box skeleton_date"></div>
                            <div className="skeleton_box skeleton_description"></div>
                            <div className="skeleton_box skeleton_description short"></div>
                            <div className="highlight_tags">
                                {Array.from({ length: 4 }).map((_, tagIdx) => (
                                    <div key={tagIdx} className="skeleton_box skeleton_tag"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const HighlightCard = ({ highlight, isHighlight = false, onSeeMore, isQuickViewOpen }) => {
    const [imageError, setImageError] = useState(false);

    const handleFeaturedClick = () => {
        if (highlight.extendedInfo) {
            onSeeMore();
        }
    };

    if (isHighlight) {
        return (
            <div className="highlight_featured" onClick={handleFeaturedClick} style={{ cursor: highlight.extendedInfo ? 'pointer' : 'default' }}>
                <div className="highlight_featured_image_container">
                    <div
                        className="highlight_featured_image_wrapper"
                        style={{ backgroundImage: !imageError && highlight.image ? `url('${highlight.image}')` : 'none' }}
                    >
                        {!imageError ? (
                            <img
                                src={highlight.image}
                                alt={highlight.event}
                                className="highlight_image"
                                loading="lazy"
                                onError={() => setImageError(true)}
                                style={{ display: 'none' }}
                            />
                        ) : (
                            <div className="image_fallback"></div>
                        )}
                    </div>
                </div>
                <div className="highlight_featured_content">
                    <span className="highlight_type">{highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}</span>
                    <h2>{highlight.title}</h2>
                    <span className="highlight_event">{highlight.event}</span>
                    <span className="highlight_date">{highlight.date}</span>
                    <p>{highlight.description}</p>
                    <div className="highlight_tags">
                        {highlight.tags.map((tag, idx) => (
                            <span key={idx} className="tag">{tag}</span>
                        ))}
                    </div>
                    <div className="highlight_actions">
                        {highlight.projectLink && (
                            <Link
                                to={highlight.projectLink}
                                className="view_project_btn"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img src="./icons/globe.svg" alt="Link" />
                                <p>View Project</p>
                            </Link>
                        )}
                        {highlight.extendedInfo && (
                            <button
                                className="see_more_btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSeeMore();
                                }}
                                aria-label="See more details"
                            >
                                <img src="./icons/expand.svg" alt="See More" />
                                <p>See More</p>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const handleCardClick = () => {
        if (highlight.extendedInfo) {
            onSeeMore();
        }
    };

    return (
        <div className="highlight_card" onClick={handleCardClick} style={{ cursor: highlight.extendedInfo ? 'pointer' : 'default' }}>
            <div className="highlight_image_container">
                <div
                    className="highlight_image_wrapper"
                    style={{ backgroundImage: !imageError && highlight.image ? `url('${highlight.image}')` : 'none' }}
                >
                    {!imageError ? (
                        <img
                            src={highlight.image}
                            alt={highlight.event}
                            className="highlight_image"
                            loading="lazy"
                            onError={() => setImageError(true)}
                            style={{ display: 'none' }}
                        />
                    ) : (
                        <div className="image_fallback"></div>
                    )}
                </div>
            </div>
            <div className="highlight_content">
                <span className="highlight_type">{highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}</span>
                <h3>{highlight.title}</h3>
                <span className="highlight_event">{highlight.event}</span>
                <span className="highlight_date">{highlight.date}</span>
                <p>{highlight.description}</p>
                <div className="highlight_tags">
                    {highlight.tags.map((tag, idx) => (
                        <span key={idx} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Highlights = ({ isCompact = false }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [quickViewHighlight, setQuickViewHighlight] = useState(null);
    const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [highlightsData, setHighlightsData] = useState([]);

    useEffect(() => {
        const loadHighlights = async () => {
            try {
                const data = await fetchAllHighlights();
                setHighlightsData(data);
            } catch (err) {
                console.error("Error loading highlights:", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadHighlights();
    }, []);

    const categories = useMemo(() => ['all', 'hackathon', 'ideathon', 'challenge'], []);

    const filteredHighlights = useMemo(() => {
        if (activeFilter === 'all') return highlightsData;
        return highlightsData.filter(highlight =>
            highlight.type.toLowerCase() === activeFilter.toLowerCase()
        );
    }, [activeFilter, highlightsData]);

    const featuredHighlight = useMemo(() => {
        if (isCompact) return null;
        if (activeFilter !== 'all') return null;
        return filteredHighlights[0] || null;
    }, [filteredHighlights, isCompact, activeFilter]);

    const gridHighlights = useMemo(() => {
        if (isCompact) return filteredHighlights.slice(0, 2);
        if (activeFilter !== 'all') return filteredHighlights;
        return filteredHighlights.slice(1);
    }, [filteredHighlights, isCompact, activeFilter]);

    const openQuickView = (highlight) => {
        setQuickViewHighlight(highlight);
        setIsQuickViewOpen(true);
    };

    const closeQuickView = () => {
        setIsQuickViewOpen(false);
        setTimeout(() => setQuickViewHighlight(null), 300);
    };

    if (isLoading) {
        return (
            <section className="fade-in-section is-visible">
                <HighlightsSkeleton isCompact={isCompact} />
            </section>
        );
    }

    return (
        <>
            <HighlightQuickView
                highlight={quickViewHighlight}
                isOpen={isQuickViewOpen}
                onClose={closeQuickView}
            />
            <FadeInSection>
                <section id="highlights_section" className={isCompact ? "compact" : ""}>
                    {isCompact && (
                        <div className="title_wrapper">
                            <h2>
                                <span>Highlights</span> {" "}
                                <img src="./emojis/trophy.png" alt="Highlights" />
                            </h2>

                            <p>Competing in hackathons and ideathons to innovate under pressure.</p>
                        </div>
                    )}

                    {!isCompact && (
                        <>
                            <h1>Highlights & Awards {" "}
                                <img src="./emojis/trophy.png" alt="Highlights" />
                            </h1>

                            <div id="sub_wrapper">
                                <h3>Competing in hackathons and ideathons to push creative boundaries and build innovative solutions under pressure.  {" "}
                                    <img src="./emojis/light-bulb.png" alt="Light Bulb" />
                                    <img src="./emojis/sparkles.png" alt="Sparkles" />
                                </h3>
                            </div>
                        </>
                    )}

                    {!isCompact && (
                        <div className="highlight_filters_wrapper">
                            <div className="highlight_filters">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        className={`filter_btn ${activeFilter === category ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(category)}
                                        aria-label={`Filter by ${category}`}
                                        aria-pressed={activeFilter === category}
                                    >
                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {!isCompact && featuredHighlight && (
                        <HighlightCard
                            highlight={featuredHighlight}
                            isHighlight={true}
                            onSeeMore={() => openQuickView(featuredHighlight)}
                            isQuickViewOpen={isQuickViewOpen}
                        />
                    )}

                    <div className="highlights_grid" key={activeFilter}>
                        {gridHighlights.map(highlight => (
                            <HighlightCard
                                key={highlight.id}
                                highlight={highlight}
                                onSeeMore={() => openQuickView(highlight)}
                                isQuickViewOpen={isQuickViewOpen}
                            />
                        ))}
                    </div>

                    {isCompact && (
                        <div className="highlights_view_all_wrapper">
                            <Link to="/highlights" className="view_all_link">View All Highlights →</Link>
                        </div>
                    )}
                </section>
            </FadeInSection>
        </>
    );
};

export default Highlights;
