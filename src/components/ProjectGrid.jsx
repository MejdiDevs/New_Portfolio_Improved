import "../styles/css/projectGrid.css";

import { Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";

import FadeInSection from "./utils/FadeInSection";
import { memo } from "react";

// Export GridPoject so it can be used in other components
export const GridPoject = memo(({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <article
            className={`grid_project ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div id="img_wrapper">
                <div className="grid_project_image">
                    {project.images && project.images[0] && (
                        <img
                            src={project.images[0]}
                            alt={`${project.title} preview`}
                            loading="lazy"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'top',
                                borderRadius: '12px',
                                display: 'block'
                            }}
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
                <div className="title_wrapper">
                    <h2>{project.title}</h2>
                    {project.featured && (
                        <div className="project_badge featured">Featured</div>
                    )}
                </div>
                <p>{project.description}</p>

                <div className="tag_wrapper">
                    {
                        project.tags.slice(0, 4).map((tag, idx) =>
                            <div className="tag" key={"project-tag-" + idx}>{tag}</div>
                        )
                    }

                    {
                        project.tags.length > 4 &&
                        <p>+{project.tags.length - 4} more</p>
                    }
                </div>

                <div className="bottom_access">
                    <Link to={`/project/${project.slug}`}>
                        <img src="./icons/expand.svg" alt="See More" />
                        <p>See more</p>
                    </Link>

                    {
                        project.link &&

                        <button
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();

                                window.open("https://" + project.link, '_blank');
                            }}
                        >
                            <img src="./icons/globe.svg" alt="Link" />

                            <p>Visit Project</p>
                            <p className="mobl">Visit</p>
                        </button>
                    }
                </div>
            </div>
        </article>
    )
});

const ProjectGrid = ({ projects }) => {
    const [moreShown, setMoreShown] = useState(false)
    const [query, setQuery] = useState("")
    const [activeFilter, setActiveFilter] = useState('all')

    // Define technology categories (same as Projects component)
    const technologyCategories = useMemo(() => {
        return {
            web: [
                'react', 'nextjs', 'next.js', 'angular', 'vue', 'html', 'css', 'javascript', 'js',
                'typescript', 'ts', 'sass', 'scss', 'bootstrap', 'tailwind', 'webpack', 'vite', 'npm', 'yarn',
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

    // Categories are: All, Web, Mobile, AI
    const categories = useMemo(() => {
        return ['all', 'web', 'mobile', 'AI'];
    }, []);

    // Filter projects based on query and active filter
    const filteredProjects = useMemo(() => {
        let filtered = projects;

        // Apply category filter
        if (activeFilter !== 'all') {
            filtered = filtered.filter(project =>
                projectBelongsToCategory(project, activeFilter)
            );
        }

        // Apply search query
        if (query) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(query.toLowerCase())
            );
        }

        return filtered;
    }, [projects, activeFilter, query, projectBelongsToCategory]);

    return (
        <FadeInSection>
            <section id="project_grid_section">
                <h1>My Projects {" "}
                    <img src="./emojis/rocket.png" alt="Rocket" />
                </h1>

                <h3>From concept to creation, every project tells a story of innovation, creativity, and purpose — explore them here!  {" "}
                    <img src="./emojis/light-bulb.png" alt="Light Bulb" />
                    <img src="./emojis/sparkles.png" alt="Sparkles" />
                </h3>

                <div className="search_wrapper">
                    <img src="./icons/search.svg" alt="Search" />

                    <form onSubmit={e => e.preventDefault()}>
                        <input value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search ..." />
                    </form>
                </div>

                {(query === "" && activeFilter === "all") &&

                    <FadeInSection>
                        <div className="grid_header">
                            <h3>Featured ({
                                projects
                                    .filter(el => el.featured).length
                            })</h3>
                            <div className="filters_container">
                                <div className="project_filters">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            className={`filter_btn ${activeFilter === category ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveFilter(category);
                                            }}
                                            aria-label={`Filter by ${category}`}
                                            aria-pressed={activeFilter === category}
                                        >
                                            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="grid_wrapper featured">

                            {
                                projects
                                    .filter(el => el.featured)
                                    .map((project, idx) =>
                                        <Link
                                            key={`featured-${project.id}`}
                                            to={`/project/${project.slug}`}
                                        >
                                            <GridPoject
                                                project={project}
                                            />
                                        </Link>
                                    )
                            }
                        </div>
                    </FadeInSection>
                }

                {(
                    moreShown ||
                    !(query === "" && activeFilter === "all")
                ) ?
                    <>
                        <div className="grid_header">
                            <h3>{
                                (query === "" && activeFilter === "all") ? "Other projects" : "Results"
                            } ({
                                    filteredProjects.length
                                })</h3>
                            {!(query === "" && activeFilter === "all") && (
                                <div className="filters_container">
                                    <div className="project_filters">
                                        {categories.map((category) => (
                                            <button
                                                key={category}
                                                className={`filter_btn ${activeFilter === category ? 'active' : ''}`}
                                                onClick={() => {
                                                    setActiveFilter(category);
                                                }}
                                                aria-label={`Filter by ${category}`}
                                                aria-pressed={activeFilter === category}
                                            >
                                                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className={`grid_wrapper filter-results`} key={`filtered-${activeFilter}-${query}`}>

                            {
                                filteredProjects
                                    .map((project, idx) =>
                                        <Link key={`project-${project.id}`} to={`/project/${project.slug}`}>
                                            <GridPoject
                                                project={project}
                                            />
                                        </Link>
                                    )
                            }
                        </div>

                        {query === "" && activeFilter === "all" && (
                            <button onClick={() => setMoreShown(false)} className="halo">See Less</button>
                        )}
                    </>

                    :

                    <button onClick={() => setMoreShown(true)} className="halo">See More</button>
                }
            </section>
        </FadeInSection>
    );
}

export default ProjectGrid;