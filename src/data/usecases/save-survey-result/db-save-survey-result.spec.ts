import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { SaveSurveyResultModel, SurveyResultModel, SaveSurveyResultRepository } from './db-save-survey-result-protocols'

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => Object.assign({}, makeFakeSurveyResultData(), {
  id: 'any_id'
})

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositorySub: SaveSurveyResultRepository
}

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositorySub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return makeFakeSurveyResult()
    }
  }
  return new SaveSurveyResultRepositorySub()
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositorySub = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositorySub)
  return { sut, saveSurveyResultRepositorySub }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositorySub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositorySub, 'save')
    const surveyResultData = makeFakeSurveyResultData()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  // test('Should throw if AddSurveyRepository throws', async () => {
  //   const { sut, addSurveyRepositorySub } = makeSut()
  //   jest.spyOn(addSurveyRepositorySub, 'add').mockRejectedValueOnce(new Error())
  //   const promise = sut.add(makeFakeSurveyData())
  //   await expect(promise).rejects.toThrow()
  // })
})
