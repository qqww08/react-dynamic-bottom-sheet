// SSR 지원
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useLockBodyScroll = ({ isVisible, isEdge }): void => {
  useIsomorphicLayoutEffect((): (() => void) | undefined => {
    if (isEdge) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => (document.body.style.overflow = originalStyle);
  }, [isVisible]);
};
