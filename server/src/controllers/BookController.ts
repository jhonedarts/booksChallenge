import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { BookRepository } from "../repositories/BookRepository"
import * as yup from 'yup'
import { AppError } from "../errors/AppError"

class BookController {
    async create(request: Request, response: Response) {
        const { title, author_name, publication_year, isbn, num_pages } = request.body

        const schema = yup.object().shape({
            title: yup.string().required(),
            author_name: yup.string().required(),
            publication_year: yup.number().integer().required(),
            isbn: yup.string().required(),
            num_pages: yup.number().integer().required(),
        })

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }

        const bookRepository = getCustomRepository(BookRepository)

        const bookAlreadyExists = await bookRepository.findOne({
            isbn
        })

        if (bookAlreadyExists) {
            throw new AppError("Book already exists!")
        }

        const book = bookRepository.create({
            title, author_name, publication_year, isbn, num_pages
        })

        await bookRepository.save(book)

        return response.status(201).json(book)
    }

    async delete(request: Request, response: Response) {
        const { isbn } = request.params

        const schema = yup.object().shape({
            isbn: yup.string().required(),
        })

        try {
            await schema.validate(request.params, { abortEarly: false })
        } catch (error) {
            throw new AppError(error)
        }

        const bookRepository = getCustomRepository(BookRepository)

        const bookNotExists = !await bookRepository.findOne({
            isbn
        })

        if (bookNotExists) {
            throw new AppError("Book not exists!")
        }

        const book = bookRepository.delete({
            isbn
        })

        return response.status(200).json(book)
    }

    async show(request: Request, response: Response) {
        const bookRepository = getCustomRepository(BookRepository)

        const all = await bookRepository.find({ order: { num_pages: "ASC" } })

        return response.json(all)
    }

}

export { BookController }
