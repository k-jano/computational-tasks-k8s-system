#!/bin/bash

rsync -r -a -v -e ssh . root@172.17.0.2:pp/jqm &&

ssh root@172.17.0.2 << EOF
    docker build pp/jqm/ -t kubeduler/jqm
EOF

cd ../deployment
kubectl delete -f jqm-deployment.yaml
kubectl apply -f jqm-deployment.yaml