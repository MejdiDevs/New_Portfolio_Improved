import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CircularText from './ArDacityUi/CircularText/CircularText';
import '../styles/css/backToTopBtn.css';
import { useLenis } from './contexts/LenisProvider';

const BackToTopBtn = () => {
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lenisRef = useLenis();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(0, {
        duration: 0.6, // faster
        easing: t => t * (2 - t), // smooth ease-out
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="back-to-top"
          onClick={scrollToTop}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-label="Back to top"
        >
          <CircularText
            text="BACK*TO*TOP*"
            spinDuration={isHovered ? 2.5 : 20}
            onHover="speedUp"
            className="back-to-top-text"
          />
          <div className="back-to-top-center">
            <span className="back-to-top-arrow">↑</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTopBtn;
