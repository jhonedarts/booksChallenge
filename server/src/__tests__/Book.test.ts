import request from 'supertest'
import { createConnection, getConnection } from 'typeorm'
import { app } from '../app'

describe("Books", () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it("Should be able to add a new book", async () => {
    const response = await request(app).post("/books").send({
      title: "My Book 1",
      author_name: "Author One",
      publication_year: 2018,
      isbn: "abcdefg1234567",
      num_pages: 562
    })

    expect(response.status).toBe(201)
  })

  it("Should be able to add the second book", async () => {
    const response = await request(app).post("/books").send({
      title: "Wind and Clouds",
      author_name: "Author Two",
      publication_year: 1995,
      isbn: "aaa333fff555yy",
      num_pages: 460
    })

    expect(response.status).toBe(201)
  })

  it("Should not be able to create a book with exists isbn", async () => {
    const response = await request(app).post("/books").send({
      title: "My Book 2",
      author_name: "Author Two",
      publication_year: 2019,
      isbn: "abcdefg1234567",
      num_pages: 327
    })

    expect(response.status).toBe(400)
  })
})