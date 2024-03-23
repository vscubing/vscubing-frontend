/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cva'],
}

export default config
