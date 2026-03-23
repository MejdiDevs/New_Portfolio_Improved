import "../styles/css/footer.css";
import { Toaster } from 'react-hot-toast';
import { toastSucc } from "./utils/api";

const Footer = () => {
    const handleCopy = str => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(str)
                .then(() => {
                    toastSucc("Copied to clipboard !");
                })
                .catch((error) => {
                    console.error("Clipboard API error: ", error);
                    fallbackCopy(str);
                });
        } else {
            fallbackCopy(str);
        }
    };
    
    const fallbackCopy = str => {
        const textArea = document.createElement("textarea");
        textArea.value = str;

        document.body.appendChild(textArea);
        textArea.select();

        document.execCommand("copy");
        document.body.removeChild(textArea);

        toastSucc("Copied to clipboard !");
    };
    
    return (
        <>
            <Toaster />
        
            <footer>
                <div className="title_wrapper">
                    <h2>Get in touch</h2>
                    
                    <p>What’s next? Feel free to reach out to me if you're looking for <br /> a developer, have a query, or simply want to connect.</p>
                </div>

                <div className="contact_info">
                    <img src="./icons/email.svg" alt="E-mail" />
                    <h3>Contact@Mejdi.ch</h3>

                    {/* <a href="mailto:contact@mejdi.ch"> */}
                        <button onClick={ () => handleCopy("Contact@Mejdi.Ch") }>
                            <img src="./icons/copy.svg" alt="Copy" />
                        </button>
                    {/* </a> */}
                </div>

                <div className="contact_info">
                    <img src="./icons/phone.svg" alt="Phone Number" />
                    <h3>+216 26945630</h3>

                    <button onClick={ () => handleCopy("+21626945630") }>
                        <img src="./icons/copy.svg" alt="Copy" />
                    </button>
                </div>

                <div className="footer_divider"></div>

                <p>You may also find me on these platforms!</p>
                <div id="socials_wrapper">
                    <a href="/redirect/github" target="_blank" rel="noopener noreferrer">
                        <img src="./icons/github.svg" alt="Github" />
                    </a>

                    <a href="/redirect/linkedIn" target="_blank" rel="noopener noreferrer">
                        <img src="./icons/linkedIn.svg" alt="LinkedIn" />
                    </a>

                    <a href="/redirect/instagram" target="_blank" rel="noopener noreferrer">
                        <img src="./icons/insta.svg" alt="Instagram" />
                    </a>

                    <a href="/redirect/facebook" target="_blank" rel="noopener noreferrer">
                        <img src="./icons/fb.svg" alt="Facebook" />
                    </a>
                </div>

                <div className="footer_divider footer_divider_final"></div>

                <div className="copyright">
                    <p>© {new Date().getFullYear()} Mejdi Chennoufi. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Footer;