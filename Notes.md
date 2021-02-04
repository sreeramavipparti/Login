# Requirements:
## Overview:
1. User should be able to login with email and password.
2. The login credentials submitted by the user should be encrypted before being sent to the server.
3. The server should validate the credentials and respond with invalid user or last successful and unseccessful attempt to login, as applicable.
4. The login/logout information should be logged into a table.
5. All the requests and states to be logged into an application log.

## Use Cases:
### User accesses login page
#### Wireframes or equivalent
1. User opens a browser (chrome, firefox).
2. Enters the login page address 'http://login'. 
   * The login page with the following should be displayed.
     * Email - text field with email validation, appropriate message for invalid entries should be displayed
     * Password - text field with hidden characters, should be shown on demand
     * Browser information
     * Submit/Login button


### User enters invalid credentials
#### Wireframes or equivalent
1. User enters a valid login, but not registered with the site.
   * Display invalid credentials message.
2. User enters a valid login, registered with the site. Enters a wrong password.
   * Display invalid credentials message.

### User enters valid credentials
#### Wireframes or equivalent
User enters a valid login, registered with the site and correct password.
   * Display last successful login time, and location.
   * Display last unsuccessful attempt to login and location.
   * Display logout button.

### User logs out of the system
#### Wireframes or equivalent
Upon successful login, user clicks on 'logout' button.
    * Display the login page.

## Functional requirements
1. Login credentials should not be exchanged in plain text with the server.

## Non-functional requirements
1. Appropriate database should be maintained.
2. Appropriate application log messages should be maintained.

## Testing requirements

# Solution
#### Overview
## Architecture
The application is designed with a multi-tier architecture.

### UI layer 
Facilitates the following screen related functionalities:
  * Email - text field 
    * Validates for proper format of email.
  * Password - text field
    * By default hides the characters entered by user.
    * Facility to display the entered characters is provided.
  * Submit button
    * Clicking on which the Email and Password are encrypted and submitted to the crypt layer.
  * Static text field
    * Displays the browser information
  * Static text field
    * Displays the error messages:
      * Invalid Credentials
      * Alert message for mandatory fields
  * Static text field
    * Displays the following login information:
      * Last successful login time and location
      * Last unsuccessful attempt to login and location
  * Logout - button
    * Clicking on which the login page is displayed

### Webservices layer
Facilitates the web message exchange; gelled together with other layers.

### Crypt layer
* Key generation, when required
* Nonce generation, which should be exchanged along with the cryptographic ciphers
* Decryption of the ciphers
* Submit the decrypted credentials to Validation layer
  * The password is hashed before forwarding the same to next layer
* Log the decryption failures
* Log the key generation failures
* Log the nonce generation failures
* Log the nonce validation failures
  
### Validation layer
* Check the existence of user email and hashed password in database
* Send the results to UI layer
* Log the successful login information
* Log the failed login information
* Update the database with the successful/unsuccessful information
 
### Database layer
Facilitates the data persistence in a relational database

# High level design
## Modules
## Interactions
## Database design
### List of tables and views
### ER-Diagram

# Low level design
### UI
### Web-service end points
### Database queries
### Application log
### Sequence diagrams
### Dataflow Diagrams

# Implementation
## Environment
* React JS with bootstrap
* Django with rest framework support
* Apache2 server V2.4
* MySql server V8.0
* Ubuntu 20.04

## Other software
* phpmyadmin for selected administrators
* Stripe payments API
* AWS S3 API
* Textbelt API
* React JS plugins for
  * Video recording and playback
  * Code editor

## Application
* The web applications deployed on an AWS EC2 Ubuntu instance
* AWS S3 bucket for user documents storage
* Two web applications are developed
  * UI
  * Web Services
* Database with appropriate tables and views

## Source code repositories
* Bitbucket is used for source repositories.
* Two separate repositories are maintained.
  * One for UI sources, developed using ReactJS
  * The other for Web Services and SQL schema

## Data backup
* Database
* User documents in S3 bucket
* Application logs
* Source code
* API keys and credentials

# Notes to developers
## Local system configuration for development
Directions on how to configure the system for the first time:
The directory structure is as follows:\
Login/ui\
Login/api\
Login/api/api\
Login/api/login\
Login/venv\
The above structure is arrived at, by the following items.
### Common installations
#### libsodium installation
  * Follow the instructions in 'https://doc.libsodium.org/installation/' OR
  * Run the following commands in a terminal
    * $ sudo apt-get install update
    * $ sudo apt-get install libsodium-dev
### UI development
Create a project directory. Then create another directory UI application under the project directory.
$ mkdir Login
$ mkdir Login/ui

#### UI Software installation
  * VS Code installation
    * Use the software manager for this.
  * nodejs, npm and yarn installation
    * $ sudo apt-get install nodejs npm
    * $ sudo npm install -g yarn
  * libsodium installation for react
    * You should be in the 'ui' directory
    * libsodium-dev package should have been installed - Refer common installations
    * $ yarn add sodium-native sodium-plus
  * bootstrap installation for react
    * You should be in the 'ui' directory
    * $ yarn add react-bootstrap bootstrap jquery popper.js
    * You should add the imports in ***index.js*** file in ***src/*** directory, after React imports.
      * import React from 'react';
      * import ReactDOM from 'react-dom';
      * import 'bootstrap/dist/css/bootstrap.css';
      * import 'jquery/src/jquery';
      * import 'bootstrap/dist/js/bootstrap.js';

#### Create the application
##### **'yarn'** installation
This application is created using yarn tool. 'yarn' version used is 1.22.10.\
Do not upgrade to yarn2. That caused problems for me while maintenance.\
If a yarn (version 1.x) update is available, you can upgrade to that. I started with 1.22.x and upgraded to 1.22.10.\
Run the following command to create the application:
  * $ yarn create react-app ui
  * $ cd ui
Install the required plugins and libraries with yarn add commands. Refer to 'UI Software Installation' section.
  * $ yarn add <packages>       - installs specified packages and updates package.json
  * $ yarn install              - if package.json is manually edited
Run the following command to start the local development server, of course for ui only :)
  * $ yarn start
Run the following command to build production ready artifacts, to be deployed in Apache2 server.
  * $ yarn build
Note the similarity with **'npm'** tool.
##### **'npx'** installation
The application can also be created using 'npx' tool. I did not attempt this.
Run the following commands:
$ npx create-react-app ui
$ cd ui
$ npm i react-bootstrap bootstrap
$ npm i sodium-native sodium-plus (This is my assumption. Not sure if this works)
$ npm install
$ npm [run] start
$ npm [run] build
Note the similarity with **'yarn'** tool.
I recommend the npm-check-updates package also. This helps in updating the packages used.
Run the following commands:
$ npm i -g npm-check-updates
$ cd ui     - if already not in the 'ui' directory
$ ncu       - reports upgradable packages in package.json
$ ncu -u    - updates package.json with the reported packages
$ npm install    - actually installs the packages in package.json
### Backend development
* Installation of software
* Apache2 server configuration
* MySql configuration
* phpmyadmin configuration
* Django configuration

### Deployment
#### AWS configuration for development
* S3 bucket configuration
#### Apache server configuration for development
#### AWS configuration for production
* S3 bucket configuration
#### Apache server configuration for production

# Notes to adminstrators
## Godaddy configuration
## Stripe configuration
## Textbelt configuration
