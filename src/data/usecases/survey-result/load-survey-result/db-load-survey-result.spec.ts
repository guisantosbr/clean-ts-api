import { LoadSurveyResultRepository } from './db-load-survey-result-protocols'
import { mockLoadSurveyResultRepository } from '@/data/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { mockSurveyResultModel } from '@/domain/test'

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
  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositorySub, 'loadBySurveyId')
    await sut.load('any_survey_id')
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySub } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.load('any_survey_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResultModel on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.load('any_survey_id')
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
