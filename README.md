# Game of Bots

Game of Bots is a web based multiplayer game. There is a better description with screenshots coming soon :)

---
## Docker

A Dockerfile is provided to make it easy to run this game using Docker Compose. Simply run the following command:

```
docker-compose up
```

---

## Install for local development

```
cd ./server
npm init -y  
npm install express socket.io
npm install nodemon --save-dev  
```

Run the server using `npm start` from `./server`.

While developing it is recommended to use `npm run dev` as this allows for automatic updates to the running server without having to restart the server, it will automatically do that whenever you save changes to a file. 

---

## Branch naming convention

Branches use the `GOB` prefix followed by a dash and the ticket #. So a branch for ticket 1 would be `GOB-1`.

---

## Contributing

Please open a pull request. All contributions must use the same License as the rest of the repository.

## License

Please see the `LICENSE` file in the project directory.