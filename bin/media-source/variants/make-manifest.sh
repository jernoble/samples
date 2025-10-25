#!/bin/sh

FILE=$1

RFC6381="$(MP4Box -info $FILE 2>&1 | grep 'RFC6381' | sed -e 's/[\w]*RFC6381 Codec Parameters: //g')"

echo $RFC6381