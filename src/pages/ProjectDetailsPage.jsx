import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav.jsx";

import ParticleComponent from "../components/Particles.jsx";
import Footer from "../components/Footer.jsx";
import ProjectDetails from "../components/ProjectDetails.jsx";

import FadeInSection from "../components/utils/FadeInSection.jsx";
import ProjectDetailsSkeleton from "../components/utils/ProjectDetailsSkeleton.jsx";
import ErrorState from "../components/utils/ErrorState";
import SimilarProjects from "../components/SimilarProjects.jsx";

import { Link, useParams, useNavigate } from "react-router-dom";
import { useProjects } from "../components/hooks/useProjects";
import NavMobile from "../components/NavMobile.jsx";
import ContactCTA from "../components/ContactCTA.jsx";

const ProjectDetailsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { project, isLoading, error, retry } = useProjects({ single: true, slug });

    useEffect(() => {
        // Scroll to top when component mounts or slug changes
        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        // Immediate scroll
        scrollToTop();

        // Use requestAnimationFrame for next frame to ensure it runs after potential layout changes
        requestAnimationFrame(() => {
            scrollToTop();
        });

        // Fallback for asynchronously rendered content or delayed layout changes
        const timeout = setTimeout(() => {
            scrollToTop();
        }, 50); // Small delay to ensure content is rendered

        return () => clearTimeout(timeout);
    }, [slug]); // Re-run when slug changes (navigating between projects)

    // Handle 404 - project not found
    const isNotFound = !isLoading && !error && !project && slug;

    if (isNotFound) {
        return (
            <>
                <Nav />
                <NavMobile />

                <main>
                    <ErrorState
                        error={new Error("Project not found")}
                        onRetry={() => navigate('/projects')}
                        message="The project you're looking for doesn't exist or has been removed."
                    />
                    <FadeInSection>
                        <section id="cta">
                            <h2>Looking for something else? <br /> Feel free to explore my other projects! {" "}
                                <img src="./emojis/rocket.png" alt="Rocket emoji" />
                            </h2>

                            <Link to='/projects' aria-label="Navigate to projects page">
                                <button className="halo" aria-label="View all projects">View All Projects</button>
                            </Link>
                        </section>
                    </FadeInSection>
                </main>

                <Footer />
            </>
        );
    }

    // Prepare meta data for the project
    const projectTitle = project?.title ? `Mejdi Ch. | ${project.title}` : 'Mejdi Ch. | Project';

    // Extract plain text from description (strip HTML tags and normalize whitespace)
    const getPlainText = (text) => {
        if (!text) return '';
        // Remove HTML tags and decode HTML entities
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';
        // Normalize whitespace and trim
        return plainText.replace(/\s+/g, ' ').trim();
    };

    const projectDescription = project?.description
        ? (() => {
            const plainDesc = getPlainText(project.description);
            return plainDesc.length > 160 ? plainDesc.substring(0, 157) + '...' : plainDesc;
        })()
        : 'View this project from Mejdi Chennoufi\'s portfolio. Full-stack developer specializing in web, mobile, and IoT solutions.';
    const projectImage = project?.images?.[0] || 'https://www.mejdi.ch/preview.png';
    const projectUrl = project?.slug ? `https://mejdi.ch/project/${project.slug}` : `https://mejdi.ch/project/${slug}`;
    const projectTags = project?.tags?.join(', ') || '';

    return (
        <>
            {project && (
                <Helmet>
                    <title>{projectTitle}</title>
                    <meta name="description" content={projectDescription} />
                    <meta name="keywords" content={`${projectTags}, Mejdi Chennoufi, Portfolio, Full-Stack Developer`} />
                    <link rel="canonical" href={projectUrl} />

                    {/* Open Graph / Facebook */}
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={projectUrl} />
                    <meta property="og:title" content={projectTitle} />
                    <meta property="og:description" content={projectDescription} />
                    <meta property="og:image" content={projectImage} />
                    <meta property="og:image:alt" content={`${project.title} - Project Screenshot`} />
                    <meta property="og:site_name" content="Mejdi Ch. Portfolio" />

                    {/* Twitter */}
                    <meta property="twitter:card" content="summary_large_image" />
                    <meta property="twitter:url" content={projectUrl} />
                    <meta property="twitter:title" content={projectTitle} />
                    <meta property="twitter:description" content={projectDescription} />
                    <meta property="twitter:image" content={projectImage} />

                    {/* Structured Data for Project */}
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CreativeWork",
                            "name": project.title,
                            "description": projectDescription,
                            "image": projectImage,
                            "url": projectUrl,
                            "author": {
                                "@type": "Person",
                                "name": "Mejdi Chennoufi",
                                "url": "https://mejdi.ch"
                            },
                            "keywords": projectTags,
                            ...(project.link && {
                                "mainEntityOfPage": {
                                    "@type": "WebPage",
                                    "@id": `https://${project.link}`
                                }
                            })
                        })}
                    </script>
                </Helmet>
            )}

            <Nav />
            <NavMobile />

            <main>
                {isLoading ? (
                    <ProjectDetailsSkeleton />
                ) : error ? (
                    <ErrorState error={error} onRetry={retry} message="Failed to load project details. Please try again." navigateToProjects={true} />
                ) : project ? (
                    <>
                        <FadeInSection>
                            <ProjectDetails project={project} />
                        </FadeInSection>

                        <FadeInSection>
                            <SimilarProjects currentProject={project} />
                        </FadeInSection>

                        <FadeInSection>
                            <ContactCTA />
                        </FadeInSection>
                    </>
                ) : null}
            </main>

            <Footer />
        </>
    );
}

export default ProjectDetailsPage;
