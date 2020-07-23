# Committed Gazetteer

[![Committed Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fcommitted.software%2Fbadge)](https://committed.io)
[![Build Status](https://drone.committed.software/api/badges/commitd/components/status.svg)](https://drone.committed.software/commitd/gazetteer)
![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)

Committed's Gazetteer offers a simple API for performing text markup using a Gazetteer.
The Gazetteer is often overlooked in favour of ML base NLP solutions but for high value targets a simple gazetteer can form an important part or a broader NLP extraction strategy. 
This service also has a user interface for configuring the Gazetteer so it can be done by none developers.

## 🚀 Quickstart

Use the pre-build docker container:

```shell
docker run -p 8080:8080 committed/gazetteer
```

You can configure the gazetteer using the UI on http://localhost:8080 and checkout the API at http://localhost:8080/swagger-ui/index.html

## 💻 Development

We use maven to build the project using:

```shell
mvn clean package 
```

The server is written in java using Spring Boot and the UI is Typescript with React.

This will build the server, ui and Docker image.

For UI development, in `src/main/app` you will find the usual node `package.json` with scripts for, `build`, `start`, `test` and `storybook` as well as some other utility scripts. 
The scripts can be used while developing the UI, example below, but the main maven build will take care of building and packaging the UI into the jar. 
Not for full function during UI development you should also run the server.

```bash
yarn build
```

We use Storybook to develop and document the components, this is run in development using

```bash
yarn storybook
```

## 🤖 CI

Pull requests go through CI checks using Drone. 
Use version tags on master to deploy to Docker hub, release to maven central is currently manual, using:

```shel
mvn deploy -P release
```

## ©️ License

[MIT](/LICENSE) - © Committed Software 2020 <https://committed.io>