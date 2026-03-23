import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav.jsx";

import ParticleComponent from "../components/Particles.jsx";
import Footer from "../components/Footer.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import NavMobile from "../components/NavMobile.jsx";
import ProjectGridSkeleton from "../components/utils/ProjectGridSkeleton.jsx";
import { useProjects } from "../components/hooks/useProjects";
import ErrorState from "../components/utils/ErrorState";

const ProjectsPage = () => {
    const { projects, isLoading, error, retry } = useProjects();

    useEffect(() => {
        // Scroll to top when component mounts
        const scrollToTop = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            if (window.pageYOffset !== 0) {
                window.scrollTo(0, 0);
            }
        };

        // Immediate scroll
        scrollToTop();

        // Use requestAnimationFrame to ensure it runs after layout
        requestAnimationFrame(() => {
            scrollToTop();
            // Double-check after next frame
            requestAnimationFrame(() => {
                scrollToTop();
            });
        });

        // Fallback for asynchronously loaded content
        const timeoutId = setTimeout(() => {
            scrollToTop();
        }, 50);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <Helmet>
                <title>Mejdi Ch. | Projects</title>
            </Helmet>
            <Nav />
            <NavMobile />

            <main>
                {isLoading ? (
                    <ProjectGridSkeleton />
                ) : error ? (
                    <ErrorState error={error} onRetry={retry} message="Failed to load projects. Please try again." />
                ) : projects.length > 0 ? (
                    <ProjectGrid projects={projects} />
                ) : null}
            </main>

            <Footer />
        </>
    );
}

export default ProjectsPage;
