"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  classname: string;
}

const Portal = ({ children, classname }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    let element: HTMLDivElement | null = null;
    if (!ref.current) {
      element = document.createElement("div") as HTMLDivElement;
      element.setAttribute("id", `${classname}-portal`);
      document.body.appendChild(element);
      ref.current = element;
      setMounted(true);
      return () => {
        setMounted(false);
        ref.current = null;
        document.body.removeChild(element as HTMLDivElement);
      };
    }
  }, []);

  // SSR 지원
  return mounted ? createPortal(children, ref.current as HTMLDivElement) : null;
};

export default Portal;
