import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav.jsx";

import ParticleComponent from "../components/Particles.jsx";
import Footer from "../components/Footer.jsx";

import ContactForm from "../components/ContactForm.jsx";
import ContactFormSkeleton from "../components/utils/ContactFormSkeleton.jsx";
import NavMobile from "../components/NavMobile.jsx";

const ContactPage = () => {
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        // Show skeleton for 500ms before showing content
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Helmet>
                <title>Mejdi Ch. | Contact</title>
            </Helmet>
            <Nav />
            <NavMobile />

            <main>
                {isLoading ? <ContactFormSkeleton /> : <ContactForm />}
            </main>

            <Footer />
        </>
    );
}

export default ContactPage;