# Swagger references

https://github.com/nestjs/nest/tree/master/sample/11-swagger

# How to start development server

- Make sure you have full .env file

- Start db containers:

`docker-compose -f ./docker/docker-compose.yml -p sipher-loyalty up -d`

- Run seeding commands in `packages.json` if necessary

- Run `yarn dev`
