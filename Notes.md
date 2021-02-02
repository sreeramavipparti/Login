# Requirements:
## Overview:
1. User should be able to login with email and password.
2. The login credentials submitted by the user should be encrypted before being sent to the server.
3. The server should validate the credentials and respond with invalid user or last successful and unseccessful attempt to login, as applicable.
4. The login/logout information should be logged into a table.
5. All the requests and states to be logged into an application log.

## Use Cases:
### User accesses login page
1. User opens a browser (chrome, firefox).
2. Enters the login page address 'http://login'. 
   * The login page with the following should be displayed.
     * Email - text field with email validation, appropriate message for invalid entries should be displayed
     * Password - text field with hidden characters, should be shown on demand
     * Browser information
     * Submit/Login button

### User enters invalid credentials
1. User enters a valid login, but not registered with the site.
   * Display invalid credentials message.
2. User enters a valid login, registered with the site. Enters a wrong password.
   * Display invalid credentials message.

### User enters valid credentials
User enters a valid login, registered with the site and correct password.
   * Display last successful login time, and location.
   * Display last unsuccessful attempt to login and location.
   * Display logout button.

### User logs out of the system
Upon successful login, user clicks on 'logout' button.
    * Display the login page.

## Functional requirements
1. Login credentials should not be exchanged in plain text with the server.

## Non-functional requirements
1. Appropriate database should be maintained.
2. Appropriate application log messages should be maintained.

## Testing requirements

# Solution
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

# Notes to developers
## Local system configuration for development
### UI development
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
