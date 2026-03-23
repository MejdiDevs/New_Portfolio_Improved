import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/dist/css/splide.min.css";
import React from "react";

const ScrollableInfBanner = ({ children, direction, speed }) => {

    return (
        <div>
            <div>
                <Splide
                    options={{
                        type: "loop",

                        drag: 'free',
                        snap: false,
                        
                        direction: direction ? direction : 'ltr',

                        autoScroll: {
                            speed,
                            pauseOnHover: false,
                            pauseOnFocus: false,
                            rewind: true
                        },

                        arrows: false,
                        pagination: false,

                        fixedWidth: '445px',
                        gap: '0'
                    }}
                    extensions={{ AutoScroll }} // Use the AutoScroll extension
                >
                    {
                        React.Children.map(children, (child, index) => (
                            <SplideSlide>
                                {child}
                            </SplideSlide>
                        ))
                    }
                </Splide>
            </div>
        </div>
    );
}

export default ScrollableInfBanner;