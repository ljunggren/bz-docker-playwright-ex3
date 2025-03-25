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
IMAGE=boozang-runner-dev

# run build
./dev-build.sh

# push it
docker push $USERNAME/$IMAGE:latest
