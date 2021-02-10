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
$ cd                    -- This will take you to user home directory
$ mkdir Login
$ mkdir Login/ui

#### UI Software installation
Software required to install:
  1. An IDE for developemtnt. I used VS Code. You can have your favourite one.
  2. nodejs, npm and yarn for React development
     1. bootstrap - Core library and ReactJS libraries along with dependencies: jquery and popper.js
  3. Sodium cryptography library 
     1. Linux library: libsodium-dev 
     2. JS libraries: sodium-native and sodium-plus
  
  * VS Code installation
    * Use the software manager(on Ubuntu it is called as 'Ubuntu Software') for this.
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
##### **'yarn'**
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
Note the similarity with the **'npm'** tool.
##### **'npx'**
The application can also be created using 'npx' tool. I did not attempt this.
Run the following commands:
$ npx create-react-app ui
$ cd ui
$ npm i react-bootstrap bootstrap
$ npm i sodium-native sodium-plus (This is my assumption. Not sure if this works)
$ npm install
$ npm [run] start
$ npm [run] build
Note the similarity with the **'yarn'** tool.
I recommend the npm-check-updates package also. This helps in updating the packages used.
Run the following commands:
$ npm i -g npm-check-updates
$ cd ui     - if already not in the 'ui' directory
$ ncu       - reports upgradable packages in package.json
$ ncu -u    - updates package.json with the reported packages
$ npm install    - actually installs the packages in package.json

Now proceed with the development work as usual. 
For production deployment see the 'Deployment' section.

### Backend development
#### Backend software installation
Software required:
  1. lamp_server^: This is not XAMPP development package. It is actually production ready LAMP stack with the following pacakges: (BTW lamp stands for Linux Apache MariaDB/MySql PHP)
     1. Apache2 web server
     2. MySql server
     3. PHP
    As phpmyadmin makes it easy to access the MySql databases via Internet, lamp_server^ is chosen. You can have MySqlWorkbench or any other tool, if you wish to avoid PHP. Be sure to set MySql to be available over the web. I did not try that.
  2. phpmyadmin
  3. python3-venv: Virtual environment for running python applications/projects. This has certain advantages and disadvantages. Refer to the Python documentation available on line.
  4. python3-pip: Python package installation manager. We will use it for installing web environment like Django, Flask for Python. BTW we are going to install our project dependencies in a virtual environment as cited above.

Now let us proceed to actual installations.
* lamp_server^ installation:
  * Run the following commands at a terminal
  * $ sudo apt-get install lamp-server^
  * $ sudo apt-get apache2-dev
* MySql configuration:
  * You will not be able access MySql immediately after installtion. Need to configure the user, that can access the MySql server. Run the following commands at a terminal:
    * $ sudo mysql
    * mysql command prompt opens up. At the mysql command prompt, execute the following mysql commands:
    * mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root'; 
      * I used 'root' user. Please configure proper user for this. See MySql documentation available online.
    * mysql> ^D  -- <ctrl>+D to quit the mysql prompt.
    * $ sudo systemctl restart mysql.service
    * $ mysql -u root -p  -- Now you can access mysql from command line by providing the password for the user 'root'
* PhpMyAdmin installation and configuration:
  1. Installation:
     1. Run the following commands in terminal
     2. $ sudo apt install phpmyadmin php-mbstring php-zip php-gd php-json php-curl
        1. Select 'apache2' when prompted for a server in 'Configuring phpmyadmin' screen
        2. Select 'Yes' when prompted for configuring dbconfig-common in 'Configuring phpmyadmin' screen
        3. Provide a password for 'root' user. I used 'root' throughout.
     3. $ sudo phpenmod mbstring
  2. Configuration:
     1. Apache configuration file is installed as /etc/phpmyadmin/apache.conf
     2. Copy this file to apache2 directory
        1. $ sudo cp /etc/phpmyadmin/apache.conf /etc/apache2/conf-available/phpmyadmin.conf
        2. $ sudo a2enconf phpmyadmin.conf
        3. $ sudo systemctl reload apache2.service
  3. Now phpmyadmin can be accessed using localhost/phpmyadmin. If the server is having a public DNS/IP, then it is accessible from those.
* Django installation:
  On Ubuntu 20.04 Server/Desktop Python3 is already available. We will be installing Django and other required software in a Python virtual environment. Please do the following:
     1. $ sudo apt-get install python3-venv
     2. $ sudo apt-get install python3-pip
     3. $ sudo apt-get install python3-dev   -- Might already be available.
     4. $ sudo apt-get install default-libmysqlclient-dev build-essential 
     5. Now let us create a Python virtual environment
        * $ cd                    -- This will take you to user home directory
        * $ cd Login              -- Remember we created a project directory named as Login.
        * $ python3 -m venv venv  -- Use any suitable name for the virtual environment
        * Activate the 'venv'
          * $ source venv/bin/activate   
        * Deactivate the 'venv'
          * (venv)...$ deactivate
     6. Now let us install the software required for the project. You should activate the 'venv' created in the previous step. Please do the following:
        1. $ cd
        2. $ cd Login
        3. $ source venv/bin/activate
        4. (venv)...$ pip install wheel
        5. (venv)...$ pip install --upgrade setuptools
        6. (venv)...$ pip install mysqlclient
        7. (venv)...$ pip install Django djangorestframework django-cors-headers
        8. (venv)...$ deactivate
     7. mod_wsgi installation: mod_wsgi is used to serve python web services in production environments. Django serves in a developmment environment just like XAMPP or Flask. cgi can also be used.
#### Create the backend application
First we need to create a Django project and then the required application(s). Activate the virtual environment created in previous step.
  * $ source venv/bin/activate
  * (venv)...$ django-admin startproject api
  * (venv)...$ cd api
  * (venv)...$ django-admin startapp login
  * (venv)...$ deactivate

Now proceed with the development work as usual. Ensure to create the require database in MySql.
For production deployment see the 'Deployment' section.

### Deployment
#### ***'ui'*** deployment
1. Add the .htaccess file to the public directory in the react project. This is required for running React Applications in production environment.
	The content of the .htaccess file should be:
			RewriteEngine On
			RewriteBase /
			RewriteRule ^index\.html$ - [L]
			RewriteCond %{REQUEST_FILENAME} !-f
			RewriteCond %{REQUEST_FILENAME} !-d
			RewriteCond %{REQUEST_FILENAME} !-l
			RewriteRule . /index.html [L]
			Options -Indexes
2. Add a conf file with the following contents. We will be adding this file to Apache2 enabled sites. I named the conf file as ***ui.conf***.
   	<VirtualHost *:80>
			ServerName ui

			ServerAdmin webmaster@localhost
			DocumentRoot /home/sreeram/Login/ui/build
			Alias /static /home/sreeram/Login/ui/build/static
			
			<Directory /home/sreeram/Login/ui/build>
				Options -Indexes +FollowSymlinks
			</Directory> 
			
			<Directory /home/sreeram/Login/ui/build/static>
				Require all granted
				Allow from all
			</Directory>
		</VirtualHost>

    If you want to change the listening port, do so by adding Listen <port> before the <VirtualHost>. The .conf files content should be looking like this:
    Listen 12345
    <VirtualHost *:12345>
      .
      .
      .
    </VirtualHost>
  * Do NOT use 'Access-control-allow-origin' entry header option in the RESTful requests in your application. django rest framework will report CORS errors, if the header is included in your requests.
  * Add the 'ServerName' entry used in 'ui.conf' file in the /etc/hosts file.
   127.0.0.1     ui
  * Build the production ui, with the following command:
    * $ yarn build
  If your development environment and production environment are same, which is highly unlikely, then your ui is deployed on the production server; to serve the same enable the site.\
  Segregate your development and production environments as early as possible. It is not advisable.

  In general your development environment will be different from production environment. In that case modify the ui.conf file according to the production server paths wherever applicable. You may also need to do the above changes on production server also.
  
  Copy the contents of the build folder in 'ui' directory to the production server, in the paths defined by ui.conf file.

3. All you need to do now is to enable the site and reload apache2 server. To serve the ui site, execute the following commands:
   * $ sudo cp /home/sreeram/Login/ui.conf /etc/apache2/sites-available
   * $ sudo a2ensite ui.conf
   * $ sudo systemctl reload apache2.service  <or>
   * $ sudo systemctl restart apache2.service -- if you have changed the /etc/hosts file

#### ***'api'*** deployment
1. Add a conf file with the following contents. We will be adding this file to Apache2 enabled sites. I named the conf file as ***api.conf***.
		<VirtualHost *:80>
			ServerName api

			ServerAdmin webmaster@localhost
			DocumentRoot /home/sreeram/Login/api
			WSGIScriptAlias / /home/sreeram/Login/api/api/wsgi.py
			WSGIDaemonProcess api python-home=/home/sreeram/Login/venv python-path=/home/sreeram/Login/api
			WSGIProcessGroup api

			<Directory /home/sreeram/Login/api>
				Options -Indexes
			</Directory> 

			<Directory /home/sreeram/Login/api/api>
				<Files wsgi.py>
					Require all granted
					Allow from all
				</Files>
			</Directory>
		</VirtualHost>

    If you want to change the listening port, do so by adding Listen <port> before the <VirtualHost>. The .conf files content should be looking like this:
    Listen 12345
    <VirtualHost *:12345>
      .
      .
      .
    </VirtualHost>
  * Add the 'ServerName' entry used in 'api.conf' file in the /etc/hosts file.
   127.0.0.1     api

  If your development environment and production environment are same, which is highly unlikely, then your api is deployed on the production server; to serve the same enable the site.\
  Segregate your development and production environments as early as possible. It is not advisable.

  In general your development environment will be different from production environment. In that case modify the api.conf file according to the production server paths wherever applicable. You may also need to do the above changes on production server also.
  
  Copy the contents of the build folder in 'api' directory to the production server, in the paths defined by api.conf file.
2. All you need to do now is to enable the site and reload apache2 server. To serve the api site, execute the following commands:
   * $ sudo cp /home/sreeram/Login/api.conf /etc/apache2/sites-available
   * $ sudo a2ensite api.conf
   * $ sudo systemctl reload apache2.service   <or>
   * $ sudo systemctl restart apache2.service -- if you have changed the /etc/hosts file
#### Apache2 server configuration
1. Check for the wsgi_module entry in the /etc/apache2/apache2.conf file:
LoadModule wsgi_module "..."
  This is required if you wish to serve servers using python based Djago or Flask.
  
  If the above entry is not found, then run one of the following commands
  	* $ sudo mod_wsgi-express install_module <or> 
  	* $	mod_wsgi-express module_config
  Add the LoadModule entry to the apache2.conf file from the above command, at the end. Do not add the python home entry. We already did that in the 'api.conf' file

2. Check for the appropriate .conf files in the /etc/apache2/sites-enabled directory. Check for corresponding entries in /etc/hosts file. I suggest to use different .conf files for backend api and frontend ui with appropriate virtual host configurations. Although these can be clubbed into single .conf file, with care. Using single .conf file may lead to longterm maintenance problems.

3. Restart the apache2 server:
   $ sudo systemctl restart apache2.service

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
