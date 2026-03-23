import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const ParticleComponent = () => {
    const particlesInit = useCallback(async engine =>
        await loadSlim(engine), []);

    return (
        <>
            {/* Particles for dark mode */}
            <Particles
                className="tsparticles"
                init={particlesInit}
                options={{
                    fps_limit: 60,

                    particles: {
                        color: { value: "#ffffff" },

                        move: {
                            size: true,
                            attract: { enable: false, rotateX: 600, rotateY: 600 },
                            bounce: false,
                            direction: "none",
                            enable: true,
                            out_mode: "out",
                            random: true,
                            speed: 0.3,
                            straight: false
                        },

                        number: { density: { enable: true, value_area: 1800 }, value: 160 },
                        opacity: {
                            anim: { enable: true, opacity_min: 0, speed: 1, sync: false },
                            random: true,
                            value: 1
                        },

                        size: {
                            anim: { enable: false, size_min: 0.3, speed: 4, sync: false },
                            random: true,
                            value: 3
                        }
                    }
                }}
            />
        </>
    );
}

export default ParticleComponent;