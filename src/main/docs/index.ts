import { loginPath } from '@/main/docs/paths'
import { accountSchema, loginParamsSchema, errorSchema } from '@/main/docs/schemas'
import { serverError, unauthorized, badRequest, notFound } from '@/main/docs/components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'API do curso do Mongo para realizar enquetes entre programadores',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
