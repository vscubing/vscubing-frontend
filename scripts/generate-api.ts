import SwaggerParser from '@apidevtools/swagger-parser'
import type { OpenAPIObject } from 'openapi3-ts'
import { resolveConfig } from 'prettier'
import { generateZodClientFromOpenAPI } from 'openapi-zod-client'
import path from 'path'

async function main() {
  const apiDoc = (await SwaggerParser.parse('http://127.0.0.1:8000/api/schema/')) as OpenAPIObject
  const distPath = path.resolve('src', 'api', 'schema.ts')

  await generateZodClientFromOpenAPI({
    openApiDoc: apiDoc,
    distPath: distPath,
    prettierConfig: await getPrettierConfig(),
  })

  console.log(`Successfully generated ${distPath}`)
}

async function getPrettierConfig() {
  const prettierConfig = (await resolveConfig('.prettierrc.js'))!
  prettierConfig.plugins = prettierConfig.plugins?.filter((plugin) => plugin !== 'prettier-plugin-tailwindcss')
  return prettierConfig
}

void main()
