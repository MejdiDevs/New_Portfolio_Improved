import { useEffect, useRef, useState } from "react";
import "../styles/css/hero.css";
import FadeInSection from "./utils/FadeInSection";

import { calcYrs, formatZero } from "./utils/api";
import { supabase } from "../supabase";
import RotatingText from "./ArDacityUi/RotatingText/RotatingText";
import CountUp from "./ArDacityUi/CountUp/CountUp";



const StatCard = ({ label, value }) => {
    return (
        <article
            className="stat_wrapper halo"
            aria-label={label.replace(/<br\s*\/?>/gi, " ")}
        >
            <h2>
                <CountUp to={value} formatter={formatZero} />
                <span>+</span>
            </h2>

            <p dangerouslySetInnerHTML={{ __html: label }} />
        </article>
    );
};

const StatSection = ({ statRef, experience, projects, technologies, clients }) => {
    return (
        <section id="stat_section" ref={statRef} aria-label="Statistics">
            <StatCard label="Years Of <br /> Experience" value={experience} />
            <StatCard label="Projects <br /> Completed" value={projects} />
            <StatCard label="Technologies <br /> I've Built With" value={technologies} />
            <StatCard label="Satisfied <br /> Clients" value={clients} />
        </section>
    );
};

const Hero = () => {
    const statRef = useRef(null);
    const heroRef = useRef(null);
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    const [cvLinks, setCvLinks] = useState([]);
    const [showCvDropdown, setShowCvDropdown] = useState(false);
    const cvDropdownRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) observer.disconnect();
            },
            { threshold: 0.4 }
        );

        if (statRef.current) observer.observe(statRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const section = heroRef.current?.closest(".fade-in-section");
            if (section?.classList.contains("is-visible")) {
                setIsSectionVisible(true);
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchCVs = async () => {
            const { data } = await supabase.from('CV').select('label, link').order('id');
            if (data) setCvLinks(data);
        };
        fetchCVs();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cvDropdownRef.current && !cvDropdownRef.current.contains(e.target)) {
                setShowCvDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <FadeInSection>
            <section id="hero_section" ref={heroRef}>
                <div className="hero_background">
                    <div className="bg_shape shape_1"></div>
                    <div className="bg_shape shape_2"></div>
                    <div className="bg_shape shape_3"></div>
                </div>
                <div id="content">
                    <h3 className={isSectionVisible ? 'fade_in' : ''}>
                        Welcome To My Portfolio
                        {/* <div>
                            <RotatingText
                                texts={['Software Developer', 'Full-Stack Developer', 'Mobile Developer', 'IoT Developer', 'Volunteer']}
                                mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                staggerFrom="last"
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '-120%' }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                rotationInterval={3000}
                            />
                        </div> */}
                    </h3>

                    <div id="title">
                        <h1 className={isSectionVisible ? 'fade_in delay_1' : ''}>Hello, I'm</h1>
                        <h1 className={isSectionVisible ? 'fade_in delay_2' : ''}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3em' }}>
                                <RotatingText
                                    texts={['Mejdi Chennoufi', 'An AI Developer', 'A Software Developer', 'A Web Developer', 'A Mobile Developer', 'An IoT Developer', 'An IEEE Officer', 'A Volunteer']}
                                    mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                                    staggerFrom="last"
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '-120%' }}
                                    staggerDuration={0.025}
                                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                                    rotationInterval={5000}
                                />
                                <img src="./emojis/wave.png" alt="Waving Hand" className="wave_emoji" />
                            </span>
                        </h1>

                    </div>

                    <p>I’m an AI Developer with {calcYrs()}+ years of freelance experience delivering production-ready AI and full-stack applications. Skilled in LLMs, ML, Python, AWS, MERN, and vector databases, I help turn ideas into real-world products with clean, reliable code, deployed on cloud infrastructure and built to perform at scale.</p>

                    {/* <div id="services_summary">
                        <div className="service_tag" onClick={() => {
                            const projectsSection = document.getElementById('project_section');
                            if (projectsSection) {
                                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}>
                            <p>Web Development</p>
                        </div>
                        <div className="service_tag" onClick={() => {
                            const projectsSection = document.getElementById('project_section');
                            if (projectsSection) {
                                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}>
                            <p>Mobile Apps</p>
                        </div>
                        <div className="service_tag" onClick={() => {
                            const projectsSection = document.getElementById('project_section');
                            if (projectsSection) {
                                projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}>
                            <p>IoT Solutions</p>
                        </div>
                        <div className="service_tag" onClick={() => {
                            const skillsSection = document.getElementById('skills_section');
                            if (skillsSection) {
                                skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}>
                            <p>Full-Stack</p>
                        </div>
                    </div> */}

                    <div className="impt">
                        <img src="./icons/pin.png" alt="Location Pin" />
                        <p>Sfax / Nabeul, Tunisia</p>
                    </div>

                    <div className="impt">
                        <div></div>
                        <p>Available for new projects</p>
                    </div>

                    <div id="cta">
                        <div className="cv_dropdown_wrapper" ref={cvDropdownRef}>
                            <button
                                className="halo cta_primary"
                                aria-label="View CV"
                                onClick={() => setShowCvDropdown(!showCvDropdown)}
                            >
                                View My CV
                            </button>

                            {showCvDropdown && (
                                <div className="cv_dropdown">
                                    {cvLinks.map((cv, idx) => (
                                        <a
                                            key={idx}
                                            href={cv.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cv_dropdown_item"
                                            onClick={() => setShowCvDropdown(false)}
                                        >
                                            {cv.label} CV
                                            <span className="cv_dropdown_arrow">→</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            className="halo cta_secondary"
                            onClick={() => {
                                const projectsSection = document.getElementById('project_section');
                                if (projectsSection) {
                                    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                            aria-label="View my work"
                        >
                            View My Work
                        </button>

                        <span role="list" aria-label="Social media links" className="social_links">
                            <a href="/redirect/github" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile" className="social_link">
                                <img src="./icons/github.svg" alt="" aria-hidden="true" />
                            </a>

                            <a href="/redirect/linkedIn" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile" className="social_link">
                                <img src="./icons/linkedIn.svg" alt="" aria-hidden="true" />
                            </a>
                        </span>
                    </div>
                </div>

                <div id="img"></div>
            </section>

            <StatSection
                statRef={statRef}
                experience={calcYrs()}
                projects={35}
                technologies={20}
                clients={25}
            />
        </FadeInSection>
    )
}

export default Hero;