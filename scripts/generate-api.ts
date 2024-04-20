import SwaggerParser from '@apidevtools/swagger-parser'
import type { OpenAPIObject } from 'openapi3-ts'
import { resolveConfig } from 'prettier'
import { generateZodClientFromOpenAPI } from 'openapi-zod-client'
import path from 'path'
import fs from 'node:fs/promises'

async function main() {
  const apiDocRaw = await fetch('http://127.0.0.1:8000/api/schema/').then((res) => res.text())
  const apiPath = path.resolve('openapi.yaml')

  await fs.writeFile(apiPath, apiDocRaw)

  const apiDoc = (await SwaggerParser.parse(apiPath)) as OpenAPIObject
  const distPath = path.resolve('src', 'api', 'schema.ts')

  await generateZodClientFromOpenAPI({
    openApiDoc: apiDoc,
    distPath: distPath,
    prettierConfig: await getPrettierConfig(),
  })

  await fs.unlink(apiPath)

  console.log(`Successfully generated ${distPath}`)
}

async function getPrettierConfig() {
  const prettierConfig = (await resolveConfig('.prettierrc.js'))!
  prettierConfig.plugins = prettierConfig.plugins?.filter((plugin) => plugin !== 'prettier-plugin-tailwindcss')
  return prettierConfig
}

void main()
