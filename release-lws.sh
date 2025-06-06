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
IMAGE=boozang-runner

# ensure we're up to date
git pull
# bump version
winpty docker run --rm -v "/$PWD":/app treeder/bump patch
version=`cat VERSION`
echo "version: $version"

major=`echo $version | cut -d. -f1`
minor=`echo $version | cut -d. -f2`
revision=`echo $version | cut -d. -f3`

# run build
./build-lws.sh

# tag it
git add -A
git commit -m "version $version"
git tag -a "$version" -m "version $version"
git push
git push --tags

winpty docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version
winpty docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$major
winpty docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$major.$minor

# push it
winpty docker push $USERNAME/$IMAGE:latest
winpty docker push $USERNAME/$IMAGE:$version
winpty docker push $USERNAME/$IMAGE:$major
winpty docker push $USERNAME/$IMAGE:$major.$minor

IMAGE=boozang-playwright-ex3
winpty docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version
winpty docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$major
winpty docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$major.$minor

# push it
winpty docker push $USERNAME/$IMAGE:latest
winpty docker push $USERNAME/$IMAGE:$version
winpty docker push $USERNAME/$IMAGE:$major
winpty docker push $USERNAME/$IMAGE:$major.$minor
