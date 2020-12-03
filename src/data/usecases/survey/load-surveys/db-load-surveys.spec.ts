import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { mockLoadSurveysRepository } from '@/data/test'
import { mockSurveysModels } from '@/domain/test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositorySub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepositorySub)
  return { sut, loadSurveysRepositorySub }
}

describe('DbLoadSurveys Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositorySub } = makeSut()
    const accountId = 'any_account_id'
    const loadAllSpy = jest.spyOn(loadSurveysRepositorySub, 'loadAll')
    await sut.load(accountId)
    expect(loadAllSpy).toHaveBeenCalledWith(accountId)
  })

  test('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load('any_account_id')
    expect(surveys).toEqual(mockSurveysModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositorySub } = makeSut()
    jest.spyOn(loadSurveysRepositorySub, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load('any_account_id')
    await expect(promise).rejects.toThrow()
  })
})
