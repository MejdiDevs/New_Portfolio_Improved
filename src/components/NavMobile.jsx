import "../styles/css/navMobile.css";

import { Link, useLocation } from "react-router-dom";
import { useMobileNavContext } from "./contexts/MobileNavContext";
import useScrollLock from "./hooks/useScrollLock";

const NavMobile = () => {
    const location = useLocation();
    const { isOpen, closeNav } = useMobileNavContext();

    useScrollLock(isOpen);

    return (
        <>
            <div
                className={`overlay ${isOpen ? 'shown' : ''}`}
                onClick={closeNav}
                aria-hidden={!isOpen}
            />

            <aside
                className={`nav_mobile ${isOpen ? 'shown' : ''}`}
                id="mobile-navigation"
                aria-label="Mobile navigation menu"
                aria-hidden={!isOpen}
                data-lenis-prevent
            >
                <div id="profile">
                    <div id="img"></div>

                    <h1>Mejdi Ch.</h1>
                    <a href="mailto:Contact@Mejdi.Ch">
                        <p>Contact@Mejdi.Ch</p>
                    </a>
                </div>

                <hr />

                <nav>
                    <ul role="menubar">
                        <li role="none">
                            <Link
                                to="/"
                                role="menuitem"
                                onClick={closeNav}
                                className={location.pathname === '/' ? 'active' : ''}
                                aria-label="Navigate to home"
                                aria-current={location.pathname === '/' ? 'page' : undefined}
                            >
                                <div className="img_wrapper">
                                    <img src="./icons/tabs/home_1.svg" alt="" aria-hidden="true" />
                                </div>
                                <p>Home</p>
                            </Link>
                        </li>
                        <li role="none">
                            <Link
                                to="/projects"
                                role="menuitem"
                                onClick={closeNav}
                                className={location.pathname === '/projects' ? 'active' : ''}
                                aria-label="Navigate to projects"
                                aria-current={location.pathname === '/projects' ? 'page' : undefined}
                            >
                                <div className="img_wrapper">
                                    <img src="./icons/tabs/projects_2.svg" alt="" aria-hidden="true" />
                                </div>
                                <p>Projects</p>
                            </Link>
                        </li>

                        <li role="none">
                            <Link
                                to="/highlights"
                                role="menuitem"
                                onClick={closeNav}
                                className={location.pathname === '/highlights' ? 'active' : ''}
                                aria-label="Navigate to highlights"
                                aria-current={location.pathname === '/highlights' ? 'page' : undefined}
                            >
                                <div className="img_wrapper">
                                    <img src="./icons/tabs/trophy.svg" alt="" aria-hidden="true" />
                                </div>
                                <p>Highlights</p>
                            </Link>
                        </li>

                        <li role="none">
                            <Link
                                to="/skills"
                                role="menuitem"
                                onClick={closeNav}
                                className={location.pathname === '/skills' ? 'active' : ''}
                                aria-label="Navigate to skills"
                                aria-current={location.pathname === '/skills' ? 'page' : undefined}
                            >
                                <div className="img_wrapper">
                                    <img src="./icons/tabs/light_bulb.svg" alt="" aria-hidden="true" />
                                </div>
                                <p>Skills</p>
                            </Link>
                        </li>

                        <li role="none">
                            <Link
                                to="/contact"
                                role="menuitem"
                                onClick={closeNav}
                                className={location.pathname === '/contact' ? 'active' : ''}
                                aria-label="Navigate to contact"
                                aria-current={location.pathname === '/contact' ? 'page' : undefined}
                            >
                                <div className="img_wrapper">
                                    <img src="./icons/tabs/email_1.svg" alt="" aria-hidden="true" />
                                </div>
                                <p>Contact</p>
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div id="a_btn_wrapper">
                    <a
                        href="/redirect/linkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Connect on LinkedIn"
                    >
                        <button>
                            <img src="./icons/linkedIn.svg" alt="" aria-hidden="true" />
                            <p>Let's Connect !</p>
                        </button>
                    </a>
                </div>
            </aside>
        </>
    );
}

export default NavMobile;