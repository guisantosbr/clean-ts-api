import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { auth } from '@/main/middlewares/auth'
import { makeSaveSurveyResultController } from '@/main/factories/controllers/survey/survey-result/save-survey-result/save-survey-result--controller-factory'
import { makeLoadSurveyResultController } from '@/main/factories/controllers/survey/survey-result/load-survey-result/load-survey-result--controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
