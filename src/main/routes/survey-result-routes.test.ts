import request from 'supertest'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
// import { hash } from 'bcrypt'
// import { sign } from 'jsonwebtoken'
// import env from '@/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

// const makeAccessToken = async (): Promise<string> => {
//   const password = await hash('123', 12)
//   const res = await accountCollection.insertOne({
//     name: 'Guilherme',
//     email: 'guilherme.almeida@gmail.com',
//     password,
//     role: 'admin'
//   })
//
//   const id = res.ops[0]._id
//   const accessToken = sign({ id }, env.jwtSecret)
//
//   await accountCollection.updateOne({
//     _id: id
//   }, {
//     $set: {
//       accessToken
//     }
//   })
//   return accessToken
// }

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
  })
})
