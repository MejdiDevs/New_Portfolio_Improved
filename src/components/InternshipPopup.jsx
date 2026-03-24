import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import "../styles/css/internshipPopup.css";
import useScrollLock from "./hooks/useScrollLock";

const InternshipPopup = () => {
    const [visible, setVisible] = useState(false);
    useScrollLock(visible);
    const [cvLinks, setCvLinks] = useState([]);
    const [showCvChoice, setShowCvChoice] = useState(false);
    const [animating, setAnimating] = useState(false);
    const dismissedPages = useRef(new Set());
    const location = useLocation();

    // Fetch all CV links once
    useEffect(() => {
        const fetchCVs = async () => {
            const { data } = await supabase.from("CV").select("label, link").order("id");
            if (data) setCvLinks(data);
        };
        fetchCVs();
    }, []);

    // Show popup on every route change (if not already dismissed for this page)
    useEffect(() => {
        if (dismissedPages.current.has(location.pathname)) return;

        setVisible(false);
        setShowCvChoice(false);
        setAnimating(false);
        const timer = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const handleClose = () => {
        setVisible(false);
        setShowCvChoice(false);
        setAnimating(false);
        dismissedPages.current.add(location.pathname);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) handleClose();
    };

    const switchToCv = () => {
        setAnimating(true);
        setTimeout(() => {
            setShowCvChoice(true);
            setAnimating(false);
        }, 300);
    };

    const switchToMain = () => {
        setAnimating(true);
        setTimeout(() => {
            setShowCvChoice(false);
            setAnimating(false);
        }, 300);
    };

    if (dismissedPages.current.has(location.pathname) && !visible) return null;

    const screenClass = animating ? "screen_exit" : "screen_enter";

    return (
        <div
            className={`internship_popup_overlay ${visible ? "visible" : ""}`}
            onClick={handleOverlayClick}
        >
            <div className="internship_popup" data-lenis-prevent>
                <button
                    className="internship_popup_close"
                    onClick={handleClose}
                    aria-label="Close popup"
                >
                    ✕
                </button>

                <div className={`internship_popup_screen ${screenClass}`}>
                    {!showCvChoice ? (
                        <>
                            <div className="internship_popup_badge">
                                <span className="pulse_dot"></span>
                                Actively Seeking Internship
                            </div>

                            <h2>Looking for an Internship Opportunity</h2>

                            <p className="internship_popup_desc">
                                I'm a passionate full-stack developer actively seeking an internship in{" "}
                                <strong>AI Development</strong> or <strong>Full-Stack Development</strong>.
                                I'd love to bring my skills, energy, and drive to your team !
                            </p>

                            <div className="internship_popup_ctas">
                                <button
                                    className="internship_popup_cta_primary"
                                    onClick={switchToCv}
                                >
                                    <img src="./icons/person.svg" alt="" style={{ width: 16, height: 16, filter: 'brightness(10)' }} />
                                    View My CV
                                </button>

                                <button
                                    className="internship_popup_cta_secondary"
                                    onClick={() => {
                                        handleClose();
                                        const projectsSection = document.getElementById("project_section");
                                        if (projectsSection) {
                                            projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
                                        } else {
                                            window.location.href = "/projects";
                                        }
                                    }}
                                >
                                    View My Work
                                </button>
                            </div>

                            <div className="internship_popup_divider"></div>

                            <p className="internship_popup_socials_label">Find Me On</p>

                            <div className="internship_popup_socials">
                                <a href="/redirect/linkedIn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <img src="./icons/linkedIn.svg" alt="LinkedIn" />
                                </a>
                                <a href="/redirect/github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <img src="./icons/github.svg" alt="GitHub" />
                                </a>
                                <a href="/redirect/instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <img src="./icons/insta.svg" alt="Instagram" />
                                </a>
                                <a href="/redirect/facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <img src="./icons/fb.svg" alt="Facebook" />
                                </a>
                            </div>
                        </>
                    ) : (
                        <div className="internship_popup_cv_choice">
                            <h2>Choose a Resume</h2>
                            <p className="internship_popup_desc">
                                Select the CV that best matches the role you're considering me for.
                            </p>

                            <div className="internship_popup_cv_options">
                                {cvLinks.map((cv, idx) => (
                                    <a
                                        key={idx}
                                        href={cv.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="internship_popup_cv_card"
                                    >
                                        <span className="cv_card_label">{cv.label} CV</span>
                                        <span className="cv_card_arrow">→</span>
                                    </a>
                                ))}
                            </div>

                            <button
                                className="internship_popup_back_btn"
                                onClick={switchToMain}
                            >
                                ← Back
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InternshipPopup;
