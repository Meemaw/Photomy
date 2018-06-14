#!/bin/sh
# wait for redis server to start
sleep 5

# run Celery worker for our project myproject with Celery configuration stored in Celeryconf
DJANGO_SETTINGS_MODULE="photomy.settings.docker" celery -A photomy worker --loglevel=INFO --concurrency=1 -n worker1@%h