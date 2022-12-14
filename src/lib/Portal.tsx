import * as React from "react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

const Portal = ({ children }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let element: HTMLDivElement | null = null;
    if (!ref.current) {
      element = document.createElement("div") as HTMLDivElement;
      element.setAttribute("id", "drawer-portal");
      document.body.appendChild(element);
      (ref.current as any) = element;
      setMounted(true);
      return () => {
        setMounted(false);
        ref.current = null;
        document.body.removeChild(element as HTMLDivElement);
      };
    }
  }, []);

  // SSR 지원
  return mounted ? createPortal(children, ref.current as any) : null;
};

export default Portal;
