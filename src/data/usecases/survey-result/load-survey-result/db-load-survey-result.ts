import { SurveyResultModel, LoadSurveyResultRepository, LoadSurveyResult } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (private readonly loadSurveyResultRepository: LoadSurveyResultRepository) {
  }

  async load (surveyId: string): Promise<SurveyResultModel> {
    return this.loadSurveyResultRepository.loadBySurveyId(surveyId)
  }
}