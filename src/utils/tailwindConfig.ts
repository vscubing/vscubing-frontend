import resolveConfig from 'tailwindcss/resolveConfig'
import rawConfig from '@/../tailwind.config.js'

export const tailwindConfig = resolveConfig(rawConfig)
