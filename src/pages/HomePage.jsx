import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Hero from "../components/Hero";

import Skills from "../components/Skills.jsx";
import Experience from "../components/Experience.jsx";
import Projects from "../components/Projects.jsx";
import Footer from "../components/Footer.jsx";
import Feedbacks from "../components/Feedbacks.jsx";
import Highlights from "../components/Highlights.jsx";
import ContactCTA from "../components/ContactCTA.jsx";

import { supabase } from "../supabase";
import NavMobile from "../components/NavMobile.jsx";
import { useProjects } from "../components/hooks/useProjects";
import ErrorState from "../components/utils/ErrorState";

const HomePage = ({ lenisRef }) => {
    const { projects, isLoading: projectsLoading, error: projectsError, retry: retryProjects } = useProjects({ featured: true, limit: 5 });
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbacksError, setFeedbacksError] = useState(null);

    useEffect(() => {
        supabase
            .from("Feedbacks")
            .select("*")
            .then(({ data, error }) => {
                if (error) {
                    console.error("Error fetching feedbacks:", error);
                    setFeedbacksError(error);
                } else if (data) {
                    setFeedbacks(data);
                    setFeedbacksError(null);
                }
            });
    }, []);

    return (
        <>
            <Nav />
            <NavMobile />

            <main>
                <Hero />
                <Skills />
                <Experience lenisRef={lenisRef} />
                <Highlights isCompact={true} />

                {projectsError ? (
                    <ErrorState error={projectsError} onRetry={retryProjects} message="Failed to load featured projects. Please try again." />
                ) : !projectsLoading && projects.length > 0 && (
                    <Projects projects={projects} />
                )}

                {feedbacksError ? (
                    <ErrorState error={feedbacksError} onRetry={() => window.location.reload()} message="Failed to load feedbacks. Please try again." />
                ) : feedbacks.length > 0 && (
                    <Feedbacks feedbacks={feedbacks} />
                )}

                <ContactCTA />
            </main>

            <Footer />
        </>
    );
}

export default HomePage;
