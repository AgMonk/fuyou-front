#!/bin/bash
# 项目名称
name='fuyou-front'
# 对外端口
port=18888
imgName=${name}-image:latest
docker container stop ${name}
docker container rm ${name}
docker image rm ${imgName}
docker build -t ${imgName} .
docker run -d -p ${port}:80 --name ${name} ${imgName}

rm -rf dist