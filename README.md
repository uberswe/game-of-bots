# ExpressJs setup sample

How I decided to do my server setup for developement and the packages installed.  
Run CMD in the server directory and apply the following commands accordingly.  

npm init -y  
npm install express socket.io (socket.io if I decide to make realtime interactions)  
npm install nodemon --save-dev  

Change scripts to the following in the package.json file.
```
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

---

# Running the server!  

Open a console with the server folder directory.  
For the full server, use the function "npm start"  
For the dev server, user the function "npm run dev"  

The second function (the 'dev') uses nodemon which will allow for automatic updates to the running server without having to restart the server, it will automatically do that whenever you save changes to a file.

---

