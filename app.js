const express = require('express');
const bodyParser = require('body-parser');
const infoRoutes = require('./routes/info');
const mockRoutes = require('./routes/mock');

const PORT = process.env.PORT || 3000;
const app = express();
      app.use(bodyParser.json());
      app.use('/info', infoRoutes);
      app.use('/mock', mockRoutes);
      app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); });

