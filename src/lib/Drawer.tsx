import * as React from "react";
import { ReactNode, useEffect, useRef } from "react";
import { useLockBodyScroll } from "./hooks";
import Portal from "./Portal";
import styles from "./Drawer.module.css";
import { CSSTransition } from "react-transition-group";
import fadeTransition from "./fade.module.css";
import slideTransition from "./slide.module.css";

export interface DrawerProps {
  visible: boolean;
  onToggle: () => void;
  children: ReactNode | string;
  defaultHeight: string;
  maxHeight: string;
}

export const Drawer = (props: DrawerProps) => {
  const { visible, onToggle, children, defaultHeight, maxHeight } = props;
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const headerREf = useRef<HTMLSpanElement | null>(null);
  useLockBodyScroll();

  const handleShowClick = () => {
    if (onToggle) onToggle();
  };

  useEffect(() => {
    let startMouseClientY = 0;
    let moveClientY = 0;
    let drawerHeight = 0;
    const touchStart = (e) => {
      drawerHeight = drawerRef.current!.offsetHeight;
      startMouseClientY = e.touches[0].clientY;
    };
    const touchmove = (e) => {
      moveClientY = e.touches[0].clientY - startMouseClientY;
      if (drawerRef.current) {
        drawerRef.current.style.height = `${drawerHeight - moveClientY + 10}px`;
        drawerRef.current.style.transition = `none 0s`;
      }
    };

    const touchend = () => {
      if (drawerRef.current) {
        const clientHeight = (document.querySelector(".dimmer") as HTMLDivElement).clientHeight;
        const drawerHeight = drawerRef.current.offsetHeight;
        const heightPercent = Math.floor((drawerHeight / clientHeight) * 100);

        if (heightPercent > 60) {
          startMouseClientY = 0;
          moveClientY = 0;
          drawerRef.current.style.transform = `none`;
          drawerRef.current.style.height = maxHeight ?? `90svh`;
          drawerRef.current.style.transition = `200ms all`;
          return;
        }

        if (heightPercent < 15) {
          drawerRef.current.style.transform = `translateY(2000px)`;
          drawerRef.current.style.transition = `1000ms all`;
          return handleShowClick();
        }

        startMouseClientY = 0;
        moveClientY = 0;
        drawerRef.current.style.transform = `none`;
        drawerRef.current.style.height = defaultHeight ?? "30svh";
        drawerRef.current.style.transition = `200ms all`;
      }
    };
    if (drawerRef.current) {
      drawerRef.current.addEventListener("touchstart", touchStart, false);
      drawerRef.current.addEventListener("touchmove", touchmove, false);
      drawerRef.current.addEventListener("touchend", touchend, false);
    }
    return () => {
      drawerRef.current?.removeEventListener("touchstart", touchStart, false);
      drawerRef.current?.removeEventListener("touchmove", touchmove, false);
      drawerRef.current?.removeEventListener("touchend", touchend, false);
    };
  }, [visible, drawerRef]);

  return (
    <Portal>
      <CSSTransition in={visible} classNames={fadeTransition} unmountOnExit timeout={500}>
        <div className={`dimmer ${styles.back}`} onClick={() => (onToggle as any)()}></div>
      </CSSTransition>
      <CSSTransition in={visible} classNames={slideTransition} unmountOnExit timeout={500}>
        <div ref={drawerRef} className={styles.drawer} data-height={"30svh"}>
          <span className={styles.header} ref={headerREf} />

          {children}
        </div>
      </CSSTransition>
    </Portal>
  );
};
