import { ReactNode } from "react";

export type Position = "default" | "max";

interface SheetType {
  /**
   *   sheet 사용 여부 입니다.
   *   @default false
   * */
  isVisible: boolean;
  /**
   *   sheet close func
   * */
  onClose: () => void;
  /**
   *   sheet defaultHeight
   * */
  defaultHeight?: number;
  /**
   *   sheet maxHeight
   * */
  maxHeight?: number;
}
export interface SheetRefProps extends SheetType {
  /**
   *   sheet를 여는 func
   * */
  onOpen: () => void;
  /**
   *   sheet를 닫는 func
   * */
  onClose: () => void;
  /**
   *   sheet 포지션을 선택해서 여는 func
   * */
  positionTo: (position: Position) => void;
}

export interface SheetProps extends SheetType {
  children: ReactNode | string;
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
}
