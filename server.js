const dotenv = require(`dotenv`);
const mongoose = require(`mongoose`);

dotenv.config({ path: `./config.env` });
const app = require(`./app`);

//* Connection string from atlas
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

//TODO: Connecting with mongoDB atlas(remote)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successFully..'))
  .catch((err) => console.log('Error in conecting wiht atlas: ', err));

//TODO N:  Running the server on port 3000
const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
