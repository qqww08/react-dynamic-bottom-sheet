import { useLayoutEffect, useEffect } from "react";
import { isSSR } from "../../utils";
export const useIsomorphicLayoutEffect = isSSR ? useLayoutEffect : useEffect;
