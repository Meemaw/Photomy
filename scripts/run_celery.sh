#!/bin/sh
# wait for redis server to start
sleep 5

# run Celery worker for our project myproject with Celery configuration stored in Celeryconf
celery worker -A photomy.celeryconf -Q default -n default@%h