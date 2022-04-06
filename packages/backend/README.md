# Swagger references

https://github.com/nestjs/nest/tree/master/sample/11-swagger

# How to start development server

- Make sure you have full .env file

- Start db containers:

`docker-compose -f ./docker/docker-compose.yml -p sipher-loyalty up -d`

- Run `yarn dev`

# migrate & seed db

- Run `yarn migrate:config` to create `ormconfig.json`

- Run `yarn migrate:generate` to generate code migrate db

- Run `yarn migrate:up` to run migrate code

- Run `yarn seed-data` to seed data default for project
