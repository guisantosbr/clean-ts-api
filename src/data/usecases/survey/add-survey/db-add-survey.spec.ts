import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository } from './db-add-survey-protocols'
import MockDate from 'mockdate'
import { mockAddSurveyRepository } from '@/data/test/mock-db-survey'
import { mockAddSurveyParams } from '@/domain/test'

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositorySub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositorySub)
  return { sut, addSurveyRepositorySub }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositorySub, 'add')
    const surveyData = mockAddSurveyParams()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySub } = makeSut()
    jest.spyOn(addSurveyRepositorySub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
