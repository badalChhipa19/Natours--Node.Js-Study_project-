Express is a node js freamwork which makes writing node in easy manner

--> To use express

1. const express = Require(express)
2. const app = express(); Note: It is a convention to use app when initiatinting express.

# Request response cycle

Request -> middleware -> ... -> response

if middleware get puted after response then is willn't work as cycle get ends with response

// To create your own middleware in express we use app.use with 3 parameters 1st req, 2dn res and 3rd and most importent is next, because without next we can not proceed in excution further // This middleware is working because it is above or before all the responses that we are throwing in Step 6.2 if it putted after tem it won't work as response will already be sended.

# To serve static files use static middleware

app.use(express.static('pathand folder name'))

# Use enviroments

1. TO check env cl(process.env)
2. TO set your own env
3. create an config.env
4. install dotenv from npm
5. import dotnve
6. give it a obje with path of config file
