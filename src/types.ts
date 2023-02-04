import type { ReactNode } from "react";

export type Position = "default" | "max" | "edge";
export type SheetLimit = [number, number];

interface SheetType {
  /**
   *   sheet z-index
   *   @default 100
   * */
  zIndex?: number;
  /**
   *   sheet 사용 여부 입니다.
   *   @default false
   * */
  isVisible: boolean;
  /**
   *   sheet close func
   * */
  onClose?: () => void;
  /**
   *   sheet defaultHeight
   * */
  defaultHeight?: number;
  /**
   *   sheet maxHeight
   * */
  maxHeight?: number;
  /**
   *   sheet edgeHeight
   * */
  edgeHeight?: number | undefined;
}
export interface SheetRefProps extends SheetType {
  isDragging?: boolean;
}

export interface SheetProps extends SheetType {
  children?: ReactNode | string;
  /**
   * sheet 에 touch(pointer)가 시작 되었을떄의 callback function
   * */
  onStart?: () => void;
  /**
   * sheet 가 움직일 떄의 callback function
   * */
  onMove?: () => void;
  /**
   * sheet 에 touch(pointer)가 끝났을 때의 callback function
   * */
  onEnd?: () => void;
  /**
   * 시트가 열릴 때의 포지션 정의
   * */
  initialPosition?: Position;
  /** Sheet Limit
   *  0 번의 index는 닫히는 위치 입니다. isEdge 가 true 일 경우 Edge 컴포넌트 위치 입니다.
   *  1 번의 index는 defaultHeight 와 maxHeight 중간값을 정하는 값 입니다.
   *  @default [15, 50]
   * */
  sheetLimit?: SheetLimit;
  /** Sheet Edge Components 여부
   *
   * */
  isEdge?: boolean;
  classname?: string;
}
