FROM meemaw/face_recognition:1.0.0

# Install python dependencies
RUN mkdir /config
COPY /config/requirements.txt /config/
RUN pip install -r /config/requirements.txt

# Copy source file
RUN mkdir /src;
COPY ./src /src

# Copy deploy scripts
RUN MKDIR /src/scripts
COPY /scripts/run_web.sh /src/scripts
COPY /scripts/run_celery.sh /src/scripts
COPY /scripts/run_celery_docker.sh /src/scripts

WORKDIR /src