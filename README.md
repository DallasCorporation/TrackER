# TrackER
The TrackER app is a web application that enables customer account creation, asset management, utility data connection, and energy awareness. 
The web app also features a community build that enables end users to create custom data aggregation views to compare themselves against others in their community.

# Getting Started
These instructions will get you a copy of the TrackER application up and running on your local machine for development and testing purposes.
The TrackER contains the front end React application (tracker) for TrackER.com and the backend NodeJS application (server), which contains routes for various resources.

# Prerequisites
You need **Git**, **GitHub Desktop** and **NodeJS** installed on your machine, the following versions are recommended:

- **NodeJS**: v14.17.6

You can verifiy your intallastions with the following commands:

```$ git --version```

`$ node -v`

![](https://media.giphy.com/media/U16vaXXdABRvzAYL2J/giphy.gif)

and from Finder


# Installing
Via **GitHub Desktop** clone the **TrackER** repository to a directory of your choosing


Request to emanuele.dallara@studio.unibo.it the .env file and save it into the **tracker** and **server**  directory to initialize all the environment variables of the app.

:nerd_face: **Tip**

If moving the .env file from the Donwloads directory to the server directory you think that it disappeared... 

use `Cmd+Shift+.` to show the hidden files. The .env files are one of those.

Inside **server** install the dependecies for the app with the command:

`$ cd server`

`$ npm install`



Move to **tracker** and also here install the dependecies for the app with the same command:

`$ cd tracker`

`$ npm install`



Start the backend server:

`$ cd server`

`$ npm start`



Start the frontend server via a new shell:

`$ cd tracker`

`$ npm start`



The frontend server will detect that another app (server) is running on the standard port 3000 and will ask if you want to start on a different port. **Select Yes (Y)**

:tada: Enjoy the TrackER app on your machine!



