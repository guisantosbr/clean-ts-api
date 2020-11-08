import { LoadSurveys } from '../../../domain/usercases/load-surveys'
import { LoadSurveyRepository } from '../../protocols/db/survey/load-survey-repository'
import { SurveyModel } from '../../../domain/models/survey'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveyRepository: LoadSurveyRepository) {
  }

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveyRepository.loadAll()
    return []
  }
}
