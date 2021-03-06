# Swagger references

https://github.com/nestjs/nest/tree/master/sample/11-swagger

# How to start development server

- Make sure you have full .env file

- Start db containers:

`docker-compose -f ./docker/docker-compose.yml -p sipher-loyalty up -d`

- Run `yarn dev`

- insert file `~/.aws/credentials` with content (contact member to get key test):
  [default]
  aws_access_key_id = [...]
  aws_secret_access_key = [...]
  

# migrate & seed db

- Run `yarn migrate:config` to create `ormconfig.json`

- Run `yarn migrate:generate` to generate code migrate db

- Run `yarn migrate:up` to run migrate code

- Run `yarn seed-data` to seed data default for project

### Run tracker backend

- Run `yarn dev:tracker:lootbox` to run tracker lootbox at local ( already run at dev web to track event and update pg cloud, should run at local when use pg local)
- Run `yarn dev:tracker:sculpture` to run tracker sculpture at local ( already run at dev web to track event and update pg cloud, should run at local when use pg local)
