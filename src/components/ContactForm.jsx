import { useEffect, useState } from "react";
import "../styles/css/contactForm.css";

import serviceOptions from "../data/serviceOptions.json";
import { Toaster } from "react-hot-toast";
import { toastErr, toastSucc } from "./utils/api";

const ContactForm = () => {
    const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validateField = (name, value) => {
        let error = "";
        
        switch (name) {
            case "name":
                if (!value.trim()) {
                    error = "Name is required";
                } else if (value.trim().length < 2) {
                    error = "Name must be at least 2 characters";
                }
                break;
            case "email":
                if (!value) {
                    error = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "Please enter a valid email address";
                }
                break;
            case "service":
                if (!value) {
                    error = "Please select a service";
                }
                break;
            case "message":
                if (!value.trim()) {
                    error = "Message is required";
                } else if (value.trim().length < 10) {
                    error = "Message must be at least 10 characters";
                }
                break;
            default:
                break;
        }
        
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        
        // Validate on change if field has been touched
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors({ ...errors, [name]: error });
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        const allTouched = Object.keys(form).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);
        
        // Validate all fields
        const newErrors = {};
        Object.keys(form).forEach(key => {
            const error = validateField(key, form[key]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        
        // If there are errors, don't submit
        if (Object.keys(newErrors).length > 0) {
            toastErr("Please fix the errors in the form");
            return;
        }
        
        setSubmitting(true);

        const formData = new FormData();
        formData.append("name", form.name.trim());
        formData.append("email", form.email.trim());
        formData.append("service", form.service);
        formData.append("message", form.message.trim());

        try {
            const response = await fetch(process.env.REACT_APP_BASIN_ENDPOINT, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                setSubmitting(false);
                setForm({ name: "", email: "", service: "", message: "" });
                setErrors({});
                setTouched({});

                toastSucc("Message sent successfully!");
            } else {
                const data = await response.json();
                setSubmitting(false);

                toastErr(data?.error || "Something went wrong.");
            }
        } catch (err) {
            setSubmitting(false);
            
            // Check if offline
            if (!navigator.onLine) {
                toastErr("You appear to be offline. Please check your connection.");
            } else {
                toastErr("Network error. Please try again later.");
            }
        }
    };
    
    return (
        <>
            <Toaster />

            <section id="contact_form_section">
                <h1>Let's Connect ! {" "}
                    <img src="./emojis/envelope.png" alt="Envelope emoji" />
                </h1>

                <h3>Have a question, suggestion, or just want to chat? Shoot me a message using the contact form below, and I'll get back to you in no time! {" "}
                    <img src="./emojis/welcoming_smiley.png" alt="Welcoming smiley emoji" />
                </h3>

                <div id="socials_wrapper" role="list" aria-label="Social media links">
                    <a href="/redirect/facebook" target="_blank" rel="noopener noreferrer" aria-label="Visit Facebook profile">
                        <img src="./contact-icons/fb.svg" alt="" aria-hidden="true" />
                    </a>

                    <a href="/redirect/instagram" target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram profile">
                        <img src="./contact-icons/insta.svg" alt="" aria-hidden="true" />
                    </a>

                    <a href="/redirect/linkedIn" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">
                        <img src="./contact-icons/linkedIn.svg" alt="" aria-hidden="true" />
                    </a>

                    <a href="/redirect/github" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">
                        <img src="./contact-icons/github.svg" alt="" aria-hidden="true" />
                    </a>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="name">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        required
                    />
                    {errors.name && touched.name && (
                        <span id="name-error" className="error-message" role="alert">{errors.name}</span>
                    )}

                    <label htmlFor="email">E-mail</label>
                    <input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        required
                    />
                    {errors.email && touched.email && (
                        <span id="email-error" className="error-message" role="alert">{errors.email}</span>
                    )}

                    <label htmlFor="service">Service</label>
                    <div className="select_wrapper">
                        <select
                            id="service"
                            name="service"
                            value={form.service}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-invalid={errors.service ? "true" : "false"}
                            aria-describedby={errors.service ? "service-error" : undefined}
                            required
                        >
                            {
                                serviceOptions.map((option, index) =>
                                    <option key={"service-option-" + index} value={ option }>{ option === "" ? "--- Select Service ---" : option }</option>
                                )
                            }
                        </select>

                        <img src="./icons/drop_arrow.svg" alt="" aria-hidden="true" />
                    </div>
                    {errors.service && touched.service && (
                        <span id="service-error" className="error-message" role="alert">{errors.service}</span>
                    )}

                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Message"
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        required
                    ></textarea>
                    {errors.message && touched.message && (
                        <span id="message-error" className="error-message" role="alert">{errors.message}</span>
                    )}

                    <button
                        className="halo"
                        type="submit"
                        disabled={submitting}
                        aria-label="Submit contact form"
                    >{submitting ? "Sending..." : "Get In Touch"}</button>
                </form>
            </section>
        </>
    );
}

export default ContactForm;