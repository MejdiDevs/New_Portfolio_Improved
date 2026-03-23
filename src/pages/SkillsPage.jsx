import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav.jsx";

import ParticleComponent from "../components/Particles.jsx";
import Footer from "../components/Footer.jsx";
import SkillList from "../components/SkillList.jsx";
import NavMobile from "../components/NavMobile.jsx";
import SkillListSkeleton from "../components/utils/SkillListSkeleton.jsx";
import { useCertifications } from "../components/hooks/useCertifications";
import ErrorState from "../components/utils/ErrorState";

const SkillsPage = () => {
    const { certifications, isLoading, error, retry } = useCertifications();

    useEffect(() => {
        // Scroll to top when component mounts
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
    }, []);

    return (
        <>
            <Helmet>
                <title>Mejdi Ch. | Skills</title>
            </Helmet>
            <Nav />
            <NavMobile />

            <main>
                {isLoading ? (
                    <SkillListSkeleton />
                ) : error ? (
                    <ErrorState error={error} onRetry={retry} message="Failed to load certifications. Please try again." />
                ) : certifications.length > 0 ? (
                    <SkillList certifs={certifications} />
                ) : null}
            </main>

            <Footer />
        </>
    );
}

export default SkillsPage;
