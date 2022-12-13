import { ReactNode } from "react";

export type Position = "default" | "max";

interface DrawerType {
  isVisible: boolean;
  onClose: () => void;
  defaultHeight?: number;
  maxHeight?: number;
}
export interface DrawerRefProps extends DrawerType {
  onOpen: () => void;
  onClose: () => void;
  positionTo: (position: Position) => void;
}
export interface DrawerProps extends DrawerType {
  children: ReactNode | string;
  onStart?: () => void;
  onMove?: () => void;
  onEnd?: () => void;
  initialPosition?: Position;
}
