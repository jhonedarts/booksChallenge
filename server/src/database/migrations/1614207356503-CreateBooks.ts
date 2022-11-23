import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1614207356503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "books",
                columns: [
                    {
                        name: "id",
                        type: "INTEGER PRIMARY KEY",
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "author_name",
                        type: "varchar"
                    },
                    {
                        name: "publication_year",
                        type: "int"
                    },
                    {
                        name: "isbn",
                        type: "varchar"
                    },
                    {
                        name: "num_pages",
                        type: "int"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("books")
    }

}
