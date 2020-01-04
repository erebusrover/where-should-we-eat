// require('@google-cloud/debug-agent').start();
const { app } = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
