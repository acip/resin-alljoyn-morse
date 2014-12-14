#!/usr/bin/env bash

export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:App/lib

App/bin/alljoyn-daemon &

App/bin/alljoynjs --name MorseEmitter App/js/alljoyn-morse.js

