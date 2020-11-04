import { DbAddSurvey } from './db-add-survey'
import { AddSurveyModel, AddSurveyRepository } from './db-add-survey-protocols'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositorySub implements AddSurveyRepository {
      async add (surveyData: AddSurveyModel): Promise<void> {
      }
    }
    const addSurveyRepositorySub = new AddSurveyRepositorySub()
    const addSpy = jest.spyOn(addSurveyRepositorySub, 'add')
    const sut = new DbAddSurvey(addSurveyRepositorySub)
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(addSpy).toHaveBeenCalledWith(surveyData)
  })
})
