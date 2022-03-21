# Swagger references

https://github.com/nestjs/nest/tree/master/sample/11-swagger

# How to start development server

- Make sure you have full .env file

- Start db containers:

`docker-compose -f ./docker/docker-compose.yml -p sipher-loyalty up -d`

- Run seeding commands in `packages.json` if necessary

- Run `yarn dev`

# ormconfig.json exampel to run seed

`{ "type": "postgres", "host": "localhost", "port": 5432, "username": "postgres", "password": "12345678", "database": "loyalty_sipher", "entities": ["src/**/*.entity{.ts,.js}"], "migrationsTableName": "migration", "seeds": ["src/seed/**/*{.ts,.js}"], "factories": ["src/factory/**/*{.ts,.js}"], "migrations": ["src/migration/*.{ts,js}"], "cli": { "migrationsDir": "src/migration/*.{ts,js}" }, "synchronize": true, "autoLoadEntities": true, "ssl": false }`
