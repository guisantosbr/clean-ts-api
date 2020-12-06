import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SaveSurveyResultParams } from '@/domain/usercases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'

export const mockSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositorySub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<void> {
    }
  }
  return new SaveSurveyResultRepositorySub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositorySub implements LoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return mockSurveyResultModel()
    }
  }
  return new LoadSurveyResultRepositorySub()
}
