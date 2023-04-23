import React, { useState, useRef, MutableRefObject } from "react";
import { Position, SheetLimit } from "../../types";

export interface UseBottomReturnValue<TRef> {
  ref?: MutableRefObject<TRef | null>;
  isDragging?: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  style: React.CSSProperties;
}

export interface UseBottomSheetProps {
  defaultHeight: number;
  maxHeight: number;
  sheetLimit: SheetLimit;
  initialPosition: Position;
  onClose?: () => void;
  isEdge?: boolean;
  onMove?: () => void;
  onEnd?: () => void;
  onStart?: () => void;
  classname?: string;
}

export const useBottomSheetProps = <TRef extends HTMLDivElement>({
  initialPosition,
  defaultHeight,
  maxHeight,
  sheetLimit,
  onClose,
  isEdge,
  onMove,
  onEnd,
  onStart,
  classname,
}: UseBottomSheetProps): UseBottomReturnValue<TRef> => {
  const ref = useRef<TRef | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isTouchScreen = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const heightCalc = () => {
    switch (initialPosition) {
      case "max":
        return `${maxHeight * 100}%`;
      case "edge":
        return `${sheetLimit[0]}%`;
      default:
        return `${defaultHeight * 100}%`;
    }
  };

  const transitionend = () => {
    if (!ref.current) return;
    if (onEnd) onEnd();
    ref.current.style.transition = " none";
  };

  const bottomSheetEnd = () => {
    if (!ref.current) return;
    const sheetHeight = ref.current?.clientHeight;
    const clientHeight = document.body.clientHeight;
    const heightPercent = Math.floor((sheetHeight / clientHeight) * 100);
    const sheetScroll = document.querySelector(`.${classname}-scroll`) as HTMLDivElement;

    if (heightPercent > sheetLimit[1]) {
      sheetScroll.style.overflowY = "scroll";
      ref.current.style.height = `${maxHeight * 100}%`;
    }

    if (heightPercent <= sheetLimit[1]) {
      sheetScroll.style.overflowY = "hidden";
      ref.current.style.height = `${defaultHeight * 100}%`;
    }

    if (!isEdge && heightPercent <= sheetLimit[0]) {
      if (onClose) onClose();
    }

    if (heightPercent < sheetLimit[0] && isEdge) {
      sheetScroll.style.overflowY = "hidden";
      ref.current.style.height = `${sheetLimit[0]}%`;
    }

    ref.current.style.transition = `200ms all`;
    ref.current.ondragstart = null;
    ref.current?.addEventListener("transitionend", transitionend, { once: true });
    setIsDragging(false);
  };

  const onTouchStart = (touchEvent: React.TouchEvent) => {
    if (!isTouchScreen || !ref.current) return null;

    const sheetScroll = document.querySelector(".sheet-scroll") as HTMLDivElement;
    if (sheetScroll.scrollTop > 0) return null;

    const { height } = ref.current.getBoundingClientRect();
    if (onStart) onStart();
    const touchMoveHandler = (moveEvent: TouchEvent) => {
      if (!ref.current) return;
      if (onMove) onMove();
      const deltaY = moveEvent.touches[0].pageY - touchEvent.touches[0].pageY;
      ref.current.style.height = `${height - deltaY}px`;
      setIsDragging(true);
    };

    const touchEndHandler = () => {
      bottomSheetEnd();

      document.removeEventListener("touchmove", touchMoveHandler);
    };

    document.addEventListener("touchmove", touchMoveHandler, { passive: false });
    document.addEventListener("touchend", touchEndHandler, { once: true });
  };
  const onMouseDown = (clickEvent: React.MouseEvent) => {
    if (isTouchScreen || !ref.current) return null;
    const { height } = ref.current.getBoundingClientRect();
    if (onStart) onStart();

    ref.current.ondragstart = () => {
      return false;
    };
    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      if (!ref.current) return;
      if (onMove) onMove();
      const deltaY = moveEvent.pageY - clickEvent.pageY;
      ref.current.style.height = `${height - deltaY}px`;
      setIsDragging(true);
    };

    const mouseUpHandler = () => {
      bottomSheetEnd();
      document.removeEventListener("mousemove", mouseMoveHandler);
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler, { once: true });
  };

  return {
    ref,
    onMouseDown,
    onTouchStart,
    isDragging,
    style: {
      height: heightCalc(),
    },
  };
};
