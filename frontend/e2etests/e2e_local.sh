#!/bin/sh

cd ../../src

echo "Creating database e2e."
psql -c "DROP DATABASE IF EXISTS e2e;" -U postgres
psql -c "CREATE DATABASE e2e;" -U postgres



echo "Running migrations..."
python3 manage.py migrate --noinput --settings=photomy.settings.test.e2e 
python3 manage.py populate_test_users --settings=photomy.settings.test.e2e 

echo "Populating test database..."
python3 manage.py populate_test_images --settings=photomy.settings.test.e2e
python3 manage.py populate_test_users --settings=photomy.settings.test.e2e

echo "Starting django server..."
python3 manage.py runserver --settings=photomy.settings.test.e2e &

cd ../frontend
echo "Starting react app..."
BROWSER=none yarn start  2>&1 > /dev/null &
cd ./e2etests
sleep 10
yarn test

echo "Killing background proceses..."
trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
sleep 3

echo "Dropping database e2e"
psql -c "DROP DATABASE e2e;" -U postgres