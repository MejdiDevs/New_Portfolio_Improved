import { useCallback, useRef, memo } from "react";
import "../styles/css/projectDetails.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { formatTextWithLineBreaks } from "./utils/sanitize";

const ProjectDetails = ({ project }) => {
    const sliderRef = useRef(null)

    const handlePrev = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slideNext();
    }, []);

    return (
        <>
            {project &&

                <section id="project_details_section">
                    <h1>{project.title}</h1>

                    <div className="gallery_layout">
                        <div className="swiper_wrapper">
                            <Swiper
                                spaceBetween={50}
                                slidesPerView={1}
                                loop={true}
                                ref={sliderRef}
                                autoplay={{
                                    delay: 3000, // time in ms
                                    disableOnInteraction: false,
                                }}
                                modules={[Autoplay]}
                            >
                                {
                                    project.images.slice(1, project.images.length).map((image, idx) =>
                                        <SwiperSlide key={"project-details-slide-" + idx}>
                                            <div style={{ backgroundImage: `url('${image}')` }}></div>
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>

                            {
                                (project.images.length > 2) &&

                                <div className="nav_wrapper">
                                    <button
                                        className="arrow"
                                        id="prev-arrow"
                                        onClick={handlePrev}
                                        aria-label="Previous image"
                                    >
                                        <img src="./icons/arrow.svg" alt="Previous" />
                                    </button>

                                    <button
                                        className="arrow"
                                        id="next-arrow"
                                        onClick={handleNext}
                                        aria-label="Next image"
                                    >
                                        <img src="./icons/arrow.svg" alt="Next" />
                                    </button>
                                </div>
                            }
                        </div>

                        {
                            (project.images.length > 4) &&

                            <div id="image_list" role="list">
                                {
                                    project.images.slice(project.images.length - 3, project.images.length).map((image, idx) =>
                                        <div
                                            key={`project-image-${idx}`}
                                            style={{ backgroundImage: `url('${image}')` }}
                                            role="listitem"
                                            aria-label={`Project image ${idx + 1}`}
                                        />
                                    )
                                }
                            </div>
                        }
                    </div>

                    <div className="tag_wrapper">
                        {
                            project.tags.map((tag, idx) =>
                                <div className="tag" key={"project-tag-" + idx}>{tag}</div>
                            )
                        }
                    </div>

                    <div id="header_wrapper">
                        <h3>About The Project</h3>

                        {project.link &&

                            <a href={"https://" + project.link} target="_blank" rel="noopener noreferrer">
                                <p>Visit Project</p>
                                <p className="mobl">Visit</p>
                            </a>
                        }
                    </div>

                    <p dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(project.description) }} />
                </section>
            }
        </>
    )
}

export default memo(ProjectDetails);