import { useEffect, useState, useRef } from "react";
import "../styles/css/nav.css";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeChanger";
import { useMobileNavContext } from "./contexts/MobileNavContext";

const Nav = () => {
    const [navState, setNavState] = useState({
        stickyClass: '',
        hidden: false,
        transitionClass: ''
    });
    const { stickyClass, hidden, transitionClass } = navState;
    const location = useLocation();
    const projectDetailsRef = useRef(null);
    const contactFormRef = useRef(null);
    const lastScrollY = useRef(0);
    const wasStickyRef = useRef(false);
    const { isOpen, isAnimated, toggleNav } = useMobileNavContext();

    useEffect(() => {
        // Find sections using refs instead of getElementById
        projectDetailsRef.current = document.getElementById("project_details_section");
        contactFormRef.current = document.getElementById("contact_form_section");
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            if (window !== undefined) {
                const currentScrollY = window.scrollY;
                const shouldBeSticky = currentScrollY > 80 &&
                    !projectDetailsRef.current &&
                    !contactFormRef.current;

                let newHidden = hidden;

                // Only apply hide/show logic when sticky
                if (shouldBeSticky) {
                    // Scrolling down - hide navbar
                    if (currentScrollY > lastScrollY.current) {
                        newHidden = true;
                    }
                    // Scrolling up - show navbar
                    else if (currentScrollY < lastScrollY.current) {
                        newHidden = false;
                    }
                } else {
                    newHidden = false;
                }

                // Only apply transition if we were ALREADY sticky.
                // This prevents the initial slide-up animation when the navbar first becomes sticky (and hidden).
                const newTransitionClass = (shouldBeSticky && wasStickyRef.current) ? 'nav-transition' : '';

                // Update refs BEFORE state to ensure consistent logic next tick
                wasStickyRef.current = shouldBeSticky;
                lastScrollY.current = currentScrollY;

                setNavState({
                    stickyClass: shouldBeSticky ? 'sticky' : '',
                    hidden: newHidden,
                    transitionClass: newTransitionClass
                });
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <nav className={`${stickyClass} ${hidden ? 'nav-hidden' : ''} ${transitionClass}`}>
            <div>
                <Link to="/" aria-label="Home page">
                    <img src="./logo.png" alt="Mejdi Chennoufi Portfolio Logo" />
                    <img className="mobl" src="./logo_light.png" alt="Mejdi Chennoufi Portfolio Logo" />
                </Link>

                <ul role="menubar">
                    <li className={location.pathname === '/' ? 'current-menu-item' : ''} role="none"><Link to="/" role="menuitem" aria-label="Navigate to home">Home</Link></li>
                    <li className={location.pathname === '/projects' || location.pathname.startsWith('/project/') ? 'current-menu-item' : ''} role="none"><Link to="/projects" role="menuitem" aria-label="Navigate to projects">Projects</Link></li>
                    <li className={location.pathname === '/highlights' ? 'current-menu-item' : ''} role="none"><Link to="/highlights" role="menuitem" aria-label="Navigate to highlights">Highlights</Link></li>
                    <li className={location.pathname === '/skills' ? 'current-menu-item' : ''} role="none"><Link to="/skills" role="menuitem" aria-label="Navigate to skills">Skills</Link></li>
                    <li className={location.pathname === '/contact' ? 'current-menu-item' : ''} role="none"><Link to="/contact" role="menuitem" aria-label="Navigate to contact">Contact</Link></li>

                    {/* <li className="sprt" role="separator" aria-hidden="true"></li>

                    <li role="none">
                        <ThemeToggle />
                    </li> */}
                </ul>
            </div>

            <button
                id="hamburger"
                onClick={toggleNav}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
            >
                <svg className={`${isAnimated ? "animated" : ""} ${isOpen ? "active" : ""}`}>
                    <g stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <path
                            id="top-line"
                            d="M10,10 L50,10 Z"
                        />
                        <path
                            id="middle-line"
                            d="M10,20 L50,20 Z"
                        />
                        <path
                            id="bottom-line"
                            d="M10,30 L50,30 Z"
                        />
                    </g>
                </svg>
            </button>
        </nav>
    )
}

export default Nav;