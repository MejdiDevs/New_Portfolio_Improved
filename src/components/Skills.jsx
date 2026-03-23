import FadeInSection from "./utils/FadeInSection";
import ScrollV from "./ArDacityUi/ScrollV/ScrollV";
import "../styles/css/skills.css";
import { shuffleArray, capitalize } from "./utils/api";

const images = [
  "./icons/skills/react.svg",
  "./icons/skills/js.svg",
  "./icons/skills/nodejs.svg",
  "./icons/skills/expressjs.svg",
  "./icons/skills/figma.svg",
  "./icons/skills/mongodb.svg",
  "./icons/skills/sass.svg",
  "./icons/skills/angularjs.svg",
  "./icons/skills/arduino.svg",
  "./icons/skills/bootstrap.svg",
  "./icons/skills/c.svg",
  "./icons/skills/css.svg",
  "./icons/skills/dart.svg",
  "./icons/skills/django.svg",
  "./icons/skills/firebase.svg",
  "./icons/skills/supabase.svg",
  "./icons/skills/flutter.svg",
  "./icons/skills/html.svg",
  "./icons/skills/illustrator.svg",
  "./icons/skills/json.svg",
  "./icons/skills/mysql.svg",
  "./icons/skills/nextjs.svg",
  "./icons/skills/notion.svg",
  "./icons/skills/photoshop.svg",
  "./icons/skills/php.svg",
  "./icons/skills/python.svg",
  "./icons/skills/typescript.svg"
];

const shuffled = shuffleArray(images);
const mid = Math.floor(shuffled.length / 2);

const Skill = ({ src }) => {
  const name = capitalize(
    src.substring(src.lastIndexOf("/") + 1, src.length - 4)
  );

  return (
    <div className="skill_wrapper">
      <div>
        <img src={src} alt={`${name} logo`} />
      </div>
      <p>{name}</p>
    </div>
  );
};

const Skills = () => {
  return (
    <FadeInSection>
      <section id="skills_section">
        <div className="title_wrapper">
          <h2>
            <span>Skills</span>{" "}
            <img src="./emojis/dart.png" alt="Dart emoji" />
          </h2>
          <p>The Skills, Tools And Technologies I Specialize In:</p>
        </div>

        <div className="skills_scroll_wrapper">
          <div className="grad" />
          <div className="grad" />

          <ScrollV
            velocity={35}
            numCopies={6}
            parallaxClassName="parallax"
            scrollerClassName="scroller"
            texts={[
              shuffled.slice(0, mid).map((img) => (
                <Skill key={img} src={img} />
              ))
            ]}
          />

          <ScrollV
            velocity={-35}
            numCopies={6}
            parallaxClassName="parallax"
            scrollerClassName="scroller"
            texts={[
              shuffled.slice(mid).map((img) => (
                <Skill key={img} src={img} />
              ))
            ]}
          />
        </div>
      </section>
    </FadeInSection>
  );
};

export default Skills;
