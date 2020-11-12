
import { Controller } from '@/presentation/protocols'
import { makeLoginValidation } from './login-validation-factory'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { makeDbAuthentication } from '@/main/factories/usercases/account/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
