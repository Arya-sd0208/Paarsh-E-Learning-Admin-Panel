'use client';

import { useEffect, useRef } from 'react';

export function useInViewAnimation<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // restart animation
          el.classList.remove('animate-fade-up');
          void el.offsetWidth; // 🔁 force reflow
          el.classList.add('animate-fade-up');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
