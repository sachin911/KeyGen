
## How to start

```bash
$ docker-compose up -d
$ docker logs -f api
```

This command will build Node.js API and launch docker container [mongo](https://hub.docker.com/_/mongo/) and [mongo-express](https://hub.docker.com/_/mongo-express/)


### Mongo Express Dashboard

Open browser with [http://localhost:8081](http://localhost:8081)

## Troubleshooting

### Mongoose connection issue

When you download `mongo` docker image first time, then it may have a delay on initialising. As a result, `api` may throw connection exception. To resolve this issue, simply restart `api` container with below command:

```bash
$ docker-compose restart api
```
