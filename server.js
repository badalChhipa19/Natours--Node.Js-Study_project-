const dotenv = require(`dotenv`);

dotenv.config({ path: `./config.env` });
const app = require(`./app`);

//TODO N:  Running the server on port 3000
const port = process.env.port || 3000;
app.listen(port);
