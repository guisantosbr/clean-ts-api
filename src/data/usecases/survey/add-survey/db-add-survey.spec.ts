import { DbAddSurvey } from './db-add-survey'
import { AddSurveyParams, AddSurveyRepository } from './db-add-survey-protocols'
import MockDate from 'mockdate'

const makeFakeSurveyData = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositorySub: AddSurveyRepository
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositorySub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
    }
  }
  return new AddSurveyRepositorySub()
}

const makeSut = (): SutTypes => {
  const addSurveyRepositorySub = makeAddSurveyRepository()
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
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositorySub } = makeSut()
    jest.spyOn(addSurveyRepositorySub, 'add').mockRejectedValueOnce(new Error())
    const promise = sut.add(makeFakeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})
