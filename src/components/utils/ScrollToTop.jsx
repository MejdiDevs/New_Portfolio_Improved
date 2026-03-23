import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable browser's scroll restoration to prevent jumping to saved position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to the top of the window on route change
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();

    // Ensure it runs after layout
    requestAnimationFrame(() => {
      scrollToTop();
      requestAnimationFrame(() => {
        scrollToTop();
      });
    });

    // Fallback for delayed content
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 50);

    return () => {
      clearTimeout(timeoutId);
      // Re-enable scroll restoration when component unmounts (optional)
      // if ('scrollRestoration' in window.history) {
      //   window.history.scrollRestoration = 'auto';
      // }
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;