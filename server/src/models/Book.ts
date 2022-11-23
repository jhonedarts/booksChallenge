import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("books")
class Book {
    @PrimaryGeneratedColumn("increment")
    readonly id: number

    @Column()
    title: string

    @Column()
    author_name: string

    @Column()
    publication_year: number

    @Column()
    isbn: string

    @Column()
    num_pages: number
}

export { Book }