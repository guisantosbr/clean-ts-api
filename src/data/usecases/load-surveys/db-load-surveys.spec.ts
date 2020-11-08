import MockDate from 'mockdate'
import { LoadSurveyRepository } from '../../protocols/db/survey/load-survey-repository'
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
  loadSurveyRepositorySub: LoadSurveyRepository
}

const makeLoadSurveyRepository = (): LoadSurveyRepository => {
  class AddSurveyRepositorySub implements LoadSurveyRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve(makeFakeSurveys())
    }
  }
  return new AddSurveyRepositorySub()
}

const makeSut = (): SutTypes => {
  const loadSurveyRepositorySub = makeLoadSurveyRepository()
  const sut = new DbLoadSurveys(loadSurveyRepositorySub)
  return { sut, loadSurveyRepositorySub }
}

describe('DbLoadSurveys Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveyRepositorySub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyRepositorySub, 'loadAll')
    await sut.load()
    expect(loadSpy).toHaveBeenCalled()
  })

  // test('Should throw if AddSurveyRepository throws', async () => {
  //   const { sut, addSurveyRepositorySub } = makeSut()
  //   jest.spyOn(addSurveyRepositorySub, 'add').mockRejectedValueOnce(new Error())
  //   const promise = sut.add(makeFakeSurveyData())
  //   await expect(promise).rejects.toThrow()
  // })
})
