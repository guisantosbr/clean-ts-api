import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'
import { SurveyModel } from '@/domain/models/survey'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const password = await hash('123', 12)
  const res = await accountCollection.insertOne({
    name: 'Guilherme',
    email: 'guilherme.almeida@gmail.com',
    role: 'admin',
    password
  })

  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)

  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const res = await surveyCollection.insertOne({
    question: 'Question',
    answers: [{
      anwswer: 'Answer 1',
      image: 'http://image-name.com'
    }, {
      anwswer: 'Answer 2'
    }],
    date: new Date()
  })
  return MongoHelper.map(res.ops[0])
}

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          anwswer: 'Answer 1'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const survey = await makeSurvey()
      const id = survey.id

      const accessToken = await makeAccessToken()

      await request(app)
        .put(`/api/surveys/${id}/results`)
        .set('x-access-token', accessToken)
        .send({
          anwswer: 'Answer 1'
        })
        .expect(200)
    })
  })
  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result with accessToken', async () => {
      const survey = await makeSurvey()
      const id = survey.id

      const accessToken = await makeAccessToken()

      await request(app)
        .get(`/api/surveys/${id}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
