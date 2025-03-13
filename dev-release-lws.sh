# Cleanup
rm -rf *.log
rm -rf *.html
rm -rf *.png
rm -rf *.list

set -ex

# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=styrman

# image name
IMAGE=boozang-playwright-ex3-dev

 build
./dev-build-lws.sh

# push it
winpty docker push $USERNAME/$IMAGE:latest
