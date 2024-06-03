---
outline: [2, 3]
tags: 
  - 开发工具 
  - 应用 
  - 配置
publishDate: 2022/03/19
---

# ESLint

## 安装

```bash
npm install eslint --save-dev
```

## 初始化配置

如果已经存在 package.json，没有则需要先执行 `npm init`

```bash
npm init @eslint/config
```

会生成 .eslintrc.json 文件：

```json
{
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  }
}
```

其中第一个值是错误等级：

-error | 2 ：报错
-warn | 1 ：警告
-off | 0 ：忽略

第二个选项可以在 https://eslint.org/docs/latest/rules 中查看定义。

## VSCode 插件

格式检测需要运行命令:

```bash
npm run eslint
```

VSCode 的插件 ESLint 可以实现实时检测。

虽然 VSCode 可以设置格式，但仍然建议项目自带配置文件，这样就会优先使用项目中定义的规则。

## 自定义指令

```json
#在 package.json 文件中添加 checklint 和 reviselint 命令
"scripts": {
 "checklint": "eslint --ext .js,.vue --ignore-path .gitignore .", //查看所有不规范的文件
 "reviselint": "eslint --fix --ext .js,.vue --ignore-path .gitignore ." //修改所有不规范的文件
},
```

## 自动检查

可以搭配 husky 实现每次 commit 之前自动检查

```json
# 使用husky来设置git hooks

yarn add husky --dev

# 在npm scripts中增加precommit prepush（必须这么拼写）

{
  "scripts": {
    "precommit": "npm run test-eslint",
    "prepush": "npm run test-eslint",
    "test-eslint": "eslint src/**/*.js src/**/*.jsx"
    ...
  }
}

```

## 拓展插件

- `eslint-plugin-prettier` 该插件辅助 Eslint 可以平滑地与 Prettier 一起协作，并将 Prettier 的解析作为 Eslint 的一部分，在最后的输出可以给出修改意见。这样当 Prettier 格式化代码的时候，依然能够遵循我们的 Eslint 规则。如果你禁用掉了所有和代码格式化相关的 Eslint 规则的话，该插件可以更好得工作。所以你可以使用 eslint-config-prettier 禁用掉所有的格式化相关的规则(如果其他有效的 Eslint 规则与 prettier 在代码如何格式化的问题上不一致的时候，报错是在所难免的了)
- `eslint-config-prettier` 将会禁用掉所有那些非必须或者和 prettier 冲突的规则。这让您可以使用您最喜欢的 shareable 配置，而不让它的风格选择在使用 Prettier 时碍事。请注意该配置只是将规则 off 掉,所以它只有在和别的配置一起使用的时候才有意义。
- `eslint-config-airbnb` 该包提供了所有的 Airbnb 的 ESLint 配置，作为一种扩展的共享配置，你是可以修改覆盖掉某些不需要的配置的，该工具包包含了 react 的相关 Eslint 规则(eslint-plugin-react 与 eslint-plugin-jsx-a11y)，所以安装此依赖包的时候还需要安装刚才提及的两个插件
- `eslint-plugin-import` 该插件想要支持对 ES2015+ (ES6+) import/export 语法的校验, 并防止一些文件路径拼错或者是导入名称错误的情况
- `@typescript-eslint/eslint-plugin`Typescript 辅助 Eslint 的插件
- `@typescript-eslint/parser` Typescript 语法的解析器，类似于 babel-eslint 解析器一样。对应 parserOptions 的配置参考官方的 README。
- `babel-eslint` 该依赖包允许你使用一些实验特性的时候，依然能够用上 Eslint 语法检查。反过来说，当你代码并没有用到 Eslint 不支持的实验特性的时候是不需要安装此依赖包的。
- `eslint-plugin-react` React 辅助插件
- `eslint-plugin-jsx-a11y`该依赖包专注于检查 JSX 元素的可访问性。
- `eslint-plugin-react-hooks` React hooks 增强
- `eslint-plugin-testing-library`在使用 TL 编写测试时遵循最佳实践并预测常见错误
- `eslint-plugin-jest-dom` 在使用 jest-dom 编写测试时遵循最佳实践并预测常见错误

## 配置

```json
{
  "extends": [
    "airbnb",
    "prettier",
    "plugin:import/typescript",
    "plugin:jsx-a11y/strict",
    "plugin:prettier/recommended"
  ],
  "env": {
    "jest": true,
    "browser": true
  },
  "parser": "babel-eslint",
  "plugins": ["react", "react-hooks", "jsx-a11y", "import", "testing-library"], // test库出现问题
  "globals": {
    "fetch": true,
    "window": true,
    "document": true
  },
  "rules": {
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "react/jsx-filename-extension": "off",
    "no-proto": "off",
    "no-unused-vars": ["error", { "varsIgnorePattern": "^_" }],
    "no-underscore-dangle": ["error", { "allow": ["__typename"] }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "react/state-in-constructor": "off",
    "react/static-property-placement": ["error", "static public field"],
    "react/sort-comp": [
      "error",
      {
        "order": [
          "static-methods",
          "static-variables",
          "lifecycle",
          "everything-else",
          "render"
        ]
      }
    ],
    "import/no-default-export": "warn",
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "import/extensions": [
      "error",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  },
  "overrides": [
    // 这些配置都已经有问题了
    {
      "parser": "@typescript-eslint/parser",
      "plugins": ["@typescript-eslint"],
      "files": ["**/*.ts", "**/*.tsx"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      "rules": {
        "react/prop-types": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "react/require-default-props": "off"
      }
    },
    {
      "files": [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
      ],
      "extends": ["plugin:testing-library/react"],
      "rules": {
        "testing-library/prefer-screen-queries": "warn",
        "testing-library/no-node-access": "warn",
        "testing-library/render-result-naming-convention": "warn",
        "testing-library/no-container": "warn"
      }
    },
    {
      "files": ["*.spec.js"],
      "rules": {
        "react/prop-types": "off"
      }
    }
  ]
}
```

```bash
npm install --save-dev eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-webpack-plugin prettier
```
