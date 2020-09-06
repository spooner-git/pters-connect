FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install -y python3.6
RUN apt-get install -y python3-pip
RUN apt-get install -y net-tools
RUN apt-get install -y dnsutils
RUN apt-get install -y python3.6-dev libmysqlclient-dev
RUN pip3 install -U setuptools
RUN pip3 install gunicorn==20.0.2
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip3 install -r requirements.txt
ADD . /code/

