Express is a node js freamwork which makes writing node in easy manner

--> To use express

1. const express = Require(express)
2. const app = express(); Note: It is a convention to use app when initiatinting express.

# Request response cycle

Request -> middleware -> ... -> response

if middleware get puted after response then is willn't work as cycle get ends with response
