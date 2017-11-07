## Disclose Front-end

Frontend for Disclose. Backend must be running locally. See backend repo [here](https://github.gatech.edu/NIJ-Grant/Node-Backend).

## Build/Install instructions
```
  cd WebApp
  docker build ./ --tag frontend:latest
  docker run -it -p 3000:3000 -v $(pwd)/frontend/src:/frontend/src frontend:latest
```
More details [here](https://github.com/facebookincubator/create-react-app/blob/master/README.md).
