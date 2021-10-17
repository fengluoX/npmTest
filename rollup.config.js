import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "build/cjs/index.js",
      format: "cjs",
    },
    {
      file: "build/es/index.js",
      format: "esm",
    },
  ],
  plugins:[
      typescript()
  ]
};
