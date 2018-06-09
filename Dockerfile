FROM meemaw/face_recognition:1.0.0

# Install python dependencies
RUN mkdir /config
COPY /config/requirements.txt /config/
RUN pip install -r /config/requirements.txt

# Copy deploy scripts
RUN mkdir /scripts
COPY /scripts/run_web.sh /scripts
COPY /scripts/run_celery.sh /scripts


RUN mkdir /src;
COPY ./src /src
WORKDIR /src