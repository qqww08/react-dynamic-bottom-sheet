import * as React from "react";
import {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLockBodyScroll } from "./hooks";
import Portal from "./Portal";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import type { DrawerProps, DrawerRefProps, Position } from "../types";

const Drawer: ForwardRefRenderFunction<DrawerRefProps, DrawerProps> = (props: DrawerProps, ref) => {
  const {
    isVisible,
    onClose,
    children,
    defaultHeight = 0.3,
    maxHeight = 0.9,
    onStart,
    onMove,
    onEnd,
    initialPosition = "default",
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll();
  useImperativeHandle(ref, () => ({
    isVisible: open,
    defaultHeight,
    maxHeight,
    positionTo(position: Position) {
      if (drawerRef.current)
        drawerRef.current.style.height = `${
          (position === "max" ? maxHeight : defaultHeight) * 100
        }svh`;
    },
    onOpen() {
      setOpen(true);
    },
    onClose() {
      setOpen(false);
    },
  }));
  const handleClose = () => {
    setOpen(false);
    if (isVisible) onClose();
  };

  useEffect(() => {
    const containerEle = document.querySelector("#drawer-portal");
    const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
    let mouseEvent = false;
    let startMouseClientY = 0;
    let moveClientY = 0;
    let drawerHeight = 0;
    const touchStart = (e) => {
      if (onStart) onStart();
      drawerHeight = drawerRef.current!.offsetHeight;
      if (isMobile) {
        startMouseClientY = e.touches[0].clientY;
      } else {
        mouseEvent = true;
        startMouseClientY = e.clientY;
      }
    };
    const touchmove = (e) => {
      if (onMove) onMove();

      moveClientY = e.touches[0].clientY - startMouseClientY;
      if (drawerRef.current) {
        drawerRef.current.style.height = `${drawerHeight - moveClientY + 10}px`;
        drawerRef.current.style.transition = `none 0s`;
      }
    };
    const pointermove = (e) => {
      if (onMove) onMove();

      if (mouseEvent) {
        moveClientY = e.clientY - startMouseClientY;
        if (drawerRef.current) {
          drawerRef.current.style.height = `${drawerHeight - moveClientY}px`;
          drawerRef.current.style.transition = `none 0s`;
        }
      }
    };
    const touchend = () => {
      if (onEnd) onEnd();
      if (drawerRef.current) {
        const clientHeight = (document.querySelector(".dimmer") as HTMLDivElement).clientHeight;
        const drawerHeight = drawerRef.current.offsetHeight;
        const heightPercent = Math.floor((drawerHeight / clientHeight) * 100);
        mouseEvent = false;
        if (heightPercent > 60) {
          startMouseClientY = 0;
          moveClientY = 0;
          drawerRef.current.style.height = `${maxHeight * 100}svh`;
          drawerRef.current.style.transition = `500ms all`;
          return;
        }
        if (heightPercent < 15) {
          drawerRef.current.style.transition = `300ms all`;

          return handleClose();
        }
        startMouseClientY = 0;
        moveClientY = 0;
        drawerRef.current.style.height = `${defaultHeight * 100}svh`;
        drawerRef.current.style.transition = `300ms all`;
      }
    };
    if (drawerRef.current) {
      let initialHeight = `${(initialPosition === "max" ? maxHeight : defaultHeight) * 100}svh`;
      if (maxHeight > 1) {
        console.error("The maximum of `maxHeight` is 1.");
        initialHeight = "90svh";
      }
      if (defaultHeight > 1) {
        console.error("The maximum of `defaultHeight` is 1.");
        initialHeight = "30svh";
      }
      drawerRef.current.style.height = initialHeight;
      if (isMobile) {
        drawerRef.current.addEventListener("touchstart", touchStart, false);
        drawerRef.current.addEventListener("touchmove", touchmove, false);
        drawerRef.current.addEventListener("touchend", touchend, false);
      } else {
        drawerRef.current.addEventListener("pointerdown", touchStart, false);
        containerEle!.addEventListener("pointermove", pointermove, false);
        drawerRef.current.addEventListener("pointerup", touchend, false);
      }
    }
    return () => {
      if (drawerRef.current) {
        if (isMobile) {
          drawerRef.current?.removeEventListener("touchstart", touchStart, false);
          containerEle!.removeEventListener("touchmove", touchmove, false);
          drawerRef.current?.removeEventListener("touchend", touchend, false);
        } else {
          drawerRef.current?.removeEventListener("pointerdown", touchStart, false);
          containerEle!.removeEventListener("pointermove", pointermove, false);
          drawerRef.current?.removeEventListener("pointerup", touchend, false);
        }
      }
    };
  }, [open, drawerRef]);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible]);

  return (
    <Portal>
      <CSSTransition in={open} classNames="fade" unmountOnExit timeout={500}>
        <DimmerStyled className={`dimmer`} onClick={() => handleClose()} />
      </CSSTransition>
      <CSSTransition in={open} classNames="slide" unmountOnExit timeout={600}>
        <DrawerStyled ref={drawerRef}>
          <DrawerHeaderStyled />
          {children}
        </DrawerStyled>
      </CSSTransition>
    </Portal>
  );
};

export const DimmerStyled = styled.div`
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &.fade-enter {
    opacity: 0.01;
  }
  &.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`;
export const DrawerStyled = styled.div`
  height: 30vh;
  background: #fff;
  position: absolute;
  z-index: 90;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 30px 30px 0 0;
  &.slide-enter {
    transform: translateY(2000px);
  }
  &.slide-enter-active {
    transform: translateY(0);
    transition: transform 500ms linear;
  }

  &.slide-exit {
    transform: translateY(0);
  }
  &.slide-exit-active {
    transform: translateY(2000px);
    transition: transform 500ms linear;
  }
`;
export const DrawerHeaderStyled = styled.span`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 20px;
  transform: scaleY(2);
  &:before {
    position: absolute;
    content: "";
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background-color: #eaeaea;
    border-radius: 10px;
  }
`;
export default forwardRef(Drawer);
