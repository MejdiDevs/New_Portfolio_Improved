import "../../styles/css/skillListSkeleton.css";

const SkillListSkeleton = () => {
    return (
        <section id="skill_list_section" className="skeleton">
            {/* Certificates & Badges Section */}
            <div className="skeleton_title">
                <div className="skeleton_box skeleton_h1"></div>
            </div>
            
            <div className="skeleton_subtitle">
                <div className="skeleton_box skeleton_h3"></div>
            </div>

            {/* Certificates Grid - 2 cards initially */}
            <div className="cert_wrapper skeleton_cert_wrapper">
                {Array.from({ length: 2 }).map((_, idx) => (
                    <div key={idx} className="cert skeleton_cert">
                        <div className="skeleton_box skeleton_cert_image"></div>
                        <div className="skeleton_box skeleton_cert_label"></div>
                    </div>
                ))}
            </div>

            {/* See More Button */}
            <div className="skeleton_box skeleton_button"></div>

            {/* My Skills Section */}
            <div className="skeleton_title">
                <div className="skeleton_box skeleton_h1"></div>
            </div>
            
            <div className="skeleton_subtitle">
                <div className="skeleton_box skeleton_h3"></div>
            </div>

            {/* Skills List - 3 class wrappers (Frontend, Backend, Tools) */}
            <div className="skill_list skeleton_skill_list">
                {Array.from({ length: 3 }).map((_, classIdx) => (
                    <div key={classIdx} className="class_wrapper skeleton_class_wrapper">
                        <div>
                            {/* Class title */}
                            <div className="skeleton_box skeleton_class_title"></div>
                            
                            {/* Skills grid - varying number of skills per class */}
                            {Array.from({ length: classIdx === 0 ? 9 : classIdx === 1 ? 10 : 4 }).map((_, skillIdx) => (
                                <div key={skillIdx} className="skill skeleton_skill">
                                    <div className="skeleton_box skeleton_skill_icon"></div>
                                    <div className="skeleton_box skeleton_skill_label"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillListSkeleton;

