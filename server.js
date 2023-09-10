const app = require('./app');

//TODO N:  Running the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port} prot...`);
});
