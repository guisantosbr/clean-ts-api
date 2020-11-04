import { DbAddSurvey } from './db-add-survey'
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

interface SutTypes {
  sut: DbAddSurvey
  addSurveyRepositorySub: AddSurveyRepository
}

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositorySub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
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
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositorySub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositorySub, 'add')
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
