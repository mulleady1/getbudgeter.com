#! /bin/bash

docker stack rm nginx bgt
sleep 5
docker network rm pnet
sleep 5
docker network rm pnet
sleep 5
docker network rm pnet
rm -rf data
mkdir data
