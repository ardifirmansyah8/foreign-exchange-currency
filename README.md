# foreign-exchange-currency

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### To Running in Docker
If 8082 port has already used in your computer, you can change default port in file vue.config.js and then change expose line Dockerfile. And run this command:
```
docker build -t <your_docker_image_name>
docker run -d --name <your_docker_name> -p 0.0.0.0:<your_port>:<your_port> <your_docker_image_name>
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
