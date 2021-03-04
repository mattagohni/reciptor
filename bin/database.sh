#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Start/Stop your postgres container"

case "$1" in
     start)
        docker-compose -f ${DIR}/postgres.yml up -d
        ;;
     stop)
        docker-compose -f ${DIR}/postgres.yml down
        ;;
     *)
        echo "usage: start/stop"
        ;;
esac
