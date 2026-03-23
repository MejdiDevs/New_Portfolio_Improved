import { useRef, useEffect } from 'react';
import '../../../styles/css/circularText.css';

const CircularText = ({ text, spinDuration = 20, className = '' }) => {
  const letters = Array.from(text);
  const radius = 42; // distance from center to letter
  const elementRef = useRef(null);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef(0);
  const requestRef = useRef(null);

  useEffect(() => {
    const animate = (time) => {
      if (lastTimeRef.current !== 0) {
        const delta = (time - lastTimeRef.current) / 1000; // seconds
        const speed = 360 / spinDuration; // degrees per second
        rotationRef.current = (rotationRef.current + speed * delta) % 360;

        if (elementRef.current) {
          elementRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
        }
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [spinDuration]);

  return (
    <div
      ref={elementRef}
      className={`circular-text-wrapper ${className}`}
    >
      <div className="circular-text-bg" />
      <div className="circular-text-letters">
        {letters.map((letter, i) => {
          const angle = (360 / letters.length) * i;

          return (
            <span
              key={i}
              className="circular-text-letter"
              style={{
                transform: `
                  translate(-50%, -50%)       /* center the letter */
                  rotate(${angle + 180}deg)   /* rotate around center + flip so bottom points in */
                  translateY(-${radius}px)    /* push out along circle */
                `
              }}
            >
              {letter}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CircularText;
