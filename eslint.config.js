import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";
import ts from "typescript-eslint";

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: ["**/node_modules/**/*", "**/dist/**/*"],
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],

  // 对 erasableSyntaxOnly 的处理，须允许使用 const enum 语法
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSEnumDeclaration:not([const=true])",
          message: "禁止使用 enum 语法，会导致不规范的取值逻辑，请使用 const enum 替代",
        },
      ],
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/parameter-properties": "error",
    },
  },

  {
    plugins: { import: importPlugin },
    rules: {
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-extraneous-dependencies": ["error", { devDependencies: false }],
      // see https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      // see https://typescript-eslint.io/blog/consistent-type-imports-and-exports-why-and-how
      "import/no-duplicates": "error",
      "import/no-default-export": "error",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.config.ts", "**/*.config.js", "**/scripts/**"],
    rules: {
      "import/no-extraneous-dependencies": "off",
    },
  },
  {
    files: [
      "apps/*/src/pages/*/index.tsx",
      "apps/*/src/layouts/*/index.tsx",
      "**/*.config.ts",
      "**/*.config.js",
      "**/*.stories.tsx",
      "apps/docs/.storybook/*",
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },

  {
    plugins: { perfectionist: perfectionistPlugin },
    rules: {
      "perfectionist/sort-imports": [
        "error",
        {
          internalPattern: ["^@/.*"],
          sortSideEffects: true,
          groups: [
            ["side-effect-style", "style"],
            ["side-effect"],
            ["builtin", "builtin-type"],
            ["external", "external-type"],
            ["internal", "internal-type"],
            ["parent", "parent-type", "sibling", "sibling-type"],
            ["unknown"],
          ],
        },
      ],
      "perfectionist/sort-exports": "error",
      "perfectionist/sort-named-imports": "error",
      "perfectionist/sort-named-exports": "error",
    },
    settings: {
      locales: "en-US",
    },
  },

  {
    rules: {
      // 使用驼峰命名
      camelcase: "error",
      // 使用三等号
      eqeqeq: "error",
      // 禁止无效的 rename
      "no-useless-rename": "error",
      // Always use import type. See more https://typescript-eslint.io/rules/consistent-type-imports/
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
      // Always use Array<T> or ReadonlyArray<T> for all array types. 参考 https://typescript-eslint.io/rules/array-type/
      "@typescript-eslint/array-type": ["error", { default: "generic" }],
      // 允许 _ 开头的未使用变量
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // react 组件自闭合
      "react/self-closing-comp": "error",
      // react jsx props 排序
      "react/jsx-sort-props": ["error", { reservedFirst: true, callbacksLast: true }],
      // 禁止从 antd 引入 Form 和 Table 组件
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "antd",
              importNames: ["Form", "Table"],
              message: "Please do not use 'Form' or 'Table' from 'antd'.",
            },
          ],
          patterns: [
            {
              group: ["**/*/main"],
              message: "Please do not import anything from 'main'.",
            },
            {
              group: ["@pioneer/**/src/**"],
              message: "Please do not import anything from 'src'.",
            },
          ],
        },
      ],
    },
  },
];
