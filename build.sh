docker build ./ --tag frontend:latest
docker run -d -it -p 3000:3000 -v $(pwd)/frontend/src:/frontend/src frontend:latest
