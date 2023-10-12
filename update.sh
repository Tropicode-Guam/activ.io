# default to command line input
TOKEN=$1
REGISTRY=$2
REPO=$3
if [ ! -z "$SSH_ORIGINAL_COMMAND" ]; then
    # split on space
    arr=($SSH_ORIGINAL_COMMAND)
    TOKEN=${arr[1]}
    REGISTRY=${arr[2]}
    REPO=${arr[3]}
fi

echo ""
echo "----------------------------"
echo $(date)
echo "----------------------------"
echo ">>> logging in to $REGISTRY"
# login to github container registry
# docker login ${REGISTRY} -u $ -p ${TOKEN}
echo ${TOKEN} | docker login $REGISTRY -u $ --password-stdin

# change directory to repo directory (assuming update.sh is in repo)
cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd

echo ">>> git pull"
# update source just cause
git pull

# stop containers so we can remove the local image
# make stop-production

# remove local image
# docker rmi ${REGISTRY}/tropicode-guam/blue-guam-frontend:main

echo ">>> updating image"
# download docker image
docker pull ${REGISTRY}/${REPO}:main

echo ">>> recreating service"
docker compose -f docker/production/docker-compose.yml up -d

echo ">>> logging out of $REGISTRY"
# remove token from docker config
docker logout $REGISTRY

echo ">>> docker pulled"
docker images ${REGISTRY}/${REPO}:main
echo ">>> should be at git commit:"
git log -n1