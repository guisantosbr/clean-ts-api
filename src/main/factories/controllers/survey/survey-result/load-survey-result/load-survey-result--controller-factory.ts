
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { makeDbLoadSurveyById } from '@/main/factories/usercases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/usercases/survey/survey-result/load-survey-result/db-load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  const controller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(controller)
}
