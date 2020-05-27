module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base"],
  plugins: ["prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "prettier/prettier": "error",
    "no-plusplus": "off",
    quotes: "off",
    "array-callback-return": "off",
    "arrow-parens": "off",
    "implicit-arrow-linebreak": "off",
    "function-paren-newline": "off",
    "arrow-body-style": "off",
  },
};
