import { Router } from 'express'
import { BookController } from './controllers/BookController'

const router = Router()
const bookController = new BookController()

router.post("/books", bookController.create)
router.delete("/books/:isbn", bookController.delete)
router.get("/books", bookController.show)

export { router }