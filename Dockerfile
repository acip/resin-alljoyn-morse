FROM resin/rpi-raspbian:wheezy

ADD . /App/

RUN chmod +x App/bin/alljoynjs

RUN chmod +x App/bin/alljoyn-daemon

CMD ["/bin/bash", "-ex", "App/run.sh"]	