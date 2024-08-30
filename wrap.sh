#!/bin/bash
echo -n "Running Boozang runner version: "
cat VERSION
Xvfb :99 -screen 0 1280x1024x16 & node index --docker $@
if [ $? -eq 0 ]
then
  echo "The test ran successfully. Docker return code set to 0."
  cp /root/Downloads/* /var/boozang/ 2>/dev/null || true
  exit 0
else
  echo "The test failed. Docker return code set to 1." >&2
  cp /root/Downloads/* /var/boozang/ 2>/dev/null || true
  exit 1
fi
