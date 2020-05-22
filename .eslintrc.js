module.exports = {
  "parser": "babel-eslint",
  extends: [
    'taro',
  ],
  rules:{
    "no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    'import/prefer-default-export':'warn',
  }
}