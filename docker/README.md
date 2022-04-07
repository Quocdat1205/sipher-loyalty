### run db docker

docker-compose -f ./docker/docker-compose.yml -p sipher-loyalty-db up -d

### Build docker backend

docker build --file=docker/Dockerfile.backend -t loyalty-backend .

### Run docker backend

docker run -p 5500:5500 --env-file packages/backend/.env loyalty-backend
docker run -p 5501:5501 --env-file packages/backend/.env lootbox-tracker-loyalty
docker run -p 5502:5502 --env-file packages/backend/.env sculpture-tracker-loyalty

## How to start monitoring containers

- Run `docker-compose -f monitor-docker-compose.yml up -d`
- Add prometheus as datasource to grafana
- Import dashboard from `/grafana-dashboard`
