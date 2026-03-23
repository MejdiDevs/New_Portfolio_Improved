import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import contactLinks from "../data/contactLinks.json";
import ParticleComponent from "../components/Particles.jsx";
import { capitalize } from "../components/utils/api";

import "../styles/css/redirectPage.css";

const RedirectPage = () => {
    const { app } = useParams();
    const navigate = useNavigate();

    const [dots, setDots] = useState("");

    const redirectToApp = () => {
        if (
            contactLinks[app]["deep"] &&
            contactLinks[app]["deep"] !== ""
        ) window.location.href = contactLinks[app]["deep"];

        setTimeout(() => {
            window.location.href = contactLinks[app]["fallback"];
        }, 2500);
    };

    useEffect(() => {
        if (!Object.keys(contactLinks).includes(app)) {
            navigate("/");
            return;
        }

        redirectToApp()

        const interval = setInterval(() => {
            setDots(prev => {
                if (prev === "...") {
                    document.title = "Mejdi Ch. | Redirecting";
                    return ""
                };

                document.title = "Mejdi Ch. | Redirecting" + prev + ".";
                return prev + ".";
            });
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="redirect_page">
            <img className="mobl_logo" src="./icons/redirecting_3.svg" alt="Redirecting" />

            <div id="content_wrapper">
                <div>
                    <img src="./icons/redirecting_3.svg" alt="Redirecting" />
                    <h1>Redirecting{dots}</h1>
                </div>

                <span>
                    <p>You're being redirected to {capitalize(app)}, this will only take seconds!</p>
                </span>
            </div>
        </section>
    );
};

export default RedirectPage;