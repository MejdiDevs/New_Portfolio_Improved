import "../../styles/css/projectGridSkeleton.css";

const ProjectGridSkeleton = () => {
    return (
        <section id="project_grid_section" className="skeleton">
            {/* Title */}
            <div className="skeleton_title">
                <div className="skeleton_box skeleton_h1"></div>
            </div>

            {/* Subtitle */}
            <div className="skeleton_subtitle">
                <div className="skeleton_box skeleton_h3"></div>
            </div>

            {/* Search wrapper */}
            <div className="search_wrapper skeleton_search_wrapper">
                <div className="skeleton_box skeleton_search_input"></div>
            </div>

            {/* Featured projects grid */}
            <div className="grid_wrapper featured skeleton_grid_wrapper">
                {/* Grid header with title and filters */}
                <div className="grid_header skeleton_grid_header">
                    <div className="skeleton_box skeleton_grid_title"></div>
                    <div className="filters_container skeleton_filters_container">
                        <div className="project_filters skeleton_project_filters">
                            {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="skeleton_box skeleton_filter_btn"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2 featured project cards */}
                {Array.from({ length: 2 }).map((_, idx) => (
                    <div key={idx} className="grid_project skeleton_grid_project">
                        <div id="img_wrapper" className="skeleton_img_wrapper">
                            <div className="skeleton_box skeleton_project_image"></div>
                        </div>
                        <div id="content" className="skeleton_content">
                            <div className="skeleton_box skeleton_project_title"></div>
                            <div className="skeleton_box skeleton_project_description"></div>
                            <div className="skeleton_box skeleton_project_description short"></div>
                            <div className="tag_wrapper skeleton_tag_wrapper">
                                {Array.from({ length: 4 }).map((_, tagIdx) => (
                                    <div key={tagIdx} className="skeleton_box skeleton_tag"></div>
                                ))}
                            </div>
                            <div className="bottom_access skeleton_bottom_access">
                                <div className="skeleton_box skeleton_button"></div>
                                <div className="skeleton_box skeleton_button"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* See More button */}
            <div className="skeleton_box skeleton_see_more_button"></div>
        </section>
    );
};

export default ProjectGridSkeleton;

