module.exports = (app) => {
  const tools = require('../controllers/tools.controller.js')

  // Get all records
  app.get('/api/tools', async (req, res) => {
    tools.findAll({ req, res })
  })

  // Search records
  app.get('/api/tools/search', async (req, res) => {
    tools.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/tools/:ID', async (req, res) => {
    tools.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/tools', async (req, res) => {
    tools
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/tools/:ID', async (req, res) => {
    tools
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/tools/:ID', async (req, res) => {
    tools
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
