### run db docker

docker-compose -f ./docker/docker-compose.yml -p sipher-loyalty-db up -d

### Build docker backend

docker build --file=docker/Dockerfile.backend -t loyalty-backend .
