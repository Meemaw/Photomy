#!/bin/sh
# wait for redis server to start
sleep 5

# run Celery worker for our project myproject with Celery configuration stored in Celeryconf
DJANGO_SETTINGS_MODULE="photomy.settings.prod" celery worker -A photomy.celeryconf -Q default -n default@%h