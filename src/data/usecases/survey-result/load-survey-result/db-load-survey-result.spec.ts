import MockDate from 'mockdate'
import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { mockLoadSurveyResultRepository } from '@/data/test'
import { DbLoadSurveyResult } from '@/data/usecases/survey-result/load-survey-result/db-load-survey-result'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySub)
  return { sut, loadSurveyResultRepositorySub }
}

describe('DbLoadSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositorySub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  // test('Should throw if SaveSurveyResultRepository throws', async () => {
  //   const { sut, loadSurveyResultRepositorySub } = makeSut()
  //   jest.spyOn(loadSurveyResultRepositorySub, 'load').mockRejectedValueOnce(new Error())
  //   const promise = sut.load('any_survey_id')
  //   await expect(promise).rejects.toThrow()
  // })
  //
  // test('Should return SurveyResult on success', async () => {
  //   const { sut } = makeSut()
  //   const surveyResult = await sut.save(mockSaveSurveyResultParams())
  //   expect(surveyResult).toEqual(mockSurveyResultModel())
  // })
})
