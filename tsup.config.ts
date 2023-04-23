import { defineConfig } from "tsup";

defineConfig({
  entry: ["./src/index.ts"],
  format: ["cjs", "cjs"],
  dts: true,
  external: ["react", "react-transition-group", "styled-components"],
});
