'use client';

import { useEffect, useRef } from 'react';

export function useAnimateOnView<T extends HTMLElement>(
  animationClass = 'animate-fade-up'
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove(animationClass);
          void el.offsetWidth; // force reflow
          el.classList.add(animationClass);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animationClass]);

  return ref;
}
