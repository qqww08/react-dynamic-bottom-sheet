import { isSSR } from "./isSSR";

export const isIOS = (): boolean => (isSSR ? /iPad|iPhone|iPod/.test(navigator.userAgent) : false);
