#!/bin/bash

rsync -r -a -v -e ssh . root@172.17.0.2:pp/executor &&

ssh root@172.17.0.2 << EOF
    docker build pp/executor/ -t kubeduler/executor
EOF

cd ../deployment
kubectl delete -f executor-deployment.yaml
kubectl apply -f executor-deployment.yaml