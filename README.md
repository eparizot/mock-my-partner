# What's for ?

This application is made for mock all partners that your application needs in order to process responses.
All mocked webservices are automatically generated according to the template you provide in the mock folder.

It's a nodeJS application with a containerized redis database.

Lightweight, fast & simple to launch for end2end tests. 

# Start

Requirements: [Docker Community Edition](https://www.docker.com/community-edition)

To start the app run: `docker-compose up`.

It will then be started on default port 3000.

Context path for your api : /mock


# Basic endpoints

## health

```sh
curl http://localhost:3000/info/health
```

## Mock files loaded

```sh
curl http://localhost:3000/info/mocks
```

## Generated example get

```sh
curl http://localhost:3000/mock/beer/1?quantity=2
```
