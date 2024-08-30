version=`cat VERSION`
echo "version: $version"

major=`echo $version | cut -d. -f1`
minor=`echo $version | cut -d. -f2`
revision=`echo $version | cut -d. -f3`


echo "major: $major"
echo "minor: $minor"
echo "revision: $revision"
