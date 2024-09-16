winpty docker rm -vf $(docker ps -a -q)

winpty docker rmi -f $(docker images -a -q)
