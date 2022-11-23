import { EntityRepository, Repository } from "typeorm";
import { Book } from "../models/Book";

@EntityRepository(Book)
class BookRepository extends Repository<Book> {

}

export { BookRepository }