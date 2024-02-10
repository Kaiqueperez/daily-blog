import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  env: {
    local: 'http://localhost:3000/',
    dev: 'https://dev-front-cadpetz.labpetz.com.br/',
    stg: 'https://stg-front-cadpetz.labpetz.com.br/',
  },
  e2e: {
    baseUrl: 'http://localhost:3000/',
  },
})
