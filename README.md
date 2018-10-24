# Slug Academic Organizer

Our project is to create a web app to help students keep track of their educational goals in fulfilling GEs and Major requirements. The current system that UCSC offers is honestly kind of nightmare to use and navigate, so we want to provide platform to make it simple and easy for students to record their progress.

**Class**: CMPS 115, Intro to Software Engineering

**Members**: Charles, Hannah, Michael, Jazmin, Anthony

---

## Prerequisites

| Prerequisite | Version |
| :----------- | ------: |
| Node.js      | 8.12^   |
| NPM          | 5^      |
| React.js     | 16^     |
| Git          | 2.18^   |

---

## Installation

Steps to get a clone of your fork locally:

```javascript
  // First make sure Git is properly installed in your terminal
  git --version

  // If git is installed, great! Check Nodejs & npm now
  node -v
  npm -v

  // Great! If the following above worked, continue!

  // Open up a directory to save to on your computer & clone
  // USER_NAME = your github username
  cd /<your directory>
  git clone https://github.com/USER_NAME/Slug-Academic-Organizer.git

  // Great! Now you have a clone of your fork. Set the upstream!
  cd Slug-Academic-Organizer/
  git remote add upstream https://github.com/chtzou/Slug-Academic-Organizer.git

  // Check if the config is good
  git remote -v

  // You're now setup for development
  // Follow these for a more in-depth guide

  https://github.com/firstcontributions/first-contributions
  https://help.github.com/articles/syncing-a-fork/
```
---

**IMPORTANT:** 
Always create a new branch if you are making changes. So the first thing to do if you're ready to develop is 
  ```javascript
  git checkout -b <SOME-BRANCH-NAME>
  ```
This will create a new branch and move you into it. That way any changes you make will now be inside this branch and not within your Master branch. It's really great for development and helps eliminate merge conflicts. Give your branch a semi-descriptive name too!

---

**Note**: *Don't upload node_modules/ folder, it's not needed. Your package.json has a record of all modules that'll it'll pull from to get installed in your local environment.*

To get all the modules/dependencies in the project:
```javascript
// To download all dependencies
cd Slug-Academic-Organizer/
npm install

// Check if testing is working
npm run test

// Run both client & server
npm run dev
```

