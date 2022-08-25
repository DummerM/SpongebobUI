/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx'
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "./config/unocss";


// https://vitejs.dev/config/
const rollupOptions = {

    external: ["vue", "vue-router"],
    output: {
        globals: {
            vue: "Vue",
        },
    },
};

export default defineConfig({
    plugins: [
        vue(),
        vueJsx({
            // options are passed on to @vue/babel-plugin-jsx
        }),
        // 添加UnoCSS插件
        Unocss({
            presets: [presetUno(), presetAttributify(), presetIcons()],
        })
    ],
    build: {
        rollupOptions,
        minify: false,
        cssCodeSplit: true,
        lib: {
            entry: "./src/entry.ts",
            name: "SpongebobUI",
            fileName: "spongebob-ui",
            // 导出模块格式
            // umd === amd + cjs + iife
            formats: ["esm" as any, "iife"],
        },
    },
    test: {
        // enable jest-like global test APIs
        globals: true,
        // simulate DOM with happy-dom
        // (requires installing happy-dom as a peer dependency)
        environment: 'happy-dom',
        // 支持tsx组件，很关键
        transformMode: {
          web: [/.[tj]sx$/]
        }
      }
});