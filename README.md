## Disclose Front-end

Frontend for Disclose. Backend must be running locally. See backend repo [here](https://github.gatech.edu/NIJ-Grant/Node-Backend).

## Build/Install instructions
```
  cd disclose-frontend
  docker build ./
  docker images
  pwd
  docker run -it -p 3000:3000 -v [your path here]/frontend/src:/frontend/src [image id]
```
More details [here](https://github.com/facebookincubator/create-react-app/blob/master/README.md).
