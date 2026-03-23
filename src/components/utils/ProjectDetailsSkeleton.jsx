import "../../styles/css/projectDetailsSkeleton.css";

const ProjectDetailsSkeleton = () => {
    return (
        <section id="project_details_section" className="skeleton">
            {/* Title */}
            <div className="skeleton_title_wrapper">
                <div className="skeleton_box skeleton_h1"></div>
            </div>

            {/* Gallery Layout */}
            <div className="gallery_layout">
                <div className="swiper_wrapper skeleton_swiper_wrapper">
                    <div className="skeleton_box skeleton_project_image"></div>
                </div>

                <div id="image_list" className="skeleton_image_list">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="skeleton_box skeleton_image_list_item"></div>
                    ))}
                </div>
            </div>

            {/* Tags */}
            <div className="tag_wrapper skeleton_tag_wrapper">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="skeleton_box skeleton_tag"></div>
                ))}
            </div>

            {/* Header wrapper with About title and link */}
            <div id="header_wrapper" className="skeleton_header_wrapper">
                <h3 className="skeleton_box skeleton_h3"></h3>
                <div className="skeleton_box skeleton_link"></div>
            </div>

            {/* Description */}
            <div className="skeleton_description">
                <div className="skeleton_box skeleton_desc_line"></div>
                <div className="skeleton_box skeleton_desc_line"></div>
                <div className="skeleton_box skeleton_desc_line"></div>
                <div className="skeleton_box skeleton_desc_line"></div>
                <div className="skeleton_box skeleton_desc_line short"></div>
            </div>
        </section>
    );
};

export default ProjectDetailsSkeleton;

