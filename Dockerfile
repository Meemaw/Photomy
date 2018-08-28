FROM meemaw/face_recognition:1.0.0

# Install python dependencies
RUN mkdir /config
COPY /config/requirements.txt /config/
RUN pip install -r /config/requirements.txt

# Copy source file
RUN mkdir /src
RUN mkdir /srcripts
COPY ./src /src
COPY ./scripts /scripts

RUN chmod +x /scripts/run_web.sh
RUN chmod +x /scripts/run_celery.sh

WORKDIR /src