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
import type { Position, SheetProps, SheetRefProps } from "../types";
import { isMobile } from "../utils";
import { isNumber } from "../utils/isNumber";

const Sheet: ForwardRefRenderFunction<SheetRefProps, SheetProps> = (props: SheetProps, ref) => {
  const {
    isVisible,
    onClose,
    children,
    edgeHeight,
    defaultHeight = 0.3,
    maxHeight = 0.9,
    onStart,
    onMove,
    onEnd,
    initialPosition = "default",
  } = props;
  const isEdge = isNumber(edgeHeight);
  const [open, setOpen] = useState<boolean>(false);
  const [heightPosition, setHeightPosition] = useState<Position>(initialPosition);
  const sheetRef = useRef<HTMLDivElement | null>(null);

  useLockBodyScroll(open);
  useImperativeHandle(ref, () => ({
    isVisible: open,
    edgeHeight,
    defaultHeight,
    maxHeight,
    positionTo(position: Position) {
      setHeightPosition(position);
      setOpen(true);
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
    if (open && onClose) onClose();
  };

  useEffect(() => {
    let mouseEvent = false;
    let startMouseClientY = 0;
    let moveClientY = 0;
    let drawerHeight = 0;
    let isSheetLock = false;
    let isScrollTopCount = 0;
    const touchStart = (e) => {
      if (onStart) onStart();
      isScrollTopCount = 0;
      drawerHeight = sheetRef.current!.offsetHeight;
      if (isMobile()) {
        startMouseClientY = e.touches?.[0].clientY;
      } else {
        mouseEvent = true;
        startMouseClientY = e.clientY;
      }
    };
    const touchmove = (e) => {
      if (onMove) onMove();
      if (isSheetLock && sheetRef.current!.scrollTop <= 0) {
        isScrollTopCount++;
        if (isScrollTopCount > 4) {
          isSheetLock = false;
          sheetRef.current!.style.overflowY = `hidden`;
        }
      }
      if (isSheetLock) {
        sheetRef.current!.style.overflowY = `scroll`;
        return;
      }
      moveClientY = e.touches?.[0].clientY - startMouseClientY;
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

      isScrollTopCount = 0;
      if (sheetRef.current) {
        const clientHeight = document.body.clientHeight;
        const drawerHeight = sheetRef.current.offsetHeight;
        const heightPercent = Math.floor((drawerHeight / clientHeight) * 100);
        mouseEvent = false;
        if (heightPercent > 50) {
          startMouseClientY = 0;
          moveClientY = 0;
          sheetRef.current.style.height = `${maxHeight * 100}%`;
          sheetRef.current.style.transition = `500ms all`;
          sheetRef.current.style.overflowY = `scroll`;
          isSheetLock = true;
          return;
        }

        if (heightPercent <= 15) {
          if (isEdge) {
            sheetRef.current.style.height = `${edgeHeight * 100}%`;
            sheetRef.current.style.transition = `300ms all`;
            return;
          }

          return handleClose();
        }
        startMouseClientY = 0;
        moveClientY = 0;
        sheetRef.current.style.height = `${defaultHeight * 100}%`;
        sheetRef.current.style.transition = `300ms all`;
      }
    };
    if (sheetRef.current) {
      let initialHeight = "";

      switch (heightPosition) {
        case "max":
          initialHeight = `${maxHeight * 100}%`;
          if (maxHeight > 1 || maxHeight < 0.5) {
            console.error("`maxHeight` is at least 0.5 at most 1.");
            initialHeight = `90%`;
          }
          break;
        case "edge":
          initialHeight = `${(edgeHeight ?? 0.15) * 100}%`;
          if (isEdge && (edgeHeight > 0.5 || edgeHeight < 0.15)) {
            console.error("`edgeHeight` is max 0.15");
            initialHeight = `15%`;
          }
          break;
        default:
          initialHeight = `${defaultHeight * 100}%`;
          if (defaultHeight > 0.5 || defaultHeight < 0.15) {
            console.error("`defaultHeight` is at least 0.15 at most 0.5.");
            initialHeight = `30%`;
          }
      }
      sheetRef.current.style.height = initialHeight;
      if (isMobile()) {
        sheetRef.current.addEventListener("touchstart", touchStart, false);
        sheetRef.current.addEventListener("touchmove", touchmove, false);
        sheetRef.current.addEventListener("touchend", touchend, false);
      } else {
        sheetRef.current.addEventListener("pointerdown", touchStart, false);
        document.body!.addEventListener("pointermove", pointermove, false);
        sheetRef.current.addEventListener("pointerup", touchend, false);
      }
    }
    return () => {
      if (sheetRef.current) {
        mouseEvent = false;
        startMouseClientY = 0;
        moveClientY = 0;
        drawerHeight = 0;
        isScrollTopCount = 0;
        setHeightPosition(initialPosition);
        if (isMobile()) {
          sheetRef.current.removeEventListener("touchstart", touchStart, false);
          sheetRef.current.removeEventListener("touchmove", touchmove, false);
          sheetRef.current.removeEventListener("touchend", touchend, false);
        } else {
          sheetRef.current?.removeEventListener("pointerdown", touchStart, false);
          document.body!.removeEventListener("pointermove", pointermove, false);
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
      <CSSTransition in={!isEdge && open} classNames="fade" unmountOnExit timeout={500}>
        <DimmerStyled className={`dimmer`} onClick={() => handleClose()} />
      </CSSTransition>
      <CSSTransition in={open} classNames="slide" unmountOnExit timeout={600}>
        <SheetStyled ref={sheetRef} maxHeight={maxHeight}>
          <SheetHeaderStyled />
          <SheetScrollStyled id={"sheet-scroll"}>{children}</SheetScrollStyled>
        </SheetStyled>
      </CSSTransition>
    </Portal>
  );
};

const DimmerStyled = styled.div`
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
const SheetStyled = styled.div<{ maxHeight: number }>`
  box-shadow: rgb(0 0 0 / 20%) 0px 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px,
    rgb(0 0 0 / 12%) 0px 6px 30px 5px;
  max-height: ${(props) => props.maxHeight * 100}%;
  position: fixed;
  z-index: 90;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  overflow-x: hidden;
  overflow-y: hidden;
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
const SheetScrollStyled = styled.div`
  background-color: #fff;
`;
const SheetHeaderStyled = styled.span`
  position: sticky;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 20px;
  background-color: #fff;

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
 * @example shhet가 전부 닫히지 않고 가장자리가 보이도록 구성
 *   return (
 *     <div className="App">
 *       <Sheet isVisible edgeHeight={0.15} initialPosition={"edge"}>
 *         Edge Component
 *       </Sheet>
 *       <header className="App-header">
 *         <p>
 *           Edit <code>src/Example.js</code> and save to reload.
 *         </p>
 *       </header>
 *     </div>
 *   );
 * */
export default forwardRef(Sheet);
