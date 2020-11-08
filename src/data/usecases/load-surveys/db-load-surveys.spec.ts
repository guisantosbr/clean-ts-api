import MockDate from 'mockdate'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '../../../domain/models/survey'
import { DbLoadSurveys } from './db-load-surveys'

const makeFakeSurveys = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositorySub: LoadSurveysRepository
}

const makeLoadSurveyRepository = (): LoadSurveysRepository => {
  class AddSurveyRepositorySub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve(makeFakeSurveys())
    }
  }
  return new AddSurveyRepositorySub()
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositorySub = makeLoadSurveyRepository()
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
    const loadAllSpy = jest.spyOn(loadSurveysRepositorySub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  // test('Should throw if AddSurveyRepository throws', async () => {
  //   const { sut, addSurveyRepositorySub } = makeSut()
  //   jest.spyOn(addSurveyRepositorySub, 'add').mockRejectedValueOnce(new Error())
  //   const promise = sut.add(makeFakeSurveyData())
  //   await expect(promise).rejects.toThrow()
  // })
})
