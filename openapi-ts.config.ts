import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'http://127.0.0.1:8000/api/schema',
  output: 'src/api',
  client: 'axios',
})
