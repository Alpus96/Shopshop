# Shopshop
This README file contains information about the project file structure.

# Project root
The root directory only contains the node required package.json file and the server.js file with contains the code for running the server and passing requests to the web application. (But also README.md, this file, and .gitignore for development purposes.)

## Features directory
Put the files for cucumber with the Gherkin scenarios in ./features, these should have the file ending .feature and in turn run their corresponding file (file with the same name ending with .js) in the step_definition directory.

### Step_definition directory
In the ./features/step_definition directory there should be code for testing code in ./app divided according to the gherkin scenarios.

## App directory
The ./app directory contains directories with different aspects of the website the logic.

### Controllers directory
In the directory ./app/controllers there should be files containing the business logic for composing responses with the model data and rendering views.

### Models directory
In the directory ./app/models there should be files with classes containing logic for handling the database, in our case a .json library.

#### Database directory
In the directory ./app/models/database there should be the .json files with website database information, ex. users.json, lists.json and categories.json.

### Views directory
In ./app/views there should be the .ejs files to render views from in the controllers.

## Node_modules directory
In ./node_modules contain the dependencies for the web application. Node_modules is put on the .gitignore list.

## Commands
* "npm start", will run server.js in root.
* "npm test", will run the cucumber scripts.
