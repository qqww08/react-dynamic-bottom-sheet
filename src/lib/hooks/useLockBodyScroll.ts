// SSR 지원
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { isSSR } from "../../utils";

export const useLockBodyScroll = ({ isVisible, isEdge }): void => {
  useIsomorphicLayoutEffect((): (() => void) | undefined => {
    if (isEdge || isSSR()) return;
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => (document.body.style.overflow = originalStyle);
  }, [isVisible]);
};
