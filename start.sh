#! /bin/bash

docker network create -d overlay pnet
sleep 5
docker stack deploy -c docker-compose.yml bgt
sleep 5
docker stack deploy -c docker-compose.nginx.yml nginx
sleep 10
docker exec $(docker ps --filter label=com.docker.swarm.service.name=bgt_db -q) sh -c "cd backups; mongorestore"
