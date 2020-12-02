import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'
import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '@/data/test'
import { DbLoadSurveyResult } from './db-load-survey-result'
import { mockSurveyResultModel } from '@/domain/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositorySub: LoadSurveyResultRepository
  loadSurveyByIdRepositorySub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositorySub = mockLoadSurveyResultRepository()
  const loadSurveyByIdRepositorySub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositorySub, loadSurveyByIdRepositorySub)
  return { sut, loadSurveyResultRepositorySub, loadSurveyByIdRepositorySub }
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

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySub, loadSurveyByIdRepositorySub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositorySub, 'loadById')
    jest.spyOn(loadSurveyResultRepositorySub, 'loadBySurveyId').mockResolvedValueOnce(null)
    await sut.load('any_survey_id')
    expect(loadByIdSpy).toBeCalledWith('any_survey_id')
  })

  test('Should return SurveyResultModel with all answers count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositorySub } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySub, 'loadBySurveyId').mockResolvedValueOnce(null)
    const surveyResult = await sut.load('any_survey_id')
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
