# Applicant Track System (ATS)
  Welcome to our Applicant Track System

#Table of Contents

- [Applicant Track System (ATS)](#ats)
- [Table of Contents](#table-of-contents)
- [Scripts](#scripts)
  - [Setup](#setup)
  - [Running](#running)

- [Tech-Stack](#tech-stack)
  - [Back-End Dependencies](#back-end-dependencies)
    - [Cors](#cors)
    - [ExpressJS](#expressjs)
    - [MongoDB](#mongodb)
    - [Mongoose](#mongoose)
    - [Agendash](#agendash)
    - [Agenda](#agenda)
    - [Uuid](#uuid)
  - [Front-End Dependencies](#front-end-dependencies)
    - [React](#react)
    - [Redux](#redux)
    - [Redux Thunk](#redux-thunk)
    - [Material UI](#material-ui)
    - [Axios](#axios)
    - [React Router](#react-router)
    - [React Router DOM](#react-router-dom)
    - [Typescript](#typescript)
    - [React DnD](#react-dnd)
    - [Uuid](#uuid)
    - [Classnames](#classnames)

# Scripts
  ## Install dependencies

    $ npm install

  ## Running

    $ sudo service mongod start
    $ npm start
    $ node server.js

# Tech-Stack
## Back-End Dependencies
### Cors
This will allow us to secure communication between the front-end and back-end servers. |
[View Dependency](https://github.com/expressjs/cors)
### ExpressJS
Built on top Nodejs, ExpressJs will allow us to build our API endpoints in a simple and light way. It is a highly scalable choice to have an event Loop that manages all asynchronous operations and have the program run without a stop thanks the Google's V8 Engine. | [View Dependency](http://expressjs.com/)
### MongoDB
MongoDB is an object-oriented, simple, dynamic, and scalable NoSQL database. | [View Dependency](https://docs.mongodb.com/)
### Mongoose
Provides a straight-forward, schema-based solution to model application data with MongoDB. | [View Dependency](https://mongoosejs.com/)
### Agenda
Agenda will serve to queue operations to be done for our workflows | [View Dependency](https://github.com/agenda/agenda)
### Agendash
It is a Dashboard for Agenda, accessible through `http://localhost:5000/dash/` | [View Dependency](https://github.com/agenda/agendash)
### Uuid
Simple, fast generation of RFC4122 UUIDS | [View Dependency](https://www.npmjs.com/package/uuid)

## Front-End Dependencies
### React
React is the current industry standard that offers a lot of out of the box benefits. It is fast, efficient, and scalable. Due to the large community, finding solutions to potential problems and reference material is much easier. | [View Dependency](https://reactjs.org/docs/getting-started.html)
### Redux
A state management tool making it possible to store the entire state of the application in a single store | [View Dependency](https://redux.js.org/)
### Redux Thunk
A middleware that allows you to write action creators that return a function instead of an action. | [View Dependency](https://github.com/reduxjs/redux-thunk)
### Axios
A lightweight, promise-based HTTP client with an intuitive API that makes interfacing with a REST API simple. | [View Dependency](https://www.npmjs.com/package/react-axios)
### React Router
This allows the navigation. | [View Dependency](https://github.com/ReactTraining/react-router)
### React Router DOM
Provides components to implement React Router in a web app. | [View Dependency](https://www.npmjs.com/package/react-router-dom)
### Typescript
TypeScript brings optional static type-checking along with the latest ECMAScript features. | [View Dependency](https://www.typescriptlang.org/docs/home.html)
### React DnD
Drag and Drop for React | [View Dependency](https://github.com/react-dnd/react-dnd)
### Classnames
A simple JavaScript utility for conditionally joining classNames together. | [View Dependency](https://github.com/JedWatson/classnames)
