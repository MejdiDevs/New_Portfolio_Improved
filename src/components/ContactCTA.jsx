import React from 'react';
import "../styles/css/contactCTA.css";
import { Link } from 'react-router-dom';

const ContactCTA = () => {
    // Generate random particles (stars) for background effect
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100, // %
        delay: -Math.random() * 20, // negative delay to start mid-animation
        duration: Math.random() * 15 + 10 // 10-25s
    }));

    return (
        <section id="contact_cta_section">
            <div className="cta_container">
                {/* Floating Particles */}
                <div className="cta_particles">
                    {particles.map((p) => (
                        <div
                            key={p.id}
                            className="cta_particle"
                            style={{
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                left: `${p.left}%`,
                                top: '105%',
                                animationDuration: `${p.duration}s`,
                                animationDelay: `${p.delay}s`,
                                opacity: Math.random() * 0.5 + 0.3
                            }}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="cta_content">
                    {/* <img src="./bordered_logo.png" alt="Mejdi Chennoufi Logo" className="cta_logo" /> */}

                    <h2><div>Have A Project In</div> <span>Mind?</span> {" "} <img src="./emojis/rocket.png" alt="Rocket emoji" /></h2>
                    <p>Let's collaborate to build something amazing. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>

                    <Link to='/contact' aria-label="Navigate to contact page">
                        <button className="halo" aria-label="Contact me">Contact Me</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
