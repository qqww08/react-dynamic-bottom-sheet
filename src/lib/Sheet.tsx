import * as React from "react";
import { forwardRef, ForwardRefRenderFunction, useImperativeHandle } from "react";
import { useBottomSheetProps, useLockBodyScroll } from "./hooks";
import Portal from "./Portal";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import type { SheetProps, SheetRefProps } from "../types";

const Sheet: ForwardRefRenderFunction<SheetRefProps, SheetProps> = (props: SheetProps, ref) => {
  const {
    isVisible,
    onClose,
    children,
    defaultHeight = 0.3,
    maxHeight = 0.9,
    sheetLimit = [10, 50],
    zIndex = 100,
    initialPosition = "default",
    classname = "sheet",
    isEdge,
    onMove,
    onStart,
    onEnd,
  } = props;

  const { isDragging, ...bottomSheetProps } = useBottomSheetProps<HTMLDivElement>({
    initialPosition,
    defaultHeight,
    maxHeight,
    sheetLimit,
    onClose,
    onMove,
    onStart,
    onEnd,
    isEdge,
    classname,
  });

  useLockBodyScroll({ isVisible, isEdge });

  useImperativeHandle(ref, () => ({
    isVisible,
    onClose,
    children,
    defaultHeight,
    maxHeight,
    sheetLimit,
    zIndex,
    initialPosition,
    isDragging,
    isEdge,
    classname,
  }));

  return (
    <Portal classname={classname}>
      <CSSTransition in={!isEdge && isVisible} classNames="fade" unmountOnExit timeout={300}>
        <DimmerStyled
          zIndex={zIndex}
          className={`${classname}-dimmer`}
          onClick={() => onClose && onClose()}
        />
      </CSSTransition>
      <CSSTransition in={isVisible} classNames="slide" unmountOnExit timeout={500}>
        <SheetStyled
          zIndex={zIndex}
          maxHeight={maxHeight}
          isVisible={isVisible}
          {...bottomSheetProps}
          className={`${classname}-container`}
        >
          <SheetHeaderStyled className={`${classname}-header`} />
          <SheetScrollStyled className={`${classname}-scroll`}>{children}</SheetScrollStyled>
        </SheetStyled>
      </CSSTransition>
    </Portal>
  );
};

const DimmerStyled = styled.div<{ zIndex: number }>`
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ zIndex }) => zIndex};

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

const SheetStyled = styled.div<{
  maxHeight: number;
  isVisible: boolean;
  zIndex: number;
}>`
  box-shadow: rgb(0 0 0 / 20%) 0 8px 10px -5px, rgb(0 0 0 / 14%) 0px 16px 24px 2px,
    rgb(0 0 0 / 12%) 0px 6px 30px 5px;
  max-height: ${({ maxHeight }) => maxHeight * 100}%;
  position: fixed;
  z-index: ${({ zIndex }) => zIndex + 1};
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-radius: 30px 30px 0 0;
  overflow: hidden;
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
  overflow-y: hidden;
  height: 100%;
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
 * import Sheet from "react-dynamic-bottom-sheet";
 * import { useState } from 'react';
 *
 * function Example() {
 *   const [isOpen, setOpen] = useState<boolean>(false);
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
 * @example2 shhet가 전부 닫히지 않고 가장자리가 보이도록 구성
 * // Edge Sheet Example
 * import React from "react";
 * import Sheet, { type SheetProps } from "./index";
 * function Example() {
 *     const sheetProps: SheetProps = {
 *         isVisible: true,
 *         isEdge: true,
 *         initialPosition: "edge",
 *         sheetLimit: [10, 50],
 *     };
 *
 *     return (
 *         <div className="App" style={{ background: "#ccc", height: "100vh" }}>
 *             <Sheet {...sheetProps}>
 *                 <YOUR_COMPONENT>
 *             </Sheet>
 *         </div>
 *     );
 * }
 * */
export default forwardRef(Sheet);
