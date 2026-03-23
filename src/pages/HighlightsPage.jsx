import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Nav from "../components/Nav.jsx";
import NavMobile from "../components/NavMobile.jsx";
import Footer from "../components/Footer.jsx";
import Highlights from "../components/Highlights.jsx";

const HighlightsPage = () => {
    useEffect(() => {
        // Scroll to top when component mounts
        const scrollToTop = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };

        // Immediate scroll
        scrollToTop();

        // Also scroll after a short delay to ensure it happens after content loads
        const timeoutId = setTimeout(() => {
            scrollToTop();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            <Helmet>
                <title>Mejdi Ch. | Highlights</title>
                <meta name="description" content="Explore Mejdi Chennoufi's highlights in hackathons and ideathons. Competitive coding competitions, innovative solutions, and trophies showcasing technical excellence." />
                <meta name="keywords" content="Hackathons, Ideathons, Highlights, Competitions, Trophies, Mejdi Chennoufi, Portfolio, Full-Stack Developer, Tech Challenges" />
                <link rel="canonical" href="https://mejdi.ch/highlights" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://mejdi.ch/highlights" />
                <meta property="og:title" content="Mejdi Ch. | Highlights" />
                <meta property="og:description" content="Explore Mejdi Chennoufi's highlights in hackathons and ideathons. Competitive coding competitions, innovative solutions, and trophies showcasing technical excellence." />
                <meta property="og:image" content="https://www.mejdi.ch/preview.png" />
                <meta property="og:image:alt" content="Mejdi Chennoufi - Highlights" />
                <meta property="og:site_name" content="Mejdi Ch. Portfolio" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://mejdi.ch/highlights" />
                <meta property="twitter:title" content="Mejdi Ch. | Highlights" />
                <meta property="twitter:description" content="Explore Mejdi Chennoufi's highlights in hackathons and ideathons. Competitive coding competitions, innovative solutions, and trophies showcasing technical excellence." />
                <meta property="twitter:image" content="https://www.mejdi.ch/preview.png" />
            </Helmet>
            <Nav />
            <NavMobile />
            <main>
                <Highlights />
            </main>
            <Footer />
        </>
    );
};

export default HighlightsPage;

