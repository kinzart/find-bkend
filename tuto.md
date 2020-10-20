npm init -y
npm i --save express
npm i @types express --save
mkdir src
touch src/server.ts

configurar express e porta no server

yarn add typescript -D

yarn tsc --init

tsconfig = mudar es5 p/ es2017

yarn add ts-node-dev -D

into package.json:

    "scripts": {
        "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts"


ROUTES HTTP

        // Route
        // Recource
        // Methods http: GET,POST,PUT,DELETE
        // Params


        // Query params: http://localhost:3333/users?search=diego
        // console.log(req.query)

        // Route params: http://localhost:3333/users/1 (id recource)
        // console.log(req.params)

        // Body: http://localhost:3333/users/1 (id recource)
        // console.log(req.body)


yarn add typeorm sqlite3

mkdir src/database

touch ormconfig.json

touch src/database/connection.ts

into: 

        import { createConnection } from 'typeorm';
        createConnection();


server.ts:


    import './database/connection';


// CRIANDO AS TABELAS com migrations


mkdir src/database/migrations


into package.json:

    "scripts": {
        "dev": "ts-node-dev --transpile-only --ignore-watch node_modules src/server.ts",
        "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"



  ormconfig.json:

    {
        "type": "sqlite",
        "database": "./src/database/database.sqlite",
        "migrations": [
            "./src/database/migrations/*.ts"
        ],
        "cli": {
            "migrationsDir": "./src/database/migrations"
        }
    }   



//Mk a table:

yarn typeorm migration:create -n create_orphanages


into migrations/number of table


    import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602608773896 implements MigrationInterface {

            public async up(queryRunner: QueryRunner): Promise<void> {
                // DO SOMETHING
                await queryRunner.createTable(new Table({
                    name: 'orphanages',
                    columns: [{
                        name: 'id',
                        type: 'integer',
                        unsigned: true,
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'latitude',
                        type: 'decimal',
                        scale: 10,
                        precision: 2,          
                    },
                    {
                        name: 'longitude',
                        type: 'decimal',
                        scale: 10,
                        precision: 2,          
                    },
                    {
                        name: 'about',
                        type: 'text',
                        
                    },
                    {
                        name: 'instructions',
                        type: 'text',
                        
                    },
                    {
                        name: 'open_on_weekends',
                        type: 'boolean',
                        default: false,
                        
                    },

                ],
            }))
            }

            public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.dropTable('orphanages');
                //REWIND SOMETHING
            }

        }



yarn typeorm migration:run     


Download and run BEEKEEPER

delete table in db:

yarn typeorm migration:revert

in migrations:

        import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602608773896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // DO SOMETHING
        await queryRunner.createTable(new Table({
            name: 'orphanages',
            columns: [{
                name: 'id',
                type: 'integer',
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            },
            {
                name: 'name',
                type: 'varchar'
            },
            {
                name: 'latitude',
                type: 'decimal',
                scale: 10,
                precision: 2,          
             },
               {
                name: 'longitude',
                type: 'decimal',
                scale: 10,
                precision: 2,          
             },
             {
                name: 'about',
                type: 'text',
                  
             },
             {
                name: 'instructions',
                type: 'text',
                  
             },
             {
                name: 'opening_hours',
                type: 'varchar'
            },
             {
                name: 'open_on_weekends',
                type: 'boolean',
                default: false,
                  
             },

        ],
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanages');
        //REWIND SOMETHING
    }

}


mkdir src/models

touch src/models/Orphanage.ts

        export default class Orphanage {
            id: number;
            
            name: string;

            latitude: number;

            longitude: number;

            about: string;

            instructions: string;

            opening_hours: boolean;
            
            opening_on_weekends: boolean;
        }


open (rm //) files of tsconfig:

        "strictPropertyInitialization": false,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true, 




 into src/models/Orphanages.ts:

        import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orphanages')
        export default class Orphanage {
            @PrimaryGeneratedColumn('increment')
            id: number;
        
            @Column()
            name: string;

            @Column()
            latitude: number;

            @Column()
            longitude: number;

            @Column()
            about: string;

            @Column()
            instructions: string;

            @Column()
            opening_hours: boolean;
            
            @Column()
            opening_on_weekends: boolean;
        }

server.ts:

    import express from 'express'
    import './database/connection';
    import { getRepository } from 'typeorm';
    import Orphanage from './models/Orphanage'

    const app = express();
    app.use(express.json())



    app.get('/orphanages', (req, res) => {
        return res.send({ message: "welcome! post/orphanages"})
    });

    app.post('/orphanages', async (req, res) => {
    const {

        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends

    } = req.body;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = orphanagesRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
    });

    await orphanagesRepository.save(orphanage);

   return res.status(201).json(orphanage);
    });



    app.listen(3333);

into ormconfig:


         "entities": [
        "./src/models/*.ts"
    ],






























yarn typeorm migration:create -n create_images



create table
yarn typeorm migration:run


yarn add multer

mkdir src/config

touch src/config/upload.ts




yarn add @types/multer -D

mkdir uploads


touch src/models/Image.ts


mkdir src/views

touch src/views/orphanages_view.ts

touch src/views/images_view.ts


yarn add express-async-errors

mkdir src/errors

touch src/errors/handler.ts


yarn add yup

yarn add @types/yup -D

yarn add cors

yarn add @types/cors -D

