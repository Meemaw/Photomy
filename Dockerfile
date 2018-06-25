FROM meemaw/face_recognition:1.0.0

# Install python dependencies
RUN mkdir /config
COPY /config/requirements.txt /config/
RUN pip install -r /config/requirements.txt

# Copy source files
RUN mkdir /src;
COPY ./src /src

# Copy run scripts
COPY /scripts/run_web.sh /src
COPY /scripts/run_celery.sh /src

# Base dir
WORKDIR /src