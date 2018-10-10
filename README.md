# Slug Academic Organizer

Our project is to create a web app to help students keep track of their educational goals in fulfilling GEs and Major requirements. The current system that UCSC offers is honestly kind of nightmare to use and navigate, so we want to provide platform to make it simple and easy for students to record their progress.

**Class**: CMPS 115, Intro to Software Engineering

**Members**: Charles, Hannah, Michael, Jazmin, Anthony

## Prerequisites

| Prerequisite | Version |
| :----------- | ------: |
| Node.js      | 8.12^   |
| NPM          | 5^      |
| React.js     | 16^     |

## Installation

After forking, cloning, all that fun stuff of getting your dev environment setup, this is how you can get all the modules that'll be used in development.

**Note**: *Don't upload node_modules/ folder, it's not needed. Your package.json has a record of all modules that'll it'll pull from to get installed in your local environment.*

```javascript
// To download all dependencies
cd Slug-Academic-Organizer/
npm install

// To run server, or any .js file w/ node
node server.js

// To run a create-react-app (boiler for React)
cd client/
npm start

```

React has a boiler-template that gets everything up and running smoothly, without having to configure Webpack, Babel, etc. The *create-react-app* template can be downloaded like so:

```javascript
// After Node is installed, run
npm i -g create-react-app

// Whenever you want to use create-react-app in a project, do
// -- Use in current directory --
create-react-app .

// -- Use in a new directory --
create-react-app client/
```
