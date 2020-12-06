import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { SaveSurveyResultRepository, LoadSurveyResultRepository } from './db-save-survey-result-protocols'
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '@/data/test'
import { mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositorySub: SaveSurveyResultRepository
  loadSurveyResultRepositorySub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositorySub = mockSaveSurveyResultRepository()
  const loadSurveyResultRepositorySub = mockLoadSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositorySub, loadSurveyResultRepositorySub)
  return { sut, saveSurveyResultRepositorySub, loadSurveyResultRepositorySub }
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
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)
    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositorySub } = makeSut()
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositorySub, 'loadBySurveyId')
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyResultData.surveyId, surveyResultData.accountId)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositorySub } = makeSut()
    jest.spyOn(saveSurveyResultRepositorySub, 'save').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositorySub } = makeSut()
    jest.spyOn(loadSurveyResultRepositorySub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return SurveyResult on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockSaveSurveyResultParams())
    expect(surveyResult).toEqual(mockSurveyResultModel())
  })
})
