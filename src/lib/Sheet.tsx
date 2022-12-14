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
import type { SheetProps, SheetRefProps, Position } from "../types";

const Sheet: ForwardRefRenderFunction<SheetRefProps, SheetProps> = (props: SheetProps, ref) => {
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
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll();
  useImperativeHandle(ref, () => ({
    isVisible: open,
    defaultHeight,
    maxHeight,
    positionTo(position: Position) {
      if (sheetRef.current) {
        setOpen(true);
        sheetRef.current.style.height = `${
          (position === "max" ? maxHeight : defaultHeight) * 100
        }svh`;
      }
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
      drawerHeight = sheetRef.current!.offsetHeight;
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
      if (sheetRef.current) {
        sheetRef.current.style.height = `${drawerHeight - moveClientY + 10}px`;
        sheetRef.current.style.transition = `none 0s`;
      }
    };
    const pointermove = (e) => {
      if (onMove) onMove();

      if (mouseEvent) {
        moveClientY = e.clientY - startMouseClientY;
        if (sheetRef.current) {
          sheetRef.current.style.height = `${drawerHeight - moveClientY}px`;
          sheetRef.current.style.transition = `none 0s`;
        }
      }
    };
    const touchend = () => {
      if (onEnd) onEnd();
      if (sheetRef.current) {
        const clientHeight = (document.querySelector(".dimmer") as HTMLDivElement).clientHeight;
        const drawerHeight = sheetRef.current.offsetHeight;
        const heightPercent = Math.floor((drawerHeight / clientHeight) * 100);
        mouseEvent = false;
        if (heightPercent > 60) {
          startMouseClientY = 0;
          moveClientY = 0;
          sheetRef.current.style.height = `${maxHeight * 100}svh`;
          sheetRef.current.style.transition = `500ms all`;
          return;
        }
        if (heightPercent < 15) {
          sheetRef.current.style.transition = `300ms all`;

          return handleClose();
        }
        startMouseClientY = 0;
        moveClientY = 0;
        sheetRef.current.style.height = `${defaultHeight * 100}svh`;
        sheetRef.current.style.transition = `300ms all`;
      }
    };
    if (sheetRef.current) {
      let initialHeight = `${(initialPosition === "max" ? maxHeight : defaultHeight) * 100}svh`;
      if (maxHeight > 1 || maxHeight < 0.5) {
        console.error("`maxHeight` is at least 0.5 at most 1.");
        initialHeight = "90svh";
      }
      if (defaultHeight > 0.5 || defaultHeight < 0.15) {
        console.error("`defaultHeight` is at least 0.15 at most 0.5.");
        initialHeight = "30svh";
      }
      sheetRef.current.style.height = initialHeight;
      if (isMobile) {
        sheetRef.current.addEventListener("touchstart", touchStart, false);
        sheetRef.current.addEventListener("touchmove", touchmove, false);
        sheetRef.current.addEventListener("touchend", touchend, false);
      } else {
        sheetRef.current.addEventListener("pointerdown", touchStart, false);
        containerEle!.addEventListener("pointermove", pointermove, false);
        sheetRef.current.addEventListener("pointerup", touchend, false);
      }
    }
    return () => {
      if (sheetRef.current) {
        if (isMobile) {
          sheetRef.current?.removeEventListener("touchstart", touchStart, false);
          containerEle!.removeEventListener("touchmove", touchmove, false);
          sheetRef.current?.removeEventListener("touchend", touchend, false);
        } else {
          sheetRef.current?.removeEventListener("pointerdown", touchStart, false);
          containerEle!.removeEventListener("pointermove", pointermove, false);
          sheetRef.current?.removeEventListener("pointerup", touchend, false);
        }
      }
    };
  }, [open, sheetRef]);

  useEffect(() => {
    setOpen(isVisible);
  }, [isVisible]);

  return (
    <Portal>
      <CSSTransition in={open} classNames="fade" unmountOnExit timeout={500}>
        <DimmerStyled className={`dimmer`} onClick={() => handleClose()} />
      </CSSTransition>
      <CSSTransition in={open} classNames="slide" unmountOnExit timeout={600}>
        <SheetStyled ref={sheetRef}>
          <SheetHeaderStyled />
          {children}
        </SheetStyled>
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
export const SheetStyled = styled.div`
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
export const SheetHeaderStyled = styled.span`
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
/**
 * @example1
 * import { Sheet } from "react-dynamic-bottom-sheet";
 * import { useState } from 'react';
 *
 * function Example() {
 *   const [isOpen, setOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>Open sheet</button>
 *       <Sheet isVisible={isOpen} onClose={()=>setOpen(false)}>
 *            <Your Component/>
 *       </Sheet>
 *     </>
 *   );
 * }
 *
 * @example2
 * import { Sheet, type DrawerRefProps} from "react-dynamic-bottom-sheet";
 * import { useState } from 'react';
 *
 * function Example() {
 *   const [isOpen, setOpen] = useState(false);
 *   const ref = useRef<DrawerRefProps>(null);
 *
 *   // 시트가 열리는 func
 *   const handleDrawerOpen = () => {
 *       ref.current.onOpen()
 *   }
 *
 *   // 시트가 닫히는 func
 *   const handleDrawerClose = () => {
 *       ref.current.onClose()
 *   }
 *   // 해당 시트 포지션으로 시트가 열립니다.
 *   const handleDrawerChange = () => {
 *       ref.current.positionTo("max") // default or max
 *   }
 *   console.log(ref.current.isVisible); // sheet open 여부
 *   console.log(ref.current.maxHeight); // maxHeight
 *   console.log(ref.current.defaultHeight); // defaultHeight
 *
 *   return (
 *     <>
 *       <button onClick={() => handleDrawerOpen()}>SHEET OPEN</button>
 *       <button onClick={() => handleDrawerClose()}>SHEET CLOSE</button>
 *       <button onClick={() => handleDrawerClose()}>SHEET POSITION CHANGE</button>
 *       <Sheet isVisible={isOpen} onClose={()=>setOpen(false)}>
 *           <Your Component/>
 *       </Sheet>
 *     </>
 *   );
 * }
 * */
export default forwardRef(Sheet);
