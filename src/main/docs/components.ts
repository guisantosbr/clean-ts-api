import { apiKeyAuthSchema } from './schemas/'
import { serverError, unauthorized, badRequest, notFound, forbidden } from './components/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  serverError,
  unauthorized,
  notFound,
  forbidden
}
