import "../../styles/css/contactFormSkeleton.css";

const ContactFormSkeleton = () => {
    return (
        <section id="contact_form_section" className="skeleton">
            {/* Title */}
            <div className="skeleton_title">
                <div className="skeleton_box skeleton_h1"></div>
            </div>
            
            {/* Subtitle */}
            <div className="skeleton_subtitle">
                <div className="skeleton_box skeleton_h3"></div>
            </div>

            {/* Socials wrapper */}
            <div id="socials_wrapper" className="skeleton_socials_wrapper">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="skeleton_box skeleton_social_icon"></div>
                ))}
            </div>

            {/* Form */}
            <div className="skeleton_form">
                {/* Name field */}
                <div className="skeleton_form_field">
                    <div className="skeleton_box skeleton_label"></div>
                    <div className="skeleton_box skeleton_input"></div>
                </div>

                {/* Email field */}
                <div className="skeleton_form_field">
                    <div className="skeleton_box skeleton_label"></div>
                    <div className="skeleton_box skeleton_input"></div>
                </div>

                {/* Service field */}
                <div className="skeleton_form_field">
                    <div className="skeleton_box skeleton_label"></div>
                    <div className="skeleton_box skeleton_select"></div>
                </div>

                {/* Message field */}
                <div className="skeleton_form_field">
                    <div className="skeleton_box skeleton_label"></div>
                    <div className="skeleton_box skeleton_textarea"></div>
                </div>

                {/* Submit button */}
                <div className="skeleton_box skeleton_button"></div>
            </div>
        </section>
    );
};

export default ContactFormSkeleton;



