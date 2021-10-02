# Game of Bots

Game of Bots is a web based multiplayer game. There is a better description with screenshots coming soon :)

---
## Docker

A Dockerfile is provided to make it easy to run this game using Docker Compose. Simply run the following command:

```
docker-compose up
```

When debugging you may want to run docker-compose as a daemon like so:

```
docker-compose up -d
```

The `--build` flag is useful to rebuild the containers from scratch.

You are then able to check the logs using any of the following commands

```
# all logs
docker-compose logs
# tail all logs
docker-compose logs -f
# tail logs from a specific container
docker-compose logs -f server
```

When you want to stop the containers run the following:

```
docker-compose down
```

---

## Install the server for local development

```
cd ./server
npm install 
```

Run the server using `npm start` from `./server`.

While developing it is recommended to use `npm run dev` as this allows for automatic updates to the running server without having to restart the server, it will automatically do that whenever you save changes to a file.

The server will run at `http://localhost:8080` 

---

## Install the client for local development

```
cd ./client
npm install 
```

Build the client files using `npm run build` from `./client`. The compiled files will be put in `./client/dist`.

While developing it is recommended to use `npm run dev` as this allows for automatic updates to the running server without having to restart the server, it will automatically do that whenever you save changes to a file.

The dev server will run at `http://localhost:8081` 

---

## Branch naming convention

Branches use the `GOB` prefix followed by a dash and the ticket #. So a branch for ticket 1 would be `GOB-1`.

---

## Contributing

Please open a pull request. All contributions must use the same License as the rest of the repository.

## License

Please see the `LICENSE` file in the project directory.