# Login
Login implementation using React JS, Django, djangorestframework, libsodium with MySql database.\

User enters username and password.\
User clicks on login/submit button.\
A nonce is received from the server.\
The credentials are encrypted using the nonce. A keypair is already generated for this purpose.\
The encrypted credentials are sent to the server.\
The server decrypts the credentials, validates against the user table, logs the validity and sends a response.\
The valid user logs out. The logout information is logged at the server.\
Invalid user tries again.\
