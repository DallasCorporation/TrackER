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

![cd2eca9ae719e65956103b434c373239a953fa39](https://user-images.githubusercontent.com/71103219/188493705-7bdae70d-bb86-4f04-9e0f-13345cdf29c6.gif)



Move to **tracker** and also here install the dependecies for the app with the same command:

`$ cd tracker`

`$ npm install`

![d23049f52b27f00bf6580700b4680274be2eb88a](https://user-images.githubusercontent.com/71103219/188494558-38b30f33-c5da-4178-8231-9a83527d5f50.gif)


Start the backend server:

`$ cd server`

`$ npm run dev`


![dd7400b4a13d32f7fef6d1d6921e5787d3916f17](https://user-images.githubusercontent.com/71103219/188494696-a6a9b211-7793-419f-9b7f-d9844396bce4.gif)

Start the frontend server via a new shell:

`$ cd tracker`

`$ npm start`


The frontend server will detect that another app (server) is running on the standard port 3000 and will ask if you want to start on a different port. **Select Yes (Y)**

![acb192396fb1a36f59db826f778fef64baafd499](https://user-images.githubusercontent.com/71103219/188494025-e7d65609-4d73-4ef2-b6a4-df71aa795e74.gif)

:tada: Enjoy the TrackER app on your machine!



![test](https://user-images.githubusercontent.com/71103219/188290293-d02a62f7-ec10-419b-9f01-0cefed8bfc85.gif)
