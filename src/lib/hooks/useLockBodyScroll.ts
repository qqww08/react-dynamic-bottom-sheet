// SSR 지원
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useLockBodyScroll = (): void => {
  useIsomorphicLayoutEffect((): (() => void) => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = originalStyle);
  }, []);
};
