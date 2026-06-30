const app = require('./app');
const { port } = require('./config/env');

app.listen(port, () => {
  console.log(`FWG backend running on http://localhost:${port}`);
});
