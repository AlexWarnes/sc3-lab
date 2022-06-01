import { readable } from "svelte/store"

/*
	Source: Geoff Rich, 
	"A Svelte store for prefers-reduced-motion", 
	URL: https://geoffrich.net/posts/svelte-prefers-reduced-motion-store/
*/
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const getInitialMotionPreference = () => window.matchMedia(reducedMotionQuery).matches;

export const reducedMotion = readable(getInitialMotionPreference(), set => {
  const updateMotionPreference = event => {
    set(event.matches);
  };

  const mediaQueryList = window.matchMedia(reducedMotionQuery);
  mediaQueryList.addEventListener('change', updateMotionPreference);

  return () => {
    mediaQueryList.removeEventListener('change', updateMotionPreference);
  };
});