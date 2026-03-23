import "../styles/css/skillList.css";

import skillData from "../data/skillData.json";
import { capitalize } from "./utils/api";
import FadeInSection from "./utils/FadeInSection";
import { useState } from "react";

const SkillList = ({ certifs }) => {
    const [moreCertifsShown, setMoreShown] = useState(false);

    return (
        <FadeInSection>
            <section id="skill_list_section">
                <h1>Certificates & Badges {" "}
                    <img src="./emojis/trophy.png" alt="Trophy" />
                </h1>

                <h3>A collection of highlights showcasing my skills, expertise, and continuous learning journey. {" "}
                    <img src="./emojis/graduation_cap.png" alt="Graduation Cap" />
                    <img src="./emojis/sparkles.png" alt="Sparkles" />
                </h3>


                <div className="cert_wrapper">
                    {
                        certifs
                            .slice(0, 2)
                            .map((certif, index) =>
                                <div className="cert" key={"cert-num-" + index}>
                                    <div id="img" style={{ backgroundImage: `url(${certif.link})` }}></div>
                                    <p>{certif.label}</p>
                                </div>
                            )
                    }
                </div>

                {moreCertifsShown ?
                    <>
                        <FadeInSection>
                            <div className="cert_wrapper">
                                {
                                    certifs
                                        .slice(2)
                                        .map((certif, index) => (
                                            <div className="cert" key={"cert-num-" + (index + 2)}>
                                                <div
                                                    id="img"
                                                    style={{ backgroundImage: `url(${certif.link})` }}
                                                ></div>
                                                <p>{certif.label}</p>
                                            </div>
                                        ))
                                }
                            </div>
                        </FadeInSection>

                        <button onClick={() => setMoreShown(false)} className="halo">See Less</button>
                    </>

                    :

                    <button onClick={() => setMoreShown(true)} className="halo">See More</button>
                }

                <h1>My Skills {" "}
                    <img src="./emojis/dart.png" alt="Dart" />
                </h1>

                <h3>From frontend frameworks to backend systems, here’s the stack I use to craft functional and user-focused applications. {" "}
                    <img src="./emojis/rocket.png" alt="Rocket" />
                </h3>

                <div className="skill_list">
                    {
                        skillData.map((item, idx) =>
                            <FadeInSection>
                                <div className="class_wrapper" key={"skill-wrapper-" + idx}>
                                    <div>
                                        <h1>{item.class}</h1>

                                        {
                                            item.skills.map((image, sIdx) =>
                                                <div className="skill">
                                                    <img src={image} alt={sIdx} />
                                                    <p>{
                                                        capitalize(image.substring(
                                                            image.lastIndexOf("/") + 1, image.length - 4
                                                        ))
                                                    }</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </FadeInSection>
                        )
                    }
                </div>
            </section>
        </FadeInSection>
    );
}

export default SkillList;