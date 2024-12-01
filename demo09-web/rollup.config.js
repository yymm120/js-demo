import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";


export default defineConfig([
    {
        input: "web01-nav/index.js",
        output: {
            dir: "web01-nav/dist",
            entryFileNames: "[name].js",
            format: "esm",
        },
        plugins: [nodeResolve(), commonjs(), json(),],
        watch: {
            clearScreen: true,
        },
    },
    {
        input: "./index.js",
        output: {
            dir: "dist/",
            entryFileNames: "[name].js",
            format: "esm"
        },
        plugins: [nodeResolve(), commonjs(), json()],
    }
]);
