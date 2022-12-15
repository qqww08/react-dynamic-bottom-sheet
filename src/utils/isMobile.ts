import { isSSR } from "./isSSR";

export const isMobile = (): boolean =>
  isSSR ? /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent) : false;
